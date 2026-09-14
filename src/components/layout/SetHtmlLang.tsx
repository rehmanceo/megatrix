"use client";

import { useEffect } from "react";

/**
 * Next.js only allows the root layout to render <html>, so per-locale <html lang>
 * can't be set via JSX for nested [locale] routes. This corrects it as early as
 * hydration allows.
 */
export function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
