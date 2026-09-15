import { createHash } from "crypto";

/**
 * Meta Conversions API (server-side) — complements the browser Pixel in
 * AdPixels.tsx. Sending the same conversion both ways and tagging them with
 * the same event_id lets Meta dedupe them into a single event, while the
 * server-side copy still lands even when the browser Pixel is blocked by an
 * ad blocker, ITP/ETP, or the visitor never finishes loading the page.
 *
 * No-ops entirely until META_CONVERSIONS_API_ACCESS_TOKEN is set — nothing
 * is sent, and callers don't need to check isMetaCapiConfigured() themselves
 * first (sendMetaCapiEvent() checks it internally).
 */

const GRAPH_API_VERSION = "v21.0";

export interface MetaCapiUserData {
  email?: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

interface SendMetaCapiEventInput {
  eventName: "Contact" | "Schedule";
  eventId: string;
  eventSourceUrl?: string;
  userData: MetaCapiUserData;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Meta requires em/ph normalized (lowercase, trimmed) then SHA-256 hashed. */
function hashEmail(email: string): string {
  return sha256(email.trim().toLowerCase());
}

/** Digits only (best-effort — Meta recommends E.164, but a hashed match on
 * digits alone still contributes to match quality without collecting country
 * codes explicitly). */
function hashPhone(phone: string): string {
  return sha256(phone.replace(/[^\d]/g, ""));
}

export function isMetaCapiConfigured(): boolean {
  return Boolean(process.env.META_CONVERSIONS_API_ACCESS_TOKEN && process.env.NEXT_PUBLIC_META_PIXEL_ID);
}

export async function sendMetaCapiEvent({ eventName, eventId, eventSourceUrl, userData }: SendMetaCapiEventInput): Promise<void> {
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!accessToken || !pixelId) return;

  const hashedUserData: Record<string, string | string[]> = {};
  if (userData.email) hashedUserData.em = [hashEmail(userData.email)];
  if (userData.phone) hashedUserData.ph = [hashPhone(userData.phone)];
  // IP, user agent, and Meta's own browser/click IDs are sent as-is — only
  // directly identifying fields (email, phone) get hashed.
  if (userData.clientIp) hashedUserData.client_ip_address = userData.clientIp;
  if (userData.userAgent) hashedUserData.client_user_agent = userData.userAgent;
  if (userData.fbp) hashedUserData.fbp = userData.fbp;
  if (userData.fbc) hashedUserData.fbc = userData.fbc;

  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;

  const body = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: hashedUserData,
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error("Meta Conversions API error", response.status, await response.text());
    }
  } catch (error) {
    console.error("Meta Conversions API request failed", error);
  }
}

/** First IP in x-forwarded-for is the original client (Vercel and most proxies append, not prepend). */
export function extractClientIp(forwardedFor: string | null): string | undefined {
  return forwardedFor?.split(",")[0]?.trim() || undefined;
}

/** Meta's browser ID (_fbp) and click-ID (_fbc) cookies, set by the Pixel — read from the raw Cookie header. */
export function extractFbCookies(cookieHeader: string | null): { fbp?: string; fbc?: string } {
  if (!cookieHeader) return {};
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((pair) => {
      const [key, ...rest] = pair.trim().split("=");
      return [key, rest.join("=")];
    }),
  );
  return { fbp: cookies._fbp || undefined, fbc: cookies._fbc || undefined };
}
