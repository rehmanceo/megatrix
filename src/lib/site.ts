function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return "https://example.com";
  try {
    void new URL(raw);
    return raw;
  } catch {
    return "https://example.com";
  }
}

// Resolved once at module load. An unset, empty, or malformed
// NEXT_PUBLIC_SITE_URL (e.g. a blank string from a host's env panel, which
// `??` does not catch) safely falls back instead of crashing the build.
export const SITE_URL = resolveSiteUrl();
