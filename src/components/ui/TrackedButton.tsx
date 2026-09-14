"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";
import { trackEvent, type AnalyticsEvent, type AnalyticsPayload } from "@/lib/analytics";

/**
 * Server Components can't pass event-handler functions to Client Components
 * (the RSC boundary can't serialize closures). This wrapper is itself a Client
 * Component, so it can define the onClick locally from plain, serializable
 * props (`event` + `payload`) passed down from a Server Component parent.
 */
export function TrackedButton({
  event = "cta_click",
  payload,
  href,
  variant,
  size,
  className,
  children,
}: {
  event?: AnalyticsEvent;
  payload?: AnalyticsPayload;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button href={href} variant={variant} size={size} className={className} onClick={() => trackEvent(event, payload)}>
      {children}
    </Button>
  );
}
