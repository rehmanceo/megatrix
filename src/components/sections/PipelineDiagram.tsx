import { Phone, MessageCircleReply, BadgeCheck, CalendarCheck2, RefreshCcw, Trophy } from "lucide-react";

const ICONS = [Phone, MessageCircleReply, BadgeCheck, CalendarCheck2, RefreshCcw, Trophy];

export function PipelineDiagram({ stages, caption }: { stages: string[]; caption: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
        {stages.map((stage, index) => {
          const Icon = ICONS[index % ICONS.length];
          const isLast = index === stages.length - 1;
          return (
            <div key={stage} className="flex sm:flex-1 sm:flex-col">
              <div className="flex flex-1 flex-col items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-4 text-center">
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
              </div>
              {!isLast ? (
                <>
                  <div className="mx-2 hidden w-6 flex-none items-center justify-center sm:flex" aria-hidden>
                    <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                      <line x1="0" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-ember-400 animate-flow" />
                      <path d="M14 1L19 5L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ember-400" />
                    </svg>
                  </div>
                  <div className="my-1 flex h-6 items-center justify-center sm:hidden" aria-hidden>
                    <svg width="10" height="24" viewBox="0 0 10 24" fill="none">
                      <line x1="5" y1="0" x2="5" y2="18" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-ember-400 animate-flow" />
                      <path d="M1 14L5 19L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ember-400" />
                    </svg>
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs text-ink-300">{caption}</p>
    </div>
  );
}
