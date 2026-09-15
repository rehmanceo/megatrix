import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, getContent, isLocale } from "@/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { StickyCta } from "@/components/layout/StickyCta";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  const siteUrl = SITE_URL;

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        "en-US": `${siteUrl}/us`,
        "sv-SE": `${siteUrl}/se`,
        "x-default": `${siteUrl}/us`,
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: `${siteUrl}/${locale}`,
      siteName: content.siteName,
      locale: content.htmlLang.replace("-", "_"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <SetHtmlLang lang={content.htmlLang} />
      <AnnouncementBar text={content.announcement} />
      <Nav content={content} />
      <main className="flex-1">{children}</main>
      <Footer content={content} />
      <StickyCta label={content.sticky.ctaLabel} />
    </>
  );
}
