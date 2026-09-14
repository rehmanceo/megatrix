import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AlertTriangle } from "lucide-react";

export function Problem({ content }: { content: LandingContent["problem"] }) {
  return (
    <Section id="problem">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {content.items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-ink-100 bg-white p-6">
            <AlertTriangle className="text-ember-500" size={20} aria-hidden />
            <p className="mt-3 font-display text-lg font-semibold text-ink-950">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
