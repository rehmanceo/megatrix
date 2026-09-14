import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { X, Check } from "lucide-react";

export function Transformation({ content }: { content: LandingContent["transformation"] }) {
  return (
    <Section id="transformation" tone="dark">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} tone="dark" />

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-2 divide-x divide-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wide text-ink-300 sm:text-sm">
          <div className="px-4 py-3 sm:px-6">{content.beforeLabel}</div>
          <div className="px-4 py-3 text-ember-400 sm:px-6">{content.afterLabel}</div>
        </div>
        <div className="divide-y divide-white/10">
          {content.items.map((item) => (
            <div key={item.before} className="grid grid-cols-2 divide-x divide-white/10">
              <div className="flex items-start gap-2.5 px-4 py-4 sm:px-6">
                <X className="mt-0.5 shrink-0 text-ink-500" size={16} aria-hidden />
                <p className="text-sm text-ink-300">{item.before}</p>
              </div>
              <div className="flex items-start gap-2.5 px-4 py-4 sm:px-6">
                <Check className="mt-0.5 shrink-0 text-cool-400" size={16} aria-hidden />
                <p className="text-sm text-white">{item.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
