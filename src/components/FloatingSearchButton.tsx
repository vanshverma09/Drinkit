"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating search button (FAB) — visible on mobile when the user
 * scrolls past the header search bar.
 */
export default function FloatingSearchButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => document.getElementById("global-search")?.focus(), 400);
      }}
      className={cn(
        "fixed bottom-[140px] right-4 z-[--z-fixed] lg:hidden",
        "h-12 w-12 rounded-full bg-primary text-white shadow-primary",
        "flex items-center justify-center",
        "hover:bg-primary-dark active:scale-95",
        "transition-all duration-[--duration-normal]",
        "animate-bounce-in"
      )}
      aria-label="Search"
    >
      <Search size={22} />
    </button>
  );
}
