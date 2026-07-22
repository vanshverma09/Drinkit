"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "transition-all select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-primary",
        secondary:
          "bg-secondary text-text-primary hover:bg-secondary-dark shadow-sm",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary-50",
        ghost:
          "text-text-secondary hover:bg-gray-100 hover:text-text-primary dark:hover:bg-white/10",
        danger:
          "bg-error text-white hover:bg-error/90 shadow-sm",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto",
        icon:
          "text-text-secondary hover:text-primary hover:bg-primary-50 dark:hover:bg-white/10",
      },
      size: {
        xs: "h-8 px-3 text-xs rounded-[--radius-sm]",
        sm: "h-9 px-3.5 text-sm rounded-[--radius-btn]",
        default: "h-11 px-5 text-sm rounded-[--radius-btn]",
        lg: "h-12 px-6 text-base rounded-[--radius-btn]",
        xl: "h-14 px-8 text-base rounded-[--radius-btn]",
        icon_sm: "h-9 w-9 rounded-[--radius-sm]",
        icon_md: "h-11 w-11 rounded-[--radius-md]",
        icon_lg: "h-12 w-12 rounded-[--radius-lg]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
