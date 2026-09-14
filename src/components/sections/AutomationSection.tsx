import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Circle, ArrowRight } from "lucide-react";

export function AutomationSection({ content }: { content: LandingContent["automation"] }) {
  return (
    <Section id="automation">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{content.manualTitle}</p>
          <ol className="space-y-3">
            {content.manualSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-ink-600">
                <Circle size={14} className="mt-1 shrink-0 text-ink-300" aria-hidden />
                <span>
                  <span className="mr-1 text-ink-400">{i + 1}.</span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-ember-100 bg-ember-50 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ember-600">{content.automatedTitle}</p>
          <ol className="space-y-3">
            {content.automatedSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-ink-800">
                <ArrowRight size={14} className="mt-1 shrink-0 text-ember-500" aria-hidden />
                <span>
                  <span className="mr-1 text-ember-600">{i + 1}.</span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
