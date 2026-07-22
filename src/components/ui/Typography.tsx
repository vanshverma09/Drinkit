import React from "react";
import { cn } from "@/lib/utils";

/* ── Heading ─────────────────────────────────────────────── */

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const headingSizes = {
  xs: "text-sm font-semibold",
  sm: "text-base font-semibold",
  md: "text-lg font-bold",
  lg: "text-xl font-bold",
  xl: "text-2xl font-bold",
  "2xl": "text-3xl font-bold",
  "3xl": "text-4xl font-bold tracking-tight",
};

function Heading({
  as: Tag = "h2",
  size = "lg",
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-text-primary",
        headingSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── Text ────────────────────────────────────────────────── */

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label";
  size?: "xs" | "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "tertiary" | "error" | "success" | "accent";
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3;
}

const textSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const textWeights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textColors = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
  error: "text-error",
  success: "text-success",
  accent: "text-primary",
};

function Text({
  as: Tag = "p",
  size = "md",
  weight = "normal",
  color = "primary",
  truncate = false,
  lineClamp,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        "font-body",
        textSizes[size],
        textWeights[weight],
        textColors[color],
        truncate && "truncate",
        lineClamp === 1 && "line-clamp-1",
        lineClamp === 2 && "line-clamp-2",
        lineClamp === 3 && "line-clamp-3",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── Price ────────────────────────────────────────────────── */

interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  mrp?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
}

function Price({
  amount,
  mrp,
  currency = "₹",
  size = "md",
  className,
  ...props
}: PriceProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <span
        className={cn(
          "font-number font-bold text-text-primary",
          sizeClasses[size]
        )}
      >
        {currency}{amount}
      </span>
      {mrp && mrp > amount && (
        <span className="font-number text-text-tertiary line-through text-xs">
          {currency}{mrp}
        </span>
      )}
    </span>
  );
}

export { Heading, Text, Price };
