"use client";

import { useState } from "react";
import clsx from "clsx";
import { trackEvent } from "@/lib/analytics";
import type { LandingContent } from "@/content/types";

export function SegmentToggle({ content }: { content: LandingContent["segmentSwitch"] }) {
  const [segment, setSegment] = useState<"residential" | "commercial">("residential");

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium text-ink-200">{content.label}</span>
        <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
          {(["residential", "commercial"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSegment(option);
                trackEvent("segment_toggle", { segment: option });
              }}
              className={clsx(
                "focus-ring rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                segment === option ? "bg-white text-ink-950" : "text-ink-200 hover:text-white",
              )}
              aria-pressed={segment === option}
            >
              {option === "residential" ? content.residential : content.commercial}
            </button>
          ))}
        </div>
      </div>
      {segment === "commercial" ? (
        <p className="mt-3 max-w-xl rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-200">
          {content.commercialNote}
        </p>
      ) : null}
    </div>
  );
}
