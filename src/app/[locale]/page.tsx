import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { Problem } from "@/components/sections/Problem";
import { Calculator } from "@/components/sections/Calculator";
import { Transformation } from "@/components/sections/Transformation";
import { SystemSteps } from "@/components/sections/SystemSteps";
import { AiSection } from "@/components/sections/AiSection";
import { AutomationSection } from "@/components/sections/AutomationSection";
import { Channels } from "@/components/sections/Channels";
import { WhoForNotFor } from "@/components/sections/WhoForNotFor";
import { Proof } from "@/components/sections/Proof";
import { Guarantee } from "@/components/sections/Guarantee";
import { Offer } from "@/components/sections/Offer";
import { Mission } from "@/components/sections/Mission";
import { Faq } from "@/components/sections/Faq";
import { LeadForm } from "@/components/sections/LeadForm";
import { FinalCta } from "@/components/sections/FinalCta";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: content.siteName,
    url: `${siteUrl}/${locale}`,
    description: content.meta.description,
    areaServed: locale === "se" ? "SE" : "US",
    serviceType: "Marketing and sales automation for heat pump installation businesses",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <Hero content={content} />
      <Credibility content={content.credibility} />
      <Problem content={content.problem} />
      <Calculator content={content.calculator} locale={content.locale} />
      <Transformation content={content.transformation} />
      <SystemSteps content={content.system} />
      <AiSection content={content.ai} />
      <AutomationSection content={content.automation} />
      <Channels content={content.channels} />
      <WhoForNotFor whoFor={content.whoFor} whoNotFor={content.whoNotFor} />
      <Proof content={content.proof} />
      <Guarantee content={content.guarantee} />
      <Offer content={content.offer} ctaLabel={content.hero.primaryCta.label} />
      <Mission content={content.mission} />
      <Faq content={content.faq} />
      <LeadForm content={content.form} locale={content.locale} />
      <FinalCta content={content.finalCta} />
    </>
  );
}
