"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeMap[size],
            "transition-colors",
            i < Math.floor(rating)
              ? "fill-brand-purple text-brand-purple"
              : i < rating
              ? "fill-brand-purple/50 text-brand-purple"
              : "fill-transparent text-brand-border dark:text-zinc-600"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-brand-text dark:text-white">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
