interface GhlLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  segment: string;
  volume: string;
  challenge: string;
  website: string;
  locale: string;
}

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

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

  const tags = [
    "Growth Assessment Request",
    lead.segment === "commercial" ? "Commercial" : "Residential",
    `Market: ${lead.locale === "se" ? "Sweden" : "US"}`,
    lead.volume ? `Volume: ${lead.volume}` : undefined,
  ].filter((tag): tag is string => Boolean(tag));

  const upsertRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      locationId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      companyName: lead.company,
      website: lead.website || undefined,
      source: `Heat Pump Landing Page (${lead.locale.toUpperCase()})`,
      tags,
    }),
  });

  if (!upsertRes.ok) {
    throw new Error(`GHL upsert-contact failed: ${upsertRes.status} ${await upsertRes.text()}`);
  }

  const body = (await upsertRes.json()) as { contact?: { id?: string } };
  const contactId = body.contact?.id;
  if (!contactId) return;

  const noteBody = [
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
