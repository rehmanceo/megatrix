"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent, trackScheduleAppointment } from "@/lib/analytics";

const CALENDAR_SRC = "https://api.leadconnectorhq.com/widget/booking/ZYMZkgxkvAHNTQMAs2Pq";
const CALENDAR_IFRAME_ID = "ZYMZkgxkvAHNTQMAs2Pq_1789503987691";
const TRUSTED_MESSAGE_ORIGINS = ["https://api.leadconnectorhq.com", "https://link.msgsndr.com"];

export function GhlCalendarEmbed({
  heading,
  intro,
  popupTitle,
  popupBody,
  popupCloseLabel,
}: {
  heading: string;
  intro: string;
  popupTitle: string;
  popupBody: string;
  popupCloseLabel: string;
}) {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    trackEvent("calendar_opened");

    function handleMessage(event: MessageEvent) {
      if (!TRUSTED_MESSAGE_ORIGINS.some((origin) => event.origin.startsWith(origin))) return;

      const data = event.data as unknown;
      let signature: string;
      try {
        signature = typeof data === "string" ? data : JSON.stringify(data);
      } catch {
        return;
      }
      if (!signature) return;

      if (process.env.NODE_ENV === "development") {
        // GoHighLevel doesn't publish a stable postMessage contract for this
        // widget. If the popup below doesn't trigger on a real booking, open
        // devtools during a real test booking, read the logged payload here,
        // and tighten BOOKING_SIGNAL against its actual shape.
        console.debug("[ghl-calendar] message from", event.origin, data);
      }

      // The widget continuously posts resize pings shaped like {height: N} —
      // exclude those so they can't false-trigger the confirmation popup.
      const isResizePing =
        typeof data === "object" && data !== null && "height" in (data as Record<string, unknown>) && Object.keys(data as object).length <= 2;
      const BOOKING_SIGNAL = /appointment|booking|booked|confirmed|schedul/i;

      if (!isResizePing && BOOKING_SIGNAL.test(signature)) {
        setBooked(true);
        trackScheduleAppointment();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div id="calendar" className="scroll-mt-20">
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

      <h2 className="text-balance text-center font-display text-2xl font-semibold text-ink-950 sm:text-3xl">{heading}</h2>
      <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-600">{intro}</p>

      <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <iframe
          src={CALENDAR_SRC}
          id={CALENDAR_IFRAME_ID}
          title={heading}
          allow="payment"
          scrolling="no"
          style={{ width: "100%", border: "none", overflow: "hidden", minHeight: 720 }}
        />
      </div>

      {booked ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-confirmed-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cool-50 text-cool-600">
              <CheckCircle2 size={26} aria-hidden />
            </div>
            <h3 id="booking-confirmed-title" className="mt-4 font-display text-xl font-semibold text-ink-950">
              {popupTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{popupBody}</p>
            <Button className="mt-6 w-full" onClick={() => setBooked(false)}>
              {popupCloseLabel}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
