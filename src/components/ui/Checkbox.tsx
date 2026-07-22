"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  checkboxSize?: "sm" | "md" | "lg";
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      checkboxSize = "md",
      indeterminate = false,
      checked,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || innerRef;

    React.useEffect(() => {
      if (resolvedRef && "current" in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const sizeMap = {
      sm: { box: "h-4 w-4", icon: 10, text: "text-sm" },
      md: { box: "h-5 w-5", icon: 13, text: "text-sm" },
      lg: { box: "h-6 w-6", icon: 16, text: "text-base" },
    };

    const s = sizeMap[checkboxSize];
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group inline-flex items-start gap-3 cursor-pointer select-none",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={resolvedRef}
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              s.box,
              "flex items-center justify-center rounded-[--radius-xs] border-2 border-border transition-all duration-[--duration-fast]",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-indeterminate:bg-primary peer-indeterminate:border-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-2",
              "group-hover:border-primary/60"
            )}
          >
            {checked && !indeterminate && (
              <Check size={s.icon} className="text-white" strokeWidth={3} />
            )}
            {indeterminate && (
              <Minus size={s.icon} className="text-white" strokeWidth={3} />
            )}
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className={cn(s.text, "font-medium text-text-primary leading-tight")}>
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-text-tertiary mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
