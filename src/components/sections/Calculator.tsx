"use client";

import { useMemo, useState } from "react";
import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatNumber } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";

const DEFAULTS: Record<LandingContent["locale"], { leads: number; jobValue: number }> = {
  us: { leads: 40, jobValue: 9000 },
  se: { leads: 30, jobValue: 85000 },
};

export function Calculator({ content, locale }: { content: LandingContent["calculator"]; locale: LandingContent["locale"] }) {
  const defaults = DEFAULTS[locale];
  const [leads, setLeads] = useState(defaults.leads);
  const [jobValue, setJobValue] = useState(defaults.jobValue);
  const [estimateRate, setEstimateRate] = useState(40);
  const [closeRate, setCloseRate] = useState(45);
  const [touched, setTouched] = useState(false);

  const result = useMemo(() => {
    const currentJobs = leads * (estimateRate / 100) * (closeRate / 100);
    const improvedEstimateRate = Math.min(estimateRate * 1.2, 100);
    const improvedCloseRate = Math.min(closeRate * 1.2, 100);
    const improvedJobs = leads * (improvedEstimateRate / 100) * (improvedCloseRate / 100);
    const additionalJobs = Math.max(improvedJobs - currentJobs, 0);
    const additionalRevenue = additionalJobs * jobValue;
    return { additionalJobs, additionalRevenue };
  }, [leads, jobValue, estimateRate, closeRate]);

  function markTouched() {
    if (!touched) {
      setTouched(true);
      trackEvent("calculator_used", { locale });
    }
  }

  return (
    <Section id="calculator" tone="muted">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.description} />

      <div className="mt-10 grid gap-8 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5">
          <Field
            label={content.leadsLabel}
            value={leads}
            min={1}
            max={500}
            onChange={(v) => {
              setLeads(v);
              markTouched();
            }}
          />
          <Field
            label={content.jobValueLabel}
            value={jobValue}
            min={0}
            max={100000}
            step={locale === "se" ? 1000 : 100}
            onChange={(v) => {
              setJobValue(v);
              markTouched();
            }}
          />
          <Field
            label={content.estimateRateLabel}
            value={estimateRate}
            min={1}
            max={100}
            suffix="%"
            onChange={(v) => {
              setEstimateRate(v);
              markTouched();
            }}
          />
          <Field
            label={content.closeRateLabel}
            value={closeRate}
            min={1}
            max={100}
            suffix="%"
            onChange={(v) => {
              setCloseRate(v);
              markTouched();
            }}
          />
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-ink-950 p-6 text-white sm:p-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ember-400">{content.resultHeadline}</p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-ink-300">{content.lostOpportunitiesLabel}</p>
                <p className="font-display text-3xl font-bold">{formatNumber(result.additionalJobs, locale)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-300">{content.lostRevenueLabel}</p>
                <p className="font-display text-3xl font-bold text-ember-400">
                  {formatCurrency(result.additionalRevenue, locale)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs leading-relaxed text-ink-300">{content.disclaimer}</p>
            <Button href="#lead-form" className="mt-4 w-full" onClick={() => trackEvent("cta_click", { placement: "calculator" })}>
              {content.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-ink-700">{label}</label>
        <span className="rounded-md bg-ink-50 px-2 py-0.5 text-sm font-semibold text-ink-950 tabular-nums">
          {value}
          {suffix ?? ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="focus-ring h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-ember-500"
        aria-label={label}
      />
    </div>
  );
}
