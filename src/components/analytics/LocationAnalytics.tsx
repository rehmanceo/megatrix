"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import type { PersonalizationTier } from "@/lib/geo";

/**
 * Fires once on mount so "did personalized hero copy move CTA clicks / form
 * starts / bookings" can be answered later. Only the tier (city/region/
 * country/default) is sent — never the literal city name or any IP-derived
 * data — since the tier is all that's needed to compare personalization
 * levels, and it keeps this from becoming a location-tracking pipeline.
 */
export function LocationAnalytics({ tier, locale }: { tier: PersonalizationTier; locale: string }) {
  useEffect(() => {
    trackEvent("page_view", { location_personalization: tier, locale });
  }, [tier, locale]);

  return null;
}
