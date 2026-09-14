import type { MetadataRoute } from "next";
import { LOCALES } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const paths = ["", "/privacy", "/terms"];

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.3,
    })),
  );
}
