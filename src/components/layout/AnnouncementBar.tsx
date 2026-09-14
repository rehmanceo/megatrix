export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div role="region" aria-label="Announcement" className="bg-ink-950 py-2 text-center text-xs font-medium text-ink-200 sm:text-sm">
      <p className="mx-auto max-w-6xl px-5">{text}</p>
    </div>
  );
}
