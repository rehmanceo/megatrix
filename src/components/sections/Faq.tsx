import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";

export function Faq({ content }: { content: LandingContent["faq"] }) {
  return (
    <Section id="faq">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />
      <div className="mt-10 space-y-10">
        {content.groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ember-600">{group.title}</h3>
            <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
              {group.items.map((item) => (
                <details key={item.q} className="group px-5 py-4 open:bg-ink-50/50 sm:px-6">
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-950 marker:content-none">
                    {item.q}
                    <ChevronDown size={18} className="shrink-0 text-ink-400 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
