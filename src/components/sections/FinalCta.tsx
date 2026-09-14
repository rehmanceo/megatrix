import type { LandingContent } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { TrackedButton } from "@/components/ui/TrackedButton";

export function FinalCta({ content }: { content: LandingContent["finalCta"] }) {
  return (
    <Section tone="dark" containerSize="narrow" className="text-center">
      <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-200">{content.description}</p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <TrackedButton href="#lead-form" size="lg" payload={{ placement: "final_cta" }}>
          {content.primaryCta.label}
        </TrackedButton>
        {content.primaryCta.sublabel ? <p className="text-sm text-ink-300">{content.primaryCta.sublabel}</p> : null}
      </div>
      <p className="mx-auto mt-6 max-w-lg text-sm text-ink-300">{content.secondaryNote}</p>
    </Section>
  );
}
