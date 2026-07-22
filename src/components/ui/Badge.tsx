import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white",
        secondary:
          "bg-secondary text-text-primary",
        success:
          "bg-success-light text-green-700 dark:bg-success/20 dark:text-success",
        error:
          "bg-error-light text-red-700 dark:bg-error/20 dark:text-error",
        warning:
          "bg-warning-light text-amber-700 dark:bg-warning/20 dark:text-warning",
        info:
          "bg-info-light text-blue-700 dark:bg-info/20 dark:text-info",
        outline:
          "border border-border text-text-secondary bg-transparent",
        ghost:
          "bg-gray-100 text-text-secondary dark:bg-white/10 dark:text-text-secondary",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5 rounded-[--radius-xs]",
        default: "text-xs px-2 py-0.5 rounded-[--radius-sm]",
        lg: "text-sm px-3 py-1 rounded-[--radius-sm]",
      },
      dot: {
        true: "pl-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  dot,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...props}
    >
      {dot && (
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
