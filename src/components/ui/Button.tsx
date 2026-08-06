"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "purple"
  | "danger"
  | "pink"
  | "success"
  | "warning";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-text border border-transparent shadow-sm",
  secondary:
    "bg-white text-brand-primary border border-brand-border hover:border-brand-purple hover:text-brand-purple shadow-sm",
  ghost:
    "bg-transparent text-brand-text hover:bg-brand-surface border border-transparent",
  outline:
    "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white",
  purple: "bg-brand-purple text-black hover:bg-brand-purple-dark border border-transparent shadow-luxury",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-transparent shadow-sm",
  pink: "bg-brand-pink text-black hover:bg-brand-pink-dark border border-transparent shadow-sm",
  success: "bg-emerald-600 text-white hover:bg-emerald-700 border border-transparent shadow-sm",
  warning: "bg-amber-500 text-black hover:bg-amber-600 border border-transparent shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-xl gap-1.5",
  md: "h-11 px-6 text-sm rounded-2xl gap-2",
  lg: "h-13 px-8 text-base rounded-2xl gap-2.5",
  xl: "h-15 px-10 text-lg rounded-3xl gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-inter font-medium tracking-wide",
          "transition-all duration-200 ease-out",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {children}
          </span>
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
