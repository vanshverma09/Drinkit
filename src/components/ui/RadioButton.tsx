"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  direction?: "horizontal" | "vertical";
  className?: string;
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  size = "md",
  direction = "vertical",
  className,
}: RadioGroupProps) {
  const sizeMap = {
    sm: { ring: "h-4 w-4", dot: "h-1.5 w-1.5", text: "text-sm" },
    md: { ring: "h-5 w-5", dot: "h-2 w-2", text: "text-sm" },
    lg: { ring: "h-6 w-6", dot: "h-2.5 w-2.5", text: "text-base" },
  };

  const s = sizeMap[size];

  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-4",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const inputId = `${name}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={inputId}
            className={cn(
              "group inline-flex items-start gap-3 cursor-pointer select-none",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="relative flex items-center justify-center pt-0.5">
              <input
                id={inputId}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={option.disabled}
                onChange={() => onChange?.(option.value)}
                className="peer sr-only"
              />
              <div
                className={cn(
                  s.ring,
                  "flex items-center justify-center rounded-full border-2 border-border transition-all duration-[--duration-fast]",
                  "peer-checked:border-primary",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-2",
                  "group-hover:border-primary/60"
                )}
              >
                <div
                  className={cn(
                    s.dot,
                    "rounded-full bg-primary transition-transform duration-[--duration-fast]",
                    isSelected ? "scale-100" : "scale-0"
                  )}
                />
              </div>
            </div>
            {(option.label || option.description) && (
              <div className="flex flex-col">
                <span
                  className={cn(
                    s.text,
                    "font-medium text-text-primary leading-tight"
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-text-tertiary mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
}

export { RadioGroup };
