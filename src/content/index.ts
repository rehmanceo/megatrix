import type { Locale, LandingContent } from "./types";
import { enUs } from "./en-us";
import { svSe } from "./sv-se";

export const LOCALES: Locale[] = ["us", "se"];

const CONTENT: Record<Locale, LandingContent> = {
  us: enUs,
  se: svSe,
};

export function getContent(locale: Locale): LandingContent {
  return CONTENT[locale];
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export * from "./types";
