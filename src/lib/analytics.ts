/**
 * Centralized analytics event contract.
 *
 * Naming convention: `<area>_<action>` in snake_case, mirrored to GA4 (window.gtag),
 * Meta Pixel (window.fbq), and a raw dataLayer push so a GTM container can fan out
 * to Google Ads conversion tracking or server-side endpoints without code changes.
 *
 * No third-party script is loaded by default. Wire real IDs via env vars
 * (NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_META_PIXEL_ID) and load the vendor snippets in
 * src/app/[locale]/layout.tsx once those IDs exist — do not ship placeholder IDs.
 */

export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "form_started"
  | "form_field_completed"
  | "form_submitted"
  | "form_error"
  | "calculator_used"
  | "calendar_opened"
  | "appointment_booked"
  | "phone_click"
  | "email_click"
  | "segment_toggle"
  | "faq_expanded"
  | "locale_switch";

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  const enriched: AnalyticsPayload = {
    ...payload,
    ...getStoredAttribution(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...enriched });

  window.gtag?.("event", event, enriched);
  window.fbq?.("trackCustom", event, enriched);

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, enriched);
  }
}

const ATTRIBUTION_KEY = "megatrix_attribution";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  market?: string;
  first_touch_at?: string;
}

export function captureAttribution(market: string): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const existing = getStoredAttribution();

  if (existing.first_touch_at) return;

  const attribution: Attribution = {
    utm_source: params.get("utm_source") ?? "direct",
    utm_medium: params.get("utm_medium") ?? "none",
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    landing_page: window.location.pathname,
    market,
    first_touch_at: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage unavailable (private browsing, blocked storage) — attribution
    // simply won't persist across sessions; the current pageview still works.
  }
}

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
