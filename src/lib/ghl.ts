interface GhlLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  segment: string;
  heatPumpType: string;
  volume: string;
  challenge: string;
  website: string;
  locale: string;
}

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

// Custom field key the client wants this stored under in GHL, taken from
// their merge tag {{contact.what_type_of_heat_pumps_do_you_install}}.
const HEAT_PUMP_TYPE_FIELD_KEY = "what_type_of_heat_pumps_do_you_install";

const HEAT_PUMP_TYPE_LABELS: Record<string, string> = {
  air_to_air: "Air-to-Air",
  air_to_water: "Air-to-Water",
  both: "Both",
  other: "Other",
};

// Custom field key for the residential/commercial question, taken from
// {{contact.do_you_work_with_residential_or_commercial_customers}}.
const SEGMENT_FIELD_KEY = "do_you_work_with_residential_or_commercial_customers";

// Fixed English labels regardless of which locale's form was submitted, same
// reasoning as HEAT_PUMP_TYPE_LABELS — one consistent value per field in GHL
// rather than mixed English/Swedish text depending on submission source.
const SEGMENT_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial / Multi-Family",
};

export function isGhlConfigured(): boolean {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

/**
 * Pushes a lead into GoHighLevel as a contact (via the Upsert Contact API, so
 * a repeat submission from the same email/phone updates the existing contact
 * instead of duplicating it) plus a note carrying the fields GHL's contact
 * schema has no dedicated column for. Requires GHL_API_KEY (a Private
 * Integration token with the contacts.write scope) and GHL_LOCATION_ID.
 */
export async function forwardLeadToGhl(lead: GhlLead): Promise<void> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) return;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: GHL_API_VERSION,
    "Content-Type": "application/json",
  };

  const heatPumpTypeLabel = HEAT_PUMP_TYPE_LABELS[lead.heatPumpType] ?? lead.heatPumpType;
  const segmentLabel = SEGMENT_LABELS[lead.segment] ?? lead.segment;

  const tags = [
    "Growth Assessment Request",
    lead.segment === "commercial" ? "Commercial" : "Residential",
    `Market: ${lead.locale === "se" ? "Sweden" : "US"}`,
    lead.volume ? `Volume: ${lead.volume}` : undefined,
  ].filter((tag): tag is string => Boolean(tag));

  const baseContact = {
    locationId,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.company,
    website: lead.website || undefined,
    source: `Heat Pump Landing Page (${lead.locale.toUpperCase()})`,
    tags,
  };

  // GHL's public API schema documents customFields entries as requiring an
  // internal field `id`, not the human-readable `key` the client gave us —
  // but the key-based form is commonly accepted in practice. Try it first;
  // if GHL rejects the payload we don't know whether it was the custom
  // field or something else, so retry once without it rather than losing
  // the contact sync entirely. If this keeps failing, we need the field's
  // real ID (GHL: Settings -> Custom Fields -> open the field) rather than
  // its key.
  let upsertRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...baseContact,
      customFields: [
        { key: HEAT_PUMP_TYPE_FIELD_KEY, field_value: heatPumpTypeLabel },
        { key: SEGMENT_FIELD_KEY, field_value: segmentLabel },
      ],
    }),
  });

  if (!upsertRes.ok) {
    const firstError = await upsertRes.text();
    console.error("GHL upsert-contact with customFields failed, retrying without it:", upsertRes.status, firstError);

    upsertRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify(baseContact),
    });

    if (!upsertRes.ok) {
      throw new Error(`GHL upsert-contact failed: ${upsertRes.status} ${await upsertRes.text()}`);
    }
  }

  const body = (await upsertRes.json()) as { contact?: { id?: string } };
  const contactId = body.contact?.id;
  if (!contactId) return;

  const noteBody = [
    `Customer type: ${segmentLabel}`,
    `Heat pump types installed: ${heatPumpTypeLabel}`,
    `Service area: ${lead.location || "(not provided)"}`,
    `Monthly lead volume: ${lead.volume || "(not provided)"}`,
    `Biggest challenge: ${lead.challenge || "(not provided)"}`,
  ].join("\n");

  const noteRes = await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: "Growth Assessment request (from landing page)",
      body: noteBody,
    }),
  });

  if (!noteRes.ok) {
    throw new Error(`GHL create-note failed: ${noteRes.status} ${await noteRes.text()}`);
  }
}
