import React from "react";
import { cn } from "@/lib/utils";

/* ── Card Container ──────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outlined" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "elevated",
      padding = "md",
      hoverable = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      elevated: "bg-surface shadow-soft dark:shadow-md",
      outlined: "bg-surface border border-border",
      flat: "bg-surface",
    };

    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[--radius-card]",
          variantClasses[variant],
          paddingClasses[padding],
          hoverable &&
            "cursor-pointer transition-all duration-[--duration-normal] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

/* ── Card Header ─────────────────────────────────────────── */

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between mb-3", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

/* ── Card Body ───────────────────────────────────────────── */

const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props}>
    {children}
  </div>
));
CardBody.displayName = "CardBody";

/* ── Card Footer ─────────────────────────────────────────── */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between mt-3 pt-3 border-t border-border-light",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardBody, CardFooter };
