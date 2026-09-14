import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FileText, MessageSquareQuote } from "lucide-react";

export function Proof({ content }: { content: LandingContent["proof"] }) {
  return (
    <Section id="proof" tone="muted">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col items-start rounded-2xl border border-dashed border-ink-300 bg-white p-6">
          <MessageSquareQuote className="text-ink-400" size={22} aria-hidden />
          <p className="mt-3 font-display text-base font-semibold text-ink-700">{content.placeholderTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">{content.placeholderBody}</p>
        </div>
        <div className="flex flex-col items-start rounded-2xl border border-dashed border-ink-300 bg-white p-6">
          <FileText className="text-ink-400" size={22} aria-hidden />
          <p className="mt-3 font-display text-base font-semibold text-ink-700">{content.caseStudyPlaceholderTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">{content.caseStudyPlaceholderBody}</p>
        </div>
      </div>
    </Section>
  );
}
