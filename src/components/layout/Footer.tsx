import Link from "next/link";
import type { LandingContent } from "@/content/types";
import { MARKET_OPTIONS } from "@/content/markets";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer({ content }: { content: LandingContent }) {
  return (
    <footer className="border-t border-white/10 bg-ink-950 pt-14 pb-8 text-ink-300">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <Link href={`/${content.locale}`} className="focus-ring inline-block text-white" aria-label={content.siteName}>
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">{content.footer.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">{content.footer.systemLabel}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {content.footer.systemLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="focus-ring hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">{content.footer.marketsLabel}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {MARKET_OPTIONS.map((option) => (
                <li key={option.locale}>
                  <Link href={option.href} className="focus-ring hover:text-white">
                    {option.flag} {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{content.footer.disclaimer}</p>
          <ul className="flex flex-wrap gap-4">
            {content.footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
