import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GhlCalendarEmbed } from "@/components/sections/GhlCalendarEmbed";
import { CheckCircle2 } from "lucide-react";

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const { thankYou } = content;

  return (
    <>
      <Section containerSize="narrow" className="!pb-0 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cool-50 text-cool-600">
          <CheckCircle2 size={28} aria-hidden />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ember-600">{thankYou.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
          {thankYou.title}
        </h1>
        <p className="mt-3 text-lg text-ink-600">{thankYou.description}</p>

        <ol className="mx-auto mt-10 max-w-lg space-y-5 text-left">
          {thankYou.steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-950 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-ink-950">{step.title}</p>
                <p className="mt-0.5 text-sm text-ink-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-ink-100 bg-ink-50 p-6">
          <p className="text-sm text-ink-700">{thankYou.calendarPrompt}</p>
          <Button href="#calendar" className="mt-4 w-full">
            {thankYou.calendarCtaLabel}
          </Button>
        </div>
      </Section>

      <Section containerSize="narrow">
        <GhlCalendarEmbed
          heading={thankYou.calendarHeading}
          intro={thankYou.calendarIntro}
          popupTitle={thankYou.popupTitle}
          popupBody={thankYou.popupBody}
          popupCloseLabel={thankYou.popupCloseLabel}
        />

        <div className="text-center">
          <Button href={thankYou.backHref} variant="ghost" className="mt-10">
            {thankYou.backLabel}
          </Button>
        </div>
      </Section>
    </>
  );
}
