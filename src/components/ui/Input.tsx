"use client";

import React from "react";
import { Search, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSearch?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      isSearch,
      inputSize = "md",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const sizeClasses = {
      sm: "h-10 text-sm",
      md: "h-12 text-sm",
      lg: "h-14 text-base",
    };

    const radiusClass = isSearch
      ? "rounded-[--radius-search]"
      : "rounded-[--radius-md]";

    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {isSearch && (
            <div className="absolute left-4 text-text-tertiary pointer-events-none">
              <Search size={18} />
            </div>
          )}
          {!isSearch && leftIcon && (
            <div className="absolute left-3.5 text-text-tertiary pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              "flex w-full bg-surface border border-border px-4 text-text-primary font-body",
              "transition-all duration-[--duration-fast]",
              "placeholder:text-text-tertiary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              "dark:bg-surface dark:border-border",
              sizeClasses[inputSize],
              radiusClass,
              (isSearch || leftIcon) && "pl-11",
              (isPassword || rightIcon) && "pr-11",
              error &&
                "border-error focus-visible:ring-error/30 focus-visible:border-error",
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-text-tertiary hover:text-text-secondary transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {!isPassword && rightIcon && (
            <div className="absolute right-3.5 text-text-tertiary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-error font-medium mt-0.5"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-text-tertiary mt-0.5">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
