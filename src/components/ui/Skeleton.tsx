"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  rounded?: string;
}

export function Skeleton({ className, rounded = "rounded-2xl" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton",
        rounded,
        className
      )}
      aria-hidden="true"
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <Skeleton className="h-56 w-full" rounded="rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function GalleryItemSkeleton() {
  return <Skeleton className={cn("w-full h-64")} />;
}

export function TestimonialSkeleton() {
  return (
    <div className="p-6 rounded-3xl border border-brand-border dark:border-zinc-800 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden border border-brand-border dark:border-zinc-800">
      <Skeleton className="h-48 w-full" rounded="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
