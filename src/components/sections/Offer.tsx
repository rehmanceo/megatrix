import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export function Offer({ content, ctaLabel }: { content: LandingContent["offer"]; ctaLabel: string }) {
  return (
    <Section id="offer">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {content.components.map((component) => (
          <div key={component.name} className="rounded-2xl border border-ink-100 bg-white p-6">
            <p className="font-display text-lg font-semibold text-ink-950">{component.name}</p>
            <p className="mt-1.5 text-sm text-ink-600">{component.summary}</p>
            <ul className="mt-4 space-y-2">
              {component.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                  <Check size={15} className="mt-0.5 shrink-0 text-cool-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50 px-6 py-7 text-center">
        <p className="max-w-xl text-sm text-ink-600">{content.pricingNote}</p>
        <Button href="#lead-form">{ctaLabel}</Button>
      </div>
    </Section>
  );
}
