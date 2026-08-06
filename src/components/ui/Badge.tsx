"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "pink" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-brand-surface text-brand-muted border border-brand-border",
  purple: "bg-brand-purple/10 text-brand-purple-dark border border-brand-purple/30",
  pink: "bg-brand-pink/50 text-rose-700 border border-brand-pink",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  outline: "bg-transparent text-brand-text border border-brand-border",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full font-inter tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
