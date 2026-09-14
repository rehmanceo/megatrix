import { NextResponse } from "next/server";
import { forwardLeadToGhl, isGhlConfigured } from "@/lib/ghl";

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

  // Two optional, independent CRM destinations — set either or both via env vars.
  // Neither failing should block the visitor's confirmation, so errors are only
  // logged, never surfaced to the response.
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const ghlConfigured = isGhlConfigured();

  if (!webhookUrl && !ghlConfigured) {
    console.info("New lead (no LEAD_WEBHOOK_URL or GHL_API_KEY/GHL_LOCATION_ID configured):", lead);
  }

  async function forwardToWebhook() {
    if (!webhookUrl) return;
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}: ${await response.text()}`);
    }
  }

  const deliveries = await Promise.allSettled([
    forwardToWebhook(),
    ghlConfigured ? forwardLeadToGhl(lead) : Promise.resolve(),
  ]);

  for (const result of deliveries) {
    if (result.status === "rejected") {
      console.error("Failed to forward lead to a CRM destination", result.reason);
    }
  }

  return NextResponse.json({ ok: true });
}
