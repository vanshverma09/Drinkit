"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  size = "md",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  const sizeClasses = {
    sm: "h-9 text-sm px-3",
    md: "h-12 text-sm px-4",
    lg: "h-14 text-base px-4",
  };

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          const opt = options[highlightedIndex];
          if (!opt.disabled) {
            onChange?.(opt.value);
            setIsOpen(false);
          }
        } else {
          setIsOpen(true);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex w-full items-center justify-between bg-surface border border-border rounded-[--radius-md]",
            "transition-all duration-[--duration-fast]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses[size],
            isOpen && "ring-2 ring-primary/30 border-primary",
            error && "border-error focus-visible:ring-error/30"
          )}
        >
          <span
            className={cn(
              "truncate",
              selected ? "text-text-primary" : "text-text-tertiary"
            )}
          >
            {selected ? (
              <span className="flex items-center gap-2">
                {selected.icon}
                {selected.label}
              </span>
            ) : (
              placeholder
            )}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              "shrink-0 text-text-tertiary transition-transform duration-[--duration-fast]",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            role="listbox"
            className={cn(
              "absolute z-[--z-dropdown] mt-1.5 w-full bg-surface border border-border rounded-[--radius-md] shadow-lg",
              "max-h-60 overflow-y-auto py-1",
              "animate-scale-in origin-top"
            )}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange?.(option.value);
                      setIsOpen(false);
                    }
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors",
                    isHighlighted && "bg-primary-50 dark:bg-white/5",
                    isSelected && "text-primary font-medium",
                    !isSelected && "text-text-primary",
                    option.disabled && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    {option.icon}
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check size={16} className="shrink-0 text-primary" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {error && (
        <p className="text-xs text-error font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Dropdown };
