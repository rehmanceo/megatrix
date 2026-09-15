"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="focus-ring fixed bottom-24 right-4 z-40 flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full bg-ember-600 text-white shadow-lg transition-colors hover:bg-ember-700 lg:bottom-6 lg:right-6"
    >
      <ChevronUp size={18} aria-hidden />
      <span className="text-[10px] font-semibold uppercase tracking-wide">Top</span>
    </button>
  );
}
