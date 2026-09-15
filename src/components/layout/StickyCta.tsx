"use client";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function StickyCta({ label }: { label: string }) {
  return (
    <div
      role="region"
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 p-3 backdrop-blur lg:hidden"
    >
      <Button
        href="#lead-form"
        size="lg"
        className="w-full"
        onClick={() => trackEvent("cta_click", { placement: "sticky_mobile" })}
      >
        {label}
      </Button>
    </div>
  );
}
