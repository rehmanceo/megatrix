import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { Section } from "@/components/ui/Section";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { legal } = getContent(locale);

  return (
    <Section containerSize="narrow">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{legal.termsTitle}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-600">
        {legal.termsBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
