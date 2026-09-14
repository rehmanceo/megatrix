import type { LandingContent } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { CheckCircle2, XCircle } from "lucide-react";

export function WhoForNotFor({
  whoFor,
  whoNotFor,
}: {
  whoFor: LandingContent["whoFor"];
  whoNotFor: LandingContent["whoNotFor"];
}) {
  return (
    <Section id="who-for">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-cool-100 bg-cool-50 p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold text-ink-950">{whoFor.title}</h3>
          <ul className="mt-4 space-y-3">
            {whoFor.items.map((item) => (
              <li key={item.text} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cool-600" aria-hidden />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold text-ink-950">{whoNotFor.title}</h3>
          <ul className="mt-4 space-y-3">
            {whoNotFor.items.map((item) => (
              <li key={item.text} className="flex items-start gap-2.5 text-sm text-ink-700">
                <XCircle size={18} className="mt-0.5 shrink-0 text-ink-400" aria-hidden />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
