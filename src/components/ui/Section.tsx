import type { ReactNode } from "react";
import clsx from "clsx";
import { Container } from "./Container";

export function Section({
  children,
  id,
  className,
  tone = "light",
  containerSize = "default",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "light" | "dark" | "muted";
  containerSize?: "default" | "narrow" | "wide";
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-12 sm:py-16 lg:py-20 scroll-mt-20",
        tone === "dark" && "bg-ink-950 text-white",
        tone === "muted" && "bg-ink-50",
        tone === "light" && "bg-background",
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={clsx(
        "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "dark" ? "text-ember-400" : "text-ember-600",
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", tone === "dark" ? "bg-ember-400" : "bg-ember-500")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={clsx(
          "text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={clsx("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-ink-200" : "text-ink-600")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
