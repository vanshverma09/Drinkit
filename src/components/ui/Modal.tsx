"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showClose?: boolean;
  className?: string;
}

function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  closeOnOverlay = true,
  closeOnEscape = true,
  showClose = true,
  className,
}: ModalProps) {
  /* Escape key handler */
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) onClose();
    },
    [closeOnEscape, onClose]
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

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-desc" : undefined}
      className="fixed inset-0 z-[--z-modal] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className={cn(
          "relative w-full bg-surface rounded-[--radius-xl] shadow-2xl animate-scale-in",
          "flex flex-col max-h-[90vh]",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between px-6 pt-6 pb-2">
            <div className="flex-1">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-heading font-bold text-text-primary"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-desc"
                  className="text-sm text-text-secondary mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="shrink-0 ml-4 p-1.5 rounded-[--radius-sm] text-text-tertiary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3 border-t border-border-light">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export { Modal };
