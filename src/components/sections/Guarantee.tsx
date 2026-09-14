import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ShieldCheck } from "lucide-react";

export function Guarantee({ content }: { content: LandingContent["guarantee"] }) {
  return (
    <Section id="guarantee" tone="dark">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} tone="dark" />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {content.pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <ShieldCheck className="text-ember-400" size={22} aria-hidden />
            <p className="mt-3 font-display text-lg font-semibold text-white">{pillar.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-200">{pillar.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-300">{content.disclaimer}</p>
    </Section>
  );
}
