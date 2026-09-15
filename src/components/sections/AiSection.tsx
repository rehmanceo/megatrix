import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import clsx from "clsx";
import { Sparkles, User, Users } from "lucide-react";

const BADGE_STYLE: Record<string, string> = {
  ai: "bg-cool-50 text-cool-600 ring-cool-100",
  human: "bg-ember-50 text-ember-600 ring-ember-100",
  shared: "bg-ink-50 text-ink-700 ring-ink-100",
};

const BADGE_ICON = {
  ai: Sparkles,
  human: User,
  shared: Users,
};

export function AiSection({ content }: { content: LandingContent["ai"] }) {
  return (
    <Section id="ai" tone="muted">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} />

      <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold">
        <Legend colorClass={BADGE_STYLE.ai} label={content.legendAi} Icon={BADGE_ICON.ai} />
        <Legend colorClass={BADGE_STYLE.shared} label={content.legendShared} Icon={BADGE_ICON.shared} />
        <Legend colorClass={BADGE_STYLE.human} label={content.legendHuman} Icon={BADGE_ICON.human} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.capabilities.map((item) => {
          const Icon = BADGE_ICON[item.controlled];
          return (
            <div key={item.title} className="rounded-2xl border border-ink-100 bg-white p-6">
              <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1", BADGE_STYLE[item.controlled])}>
                <Icon size={12} aria-hidden />
                {item.controlled === "ai" ? content.legendAi : item.controlled === "human" ? content.legendHuman : content.legendShared}
              </span>
              <p className="mt-3 font-display text-base font-semibold text-ink-950">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.description}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-8 max-w-2xl rounded-xl border border-ink-100 bg-white px-5 py-4 text-sm text-ink-600">
        {content.disclaimer}
      </p>
    </Section>
  );
}

function Legend({ colorClass, label, Icon }: { colorClass: string; label: string; Icon: typeof Sparkles }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1", colorClass)}>
      <Icon size={13} aria-hidden />
      {label}
    </span>
  );
}
