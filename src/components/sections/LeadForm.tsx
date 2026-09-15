"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { LandingContent } from "@/content/types";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { trackEvent, trackContact, getStoredAttribution } from "@/lib/analytics";
import { Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

// Fixed, locale-independent values paired positionally with
// content.heatPumpTypeOptions so GHL always receives the same enum
// regardless of which market's form was submitted.
const HEAT_PUMP_TYPE_VALUES = ["air_to_air", "air_to_water", "both", "other"] as const;

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  segment: "residential" | "commercial";
  heatPumpType: string;
  volume: string;
  challenge: string;
  website: string;
  hpField: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  location: "",
  segment: "residential",
  heatPumpType: "",
  volume: "",
  challenge: "",
  website: "",
  hpField: "",
};

export function LeadForm({ content, locale }: { content: LandingContent["form"]; locale: LandingContent["locale"] }) {
  const router = useRouter();
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const startedRef = useRef(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_started", { locale });
    }
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = content.errorRequired;
    if (!values.email.trim()) next.email = content.errorRequired;
    else if (!EMAIL_RE.test(values.email)) next.email = content.errorEmail;
    if (!values.phone.trim()) next.phone = content.errorRequired;
    else if (!PHONE_RE.test(values.phone)) next.phone = content.errorPhone;
    if (!values.company.trim()) next.company = content.errorRequired;
    if (!values.location.trim()) next.location = content.errorRequired;
    if (!values.heatPumpType) next.heatPumpType = content.errorRequired;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) {
      trackEvent("form_error", { locale });
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          attribution: getStoredAttribution(),
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      trackContact({ locale, segment: values.segment });
      router.push(`/${locale}/thank-you`);
    } catch {
      setStatus("error");
      trackEvent("form_error", { locale, reason: "network" });
    }
  }

  return (
    <Section id="lead-form" tone="muted">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.description} align="center" />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto mt-10 max-w-2xl space-y-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label={content.nameLabel}
            value={values.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            autoComplete="name"
          />
          <TextField
            id="company"
            label={content.companyLabel}
            value={values.company}
            onChange={(v) => update("company", v)}
            error={errors.company}
            autoComplete="organization"
          />
          <TextField
            id="email"
            type="email"
            label={content.emailLabel}
            value={values.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            autoComplete="email"
          />
          <TextField
            id="phone"
            type="tel"
            label={content.phoneLabel}
            value={values.phone}
            onChange={(v) => update("phone", v)}
            error={errors.phone}
            autoComplete="tel"
          />
          <TextField
            id="location"
            label={content.locationLabel}
            placeholder={content.locationPlaceholder}
            value={values.location}
            onChange={(v) => update("location", v)}
            error={errors.location}
          />
          <div>
            <label htmlFor="volume" className="mb-1.5 block text-sm font-medium text-ink-700">
              {content.volumeLabel}
            </label>
            <select
              id="volume"
              value={values.volume}
              onChange={(e) => update("volume", e.target.value)}
              className="focus-ring w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-950"
            >
              <option value="" disabled>
                —
              </option>
              {content.volumeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-ink-700">{content.segmentLabel}</legend>
          <div className="flex flex-wrap gap-3">
            {(
              [
                ["residential", content.segmentResidential],
                ["commercial", content.segmentCommercial],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="focus-ring flex cursor-pointer items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm has-[:checked]:border-ember-500 has-[:checked]:bg-ember-50 has-[:checked]:text-ember-700"
              >
                <input
                  type="radio"
                  name="segment"
                  value={value}
                  checked={values.segment === value}
                  onChange={() => update("segment", value)}
                  className="accent-ember-500"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-ink-700">{content.heatPumpTypeLabel}</legend>
          <div className="flex flex-wrap gap-3">
            {content.heatPumpTypeOptions.map((label, i) => {
              const value = HEAT_PUMP_TYPE_VALUES[i];
              return (
                <label
                  key={value}
                  className="focus-ring flex cursor-pointer items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm has-[:checked]:border-ember-500 has-[:checked]:bg-ember-50 has-[:checked]:text-ember-700"
                >
                  <input
                    type="radio"
                    name="heatPumpType"
                    value={value}
                    checked={values.heatPumpType === value}
                    onChange={() => update("heatPumpType", value)}
                    className="accent-ember-500"
                  />
                  {label}
                </label>
              );
            })}
          </div>
          {errors.heatPumpType ? (
            <p role="alert" className="mt-1.5 text-xs text-ember-600">
              {errors.heatPumpType}
            </p>
          ) : null}
        </fieldset>

        <div>
          <label htmlFor="challenge" className="mb-1.5 block text-sm font-medium text-ink-700">
            {content.challengeLabel}
          </label>
          <textarea
            id="challenge"
            rows={3}
            placeholder={content.challengePlaceholder}
            value={values.challenge}
            onChange={(e) => update("challenge", e.target.value)}
            className="focus-ring w-full resize-none rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-ink-300"
          />
        </div>

        <TextField
          id="website"
          label={content.websiteLabel}
          value={values.website}
          onChange={(v) => update("website", v)}
        />

        <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="company_url">Leave this field empty</label>
          <input
            id="company_url"
            name="company_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.hpField}
            onChange={(e) => setValues((v) => ({ ...v, hpField: e.target.value }))}
          />
        </div>

        {status === "error" ? (
          <p role="alert" className="rounded-lg bg-ember-50 px-4 py-3 text-sm text-ember-700">
            {content.genericError}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" size={18} aria-hidden />
              {content.submittingLabel}
            </>
          ) : (
            content.submitLabel
          )}
        </Button>

        <p className="text-center text-xs text-ink-400">{content.privacyNote}</p>
      </form>
    </Section>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="focus-ring w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-ink-300 aria-[invalid=true]:border-ember-500"
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-ember-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
