import type { Locale } from "./types";

export interface MarketOption {
  locale: Locale;
  href: string;
  flag: string;
  label: string;
}

export const MARKET_OPTIONS: MarketOption[] = [
  { locale: "us", href: "/us", flag: "🇺🇸", label: "United States" },
  { locale: "se", href: "/se", flag: "🇸🇪", label: "Sverige" },
];
