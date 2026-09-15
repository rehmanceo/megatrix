import { Fragment } from "react";
import { Phone, MessageCircleReply, BadgeCheck, CalendarCheck2, Trophy, ArrowRight, ChevronDown } from "lucide-react";

const ICONS = [Phone, MessageCircleReply, BadgeCheck, CalendarCheck2, Trophy];

export function PipelineDiagram({ stages, caption }: { stages: string[]; caption: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2">
        {stages.map((stage, index) => {
          const Icon = ICONS[index % ICONS.length];
          const isLast = index === stages.length - 1;
          return (
            <Fragment key={stage}>
              <div className="relative flex min-h-[104px] flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-white/[0.06] px-3 py-4 text-center">
                <span
                  className={
                    isLast
                      ? "flex h-9 w-9 items-center justify-center rounded-full bg-ember-500 text-white"
                      : "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-ember-400"
                  }
                >
                  <Icon size={18} aria-hidden />
                </span>
                <span className="text-xs font-semibold leading-tight text-white sm:text-sm">{stage}</span>

                {!isLast ? (
                  <span
                    className="absolute -bottom-3 right-5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-ember-500 text-white ring-4 ring-ink-950 sm:hidden"
                    aria-hidden
                  >
                    <ChevronDown size={13} />
                  </span>
                ) : null}
              </div>
              {!isLast ? (
                <div className="hidden w-5 flex-none items-center justify-center sm:flex" aria-hidden>
                  <ArrowRight size={16} className="text-ember-400" />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs text-ink-300">{caption}</p>
    </div>
  );
}
