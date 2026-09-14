"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { LandingContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { trackEvent } from "@/lib/analytics";

export function Nav({ content }: { content: LandingContent }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between" size="wide">
        <Link href={`/${content.locale}`} className="focus-ring flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink-950">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-950 text-sm text-ember-400">M</span>
          {content.siteName}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {content.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring text-sm font-medium text-ink-600 hover:text-ink-950">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher locale={content.locale} />
          <Button href="#lead-form" size="md" onClick={() => trackEvent("cta_click", { placement: "nav" })}>
            {content.nav.ctaLabel}
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring -mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-ink-800 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-ink-100 bg-background px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-2 py-2.5 text-base font-medium text-ink-800 hover:bg-ink-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink-100 pt-3">
            <LocaleSwitcher locale={content.locale} />
          </div>
          <Button href="#lead-form" size="md" className="mt-3 w-full" onClick={() => setOpen(false)}>
            {content.nav.ctaLabel}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
