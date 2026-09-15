import { NextResponse } from "next/server";
import { sendMetaCapiEvent, isMetaCapiConfigured, extractClientIp, extractFbCookies } from "@/lib/metaCapi";

/**
 * Server-side copy of the "Schedule" (calendar booking) conversion, for Meta
 * Conversions API. Called by GhlCalendarEmbed.tsx right after it detects a
 * booking via the GHL widget's postMessage. No PII is available at this
 * point — the booking iframe is a cross-origin third party and doesn't hand
 * us the booker's name/email/phone — so this only carries IP, user agent,
 * and Meta's own _fbp/_fbc cookies. Still useful: it reaches Meta even when
 * the browser Pixel fire is blocked, and shares the same event_id as that
 * Pixel fire so Meta dedupes rather than double-counts.
 */
export async function POST(request: Request) {
  let body: { eventId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventId = typeof body.eventId === "string" ? body.eventId.slice(0, 100) : "";
  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
  }

  if (isMetaCapiConfigured()) {
    const { fbp, fbc } = extractFbCookies(request.headers.get("cookie"));
    await sendMetaCapiEvent({
      eventName: "Schedule",
      eventId,
      eventSourceUrl: request.headers.get("referer") ?? undefined,
      userData: {
        clientIp: extractClientIp(request.headers.get("x-forwarded-for")),
        userAgent: request.headers.get("user-agent") ?? undefined,
        fbp,
        fbc,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
