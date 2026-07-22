"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  width?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showClose?: boolean;
  overlay?: boolean;
  className?: string;
}

function Drawer({
  isOpen,
  onClose,
  title,
  side = "right",
  width = "320px",
  children,
  footer,
  showClose = true,
  overlay = true,
  className,
}: DrawerProps) {
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

  if (!isOpen) return null;

  const slideClass =
    side === "right" ? "animate-slide-in-right right-0" : "animate-slide-in-right left-0 [animation-direction:reverse] translate-x-0";

  return (
    <div className="fixed inset-0 z-[--z-modal]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      {overlay && (
        <div
          className="absolute inset-0 bg-overlay animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "absolute top-0 bottom-0 bg-surface shadow-2xl flex flex-col",
          side === "right" ? "right-0 animate-slide-in-right" : "left-0",
          className
        )}
        style={{ width }}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
            {title && (
              <h2 className="text-lg font-heading font-bold text-text-primary">
                {title}
              </h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-[--radius-sm] text-text-tertiary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 border-t border-border-light">{footer}</div>
        )}
      </div>
    </div>
  );
}

export { Drawer };
