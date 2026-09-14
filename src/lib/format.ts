import type { Locale } from "@/content/types";

const NUMBER_LOCALE: Record<Locale, string> = {
  us: "en-US",
  se: "sv-SE",
};

export function formatCurrency(value: number, locale: Locale): string {
  const rounded = Math.round(value);
  const formatted = new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    maximumFractionDigits: 0,
  }).format(rounded);

  return locale === "se" ? `${formatted} kr` : `$${formatted}`;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
