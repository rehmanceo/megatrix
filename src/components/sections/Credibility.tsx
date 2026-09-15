import type { LandingContent } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { ShieldCheck } from "lucide-react";

export function Credibility({ content }: { content: LandingContent["credibility"] }) {
  return (
    <Section tone="muted" className="!py-12 sm:!py-14">
      <h2 className="text-balance text-center font-display text-xl font-semibold text-ink-900 sm:text-2xl">
        {content.title}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {content.items.map((item) => (
          <div key={item.title} className="flex gap-3 rounded-2xl border border-ink-100 bg-white p-6">
            <ShieldCheck className="mt-0.5 shrink-0 text-cool-600" size={20} aria-hidden />
            <div>
              <p className="font-semibold text-ink-950">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
