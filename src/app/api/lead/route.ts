import { NextResponse } from "next/server";

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  location?: string;
  segment?: string;
  volume?: string;
  challenge?: string;
  website?: string;
  hpField?: string;
  locale?: string;
  attribution?: Record<string, string | undefined>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 2000;

function clean(value: unknown, maxLength = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields humans never see. Accept silently without processing.
  if (clean(payload.hpField)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone, 40);
  const company = clean(payload.company);
  const location = clean(payload.location);

  if (!name || !email || !phone || !company || !location) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = {
    name,
    email,
    phone,
    company,
    location,
    segment: clean(payload.segment, 20) || "residential",
    volume: clean(payload.volume, 40),
    challenge: clean(payload.challenge, MAX_LEN),
    website: clean(payload.website, 200),
    locale: clean(payload.locale, 5) || "us",
    attribution: payload.attribution ?? {},
    receivedAt: new Date().toISOString(),
  };

  // Wire a real CRM/webhook destination via env var — no destination is configured
  // yet, so leads are only logged server-side. Set LEAD_WEBHOOK_URL (e.g. a
  // GoHighLevel inbound webhook) to forward automatically once available.
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      console.error("Failed to forward lead to webhook", error);
    }
  } else {
    console.info("New lead (no LEAD_WEBHOOK_URL configured):", lead);
  }

  return NextResponse.json({ ok: true });
}
