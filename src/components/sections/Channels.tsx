import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Channels({ content }: { content: LandingContent["channels"] }) {
  return (
    <Section id="channels" tone="muted">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {content.cards.map((card) => (
          <div key={card.title} className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6">
            <p className="font-display text-lg font-semibold text-ink-950">{card.title}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{card.description}</p>
            <p className="mt-4 border-t border-ink-100 pt-3 text-xs font-semibold uppercase tracking-wide text-ember-600">
              {card.bestFor}
            </p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-600">{content.note}</p>
    </Section>
  );
}
