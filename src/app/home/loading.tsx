import React from "react";
import { BannerSkeleton, CategoryCardSkeleton, ProductCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-6 p-4 pt-6 pb-24">
      {/* Search Bar Skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="flex-1 h-12 rounded-[--radius-search]" />
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>

      {/* Hero Banner Skeleton */}
      <BannerSkeleton />

      {/* Categories Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="w-32 h-5 rounded-[--radius-sm]" />
          <Skeleton className="w-16 h-4 rounded-[--radius-sm]" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
             <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Trending Products Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="w-40 h-5 rounded-[--radius-sm]" />
          <Skeleton className="w-16 h-4 rounded-[--radius-sm]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
             <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
