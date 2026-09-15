import { headers } from "next/headers";
import type { Locale } from "@/content/types";

/**
 * Hero location personalization.
 *
 * Source: Vercel's edge network resolves every request's IP to a
 * country/region/city and forwards it as `x-vercel-ip-*` request headers —
 * automatically, on every plan, with no external API call, no API key, and
 * no added latency (the data is already sitting on the request by the time
 * a Server Component reads it). We never see or log the visitor's raw IP;
 * Vercel resolves it upstream and only the resolved geo fields reach this
 * code. Locally (or off Vercel) these headers are simply absent, and every
 * function below degrades to the safe default with no error and no delay —
 * there is nothing to time out or fail, since no network call is made here.
 *
 * Only two markets are actually served today. SUPPORTED_MARKETS is the one
 * place that fact is encoded — a visitor whose detected country doesn't
 * match the market they're viewing always gets that market's generic
 * default, never another market's city or country label. This is what
 * keeps a visitor from India hitting /us from ever seeing anything implying
 * Megatrix operates in a market it doesn't.
 */

export const SUPPORTED_MARKETS: Record<Locale, { countryCode: string; defaultLabel: string }> = {
  us: { countryCode: "US", defaultLabel: "United States" },
  se: { countryCode: "SE", defaultLabel: "Sverige" },
};

// ISO 3166-2:US region codes -> full name, for the "region-only" fallback
// tier ("CALIFORNIA STATE"). Vercel's x-vercel-ip-country-region header
// returns the code (e.g. "CA"), not the name.
const US_STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "Washington, D.C.",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  PR: "Puerto Rico",
};

export type PersonalizationTier = "city" | "region" | "country" | "default";

export interface VisitorLocation {
  countryCode?: string;
  regionCode?: string;
  city?: string;
}

export interface LocationPersonalization {
  label: string;
  tier: PersonalizationTier;
}

/** Reads Vercel's geo headers for the current request. No I/O, cannot fail or time out. */
export async function getVisitorLocation(): Promise<VisitorLocation> {
  const headerList = await headers();

  const countryCode = headerList.get("x-vercel-ip-country") || undefined;
  const regionCode = headerList.get("x-vercel-ip-country-region") || undefined;
  const rawCity = headerList.get("x-vercel-ip-city") || undefined;

  let city: string | undefined;
  if (rawCity) {
    try {
      // Vercel sends the city URI-encoded (e.g. "New%20York").
      const decoded = decodeURIComponent(rawCity).trim();
      // Sanity-guard against malformed/garbage values rather than trusting
      // any non-empty string as a "reliable" city.
      if (decoded.length >= 2 && decoded.length <= 60 && /^[\p{L}\p{M}\s.'-]+$/u.test(decoded)) {
        city = decoded;
      }
    } catch {
      city = undefined;
    }
  }

  return { countryCode, regionCode, city };
}

/**
 * Applies the per-market safety + confidence hierarchy: city > region >
 * country > that market's generic default. A location belonging to a
 * different country than the market being viewed always collapses to the
 * default label — this is what prevents a Swedish visitor on /us from
 * seeing a Swedish city, or an unsupported country's visitor from seeing
 * anything implying local presence.
 */
export function getLocationPersonalization(locale: Locale, location: VisitorLocation): LocationPersonalization {
  const market = SUPPORTED_MARKETS[locale];
  const inMarket = location.countryCode?.toUpperCase() === market.countryCode;

  if (!inMarket) {
    return { label: market.defaultLabel, tier: "default" };
  }

  if (location.city) {
    return { label: location.city, tier: "city" };
  }

  if (locale === "us" && location.regionCode) {
    const stateName = US_STATE_NAMES[location.regionCode.toUpperCase()];
    if (stateName) {
      return { label: `${stateName} State`, tier: "region" };
    }
  }

  return { label: market.defaultLabel, tier: "country" };
}

/** Convenience formatter for the form's service-area prefill (never shown if not in-market). */
export function getServiceAreaPrefill(locale: Locale, location: VisitorLocation): string {
  const market = SUPPORTED_MARKETS[locale];
  if (location.countryCode?.toUpperCase() !== market.countryCode || !location.city) return "";

  if (locale === "us" && location.regionCode) {
    return `${location.city}, ${location.regionCode.toUpperCase()}`;
  }
  return location.city;
}
