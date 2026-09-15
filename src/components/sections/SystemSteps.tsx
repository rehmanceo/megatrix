import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";

export function SystemSteps({ content }: { content: LandingContent["system"] }) {
  return (
    <Section id="system">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.steps.map((step) => (
          <div key={step.index} className="rounded-2xl border border-ink-100 bg-white p-6">
            <span className="font-mono text-sm font-semibold text-ember-600">{step.index}</span>
            <p className="mt-2 font-display text-lg font-semibold text-ink-950">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
