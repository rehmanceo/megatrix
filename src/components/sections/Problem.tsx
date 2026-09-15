import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrendingDown, HardHat, FileClock, FileSpreadsheet, CircleDollarSign, Hourglass } from "lucide-react";

const ICONS = [TrendingDown, HardHat, FileClock, FileSpreadsheet, CircleDollarSign, Hourglass];

export function Problem({ content }: { content: LandingContent["problem"] }) {
  return (
    <Section id="problem">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {content.items.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div key={item.title} className="rounded-2xl border border-ink-100 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-50 text-ember-600">
                <Icon size={18} aria-hidden />
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-ink-950">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
