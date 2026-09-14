"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MARKET_OPTIONS } from "@/content/markets";
import type { Locale } from "@/content/types";
import { trackEvent } from "@/lib/analytics";

export function LocaleSwitcher({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = MARKET_OPTIONS.find((m) => m.locale === locale) ?? MARKET_OPTIONS[0];

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={clsx(
          "focus-ring flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
          dark
            ? "border-white/15 text-white hover:border-white/30"
            : "border-ink-200 text-ink-800 hover:border-ink-400",
        )}
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.label}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className={clsx(open && "rotate-180", "transition-transform")}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-lg"
        >
          {MARKET_OPTIONS.map((option) => (
            <li key={option.locale}>
              <Link
                href={option.href}
                role="option"
                aria-selected={option.locale === locale}
                onClick={() => trackEvent("locale_switch", { to: option.locale, from: locale })}
                className={clsx(
                  "flex items-center gap-2 px-3.5 py-2 text-sm text-ink-800 hover:bg-ink-50",
                  option.locale === locale && "font-semibold text-ink-950",
                )}
              >
                <span aria-hidden>{option.flag}</span>
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
