"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "filled" | "outlined" | "soft";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "neutral";
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
}

const colorMap = {
  primary: {
    filled: "bg-primary text-white",
    outlined: "border border-primary text-primary",
    soft: "bg-primary-50 text-primary-700 dark:bg-primary/15 dark:text-primary-light",
  },
  secondary: {
    filled: "bg-secondary text-text-primary",
    outlined: "border border-secondary text-secondary-dark",
    soft: "bg-secondary-light/50 text-amber-700 dark:bg-secondary/15 dark:text-secondary",
  },
  success: {
    filled: "bg-success text-white",
    outlined: "border border-success text-success",
    soft: "bg-success-light text-green-700 dark:bg-success/15 dark:text-success",
  },
  error: {
    filled: "bg-error text-white",
    outlined: "border border-error text-error",
    soft: "bg-error-light text-red-700 dark:bg-error/15 dark:text-error",
  },
  warning: {
    filled: "bg-warning text-white",
    outlined: "border border-warning text-warning",
    soft: "bg-warning-light text-amber-700 dark:bg-warning/15 dark:text-warning",
  },
  info: {
    filled: "bg-info text-white",
    outlined: "border border-info text-info",
    soft: "bg-info-light text-blue-700 dark:bg-info/15 dark:text-info",
  },
  neutral: {
    filled: "bg-gray-500 text-white dark:bg-gray-600",
    outlined: "border border-border text-text-secondary",
    soft: "bg-gray-100 text-text-secondary dark:bg-white/10",
  },
};

function Tag({
  className,
  variant = "soft",
  color = "primary",
  size = "md",
  removable = false,
  onRemove,
  icon,
  children,
  ...props
}: TagProps) {
  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-[--radius-search] select-none",
        sizeClasses[size],
        colorMap[color][variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Remove tag"
        >
          <X size={size === "sm" ? 10 : 12} />
        </button>
      )}
    </span>
  );
}

export { Tag };
