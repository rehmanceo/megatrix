import type { LandingContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { PipelineDiagram } from "./PipelineDiagram";

export function Hero({ content }: { content: LandingContent }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-24 pt-14 text-white sm:pb-24 sm:pt-20 lg:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(234,88,12,0.25), transparent), radial-gradient(50% 40% at 100% 20%, rgba(45,212,191,0.15), transparent)",
        }}
        aria-hidden
      />
      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ember-400">
              {content.hero.eyebrow}
            </p>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {content.hero.headline}{" "}
              <span className="text-ember-400">{content.hero.highlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200">{content.hero.subheadline}</p>

            <div className="mt-6 flex flex-col flex-wrap gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <TrackedButton href="#lead-form" size="lg" payload={{ placement: "hero_primary" }}>
                {content.hero.primaryCta.label}
              </TrackedButton>
              <TrackedButton
                href="#system"
                variant="ghost"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                payload={{ placement: "hero_secondary" }}
              >
                {content.hero.secondaryCta.label}
              </TrackedButton>
            </div>
            {content.hero.primaryCta.sublabel ? (
              <p className="mt-3 text-center text-sm text-ink-300">{content.hero.primaryCta.sublabel}</p>
            ) : null}
          </div>

          <div>
            <PipelineDiagram stages={content.hero.diagram.stages} caption={content.hero.diagram.caption} />
            <p className="mt-4 px-1 text-center text-sm text-ink-300 lg:text-left">{content.hero.proofLine}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
