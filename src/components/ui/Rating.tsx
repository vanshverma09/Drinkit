"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  onChange?: (value: number) => void;
  className?: string;
}

function Rating({
  value,
  max = 5,
  size = "md",
  readOnly = true,
  showValue = false,
  showCount = false,
  count = 0,
  onChange,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState(0);

  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const starSize = sizeMap[size];

  const handleClick = (star: number) => {
    if (!readOnly && onChange) {
      onChange(star);
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div
        className="flex items-center gap-0.5"
        role={readOnly ? "img" : "radiogroup"}
        aria-label={`Rating: ${value} out of ${max}`}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isActive = starValue <= (hoverValue || value);
          const isHalf =
            !hoverValue &&
            starValue > value &&
            starValue - 0.5 <= value;

          return (
            <button
              key={i}
              type="button"
              disabled={readOnly}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !readOnly && setHoverValue(starValue)}
              onMouseLeave={() => !readOnly && setHoverValue(0)}
              className={cn(
                "transition-colors duration-[--duration-fast]",
                !readOnly && "cursor-pointer hover:scale-110 active:scale-95",
                readOnly && "cursor-default"
              )}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
              tabIndex={readOnly ? -1 : 0}
            >
              <Star
                size={starSize}
                className={cn(
                  isActive || isHalf
                    ? "fill-warning text-warning"
                    : "fill-transparent text-gray-300 dark:text-gray-600"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="font-number font-semibold text-text-primary text-sm ml-1">
          {value.toFixed(1)}
        </span>
      )}
      {showCount && count > 0 && (
        <span className="text-text-tertiary text-xs">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export { Rating };
