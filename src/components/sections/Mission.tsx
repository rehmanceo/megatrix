import type { LandingContent } from "@/content/types";
import { Section, Eyebrow } from "@/components/ui/Section";

export function Mission({ content }: { content: LandingContent["mission"] }) {
  return (
    <Section id="mission" tone="muted" containerSize="narrow">
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
        {content.title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">
        {content.paragraphs.map((p) => (
          <p key={p} className={p.startsWith("[") ? "italic text-ink-400" : undefined}>
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
