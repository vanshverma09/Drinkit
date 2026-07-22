import React from "react";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background pb-20">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 h-16">
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <Skeleton className="flex-1 h-12 rounded-[--radius-search]" />
        </div>
      </div>
      
      <div className="px-4 mt-6 space-y-4">
        <Skeleton className="w-48 h-6" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
             <Skeleton key={i} className="w-20 h-8 rounded-full" />
          ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <Skeleton className="w-32 h-6 mb-4" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[...Array(6)].map((_, i) => (
             <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
