"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: "auto" | "half" | "full";
  showHandle?: boolean;
  className?: string;
}

function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = "auto",
  showHandle = true,
  className,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  /* Touch-to-dismiss gesture */
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    if (diff > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    const diff = currentY.current - startY.current;
    if (diff > 100) {
      onClose();
    }
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    startY.current = 0;
    currentY.current = 0;
  };

  if (!isOpen) return null;

  const heightClasses = {
    auto: "max-h-[85vh]",
    half: "h-[50vh]",
    full: "h-[95vh]",
  };

  return (
    <div className="fixed inset-0 z-[--z-modal]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-surface rounded-t-[--radius-xl] shadow-2xl animate-slide-up flex flex-col",
          "transition-transform will-change-transform",
          heightClasses[height],
          className
        )}
      >
        {/* Handle */}
        {showHandle && (
          <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
            <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        )}

        {/* Title */}
        {title && (
          <div className="px-5 py-3 border-b border-border-light">
            <h2 className="text-lg font-heading font-bold text-text-primary">
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export { BottomSheet };
