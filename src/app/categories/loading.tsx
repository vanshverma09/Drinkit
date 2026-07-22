import React from "react";
import { Skeleton, CategoryCardSkeleton } from "@/components/ui/Skeleton";

export default function CategoriesLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background pb-20">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 h-16">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-32 h-6" />
        </div>
      </div>
      
      <div className="px-4 py-6">
        <div className="grid grid-cols-4 gap-x-2 gap-y-6 sm:grid-cols-6 lg:grid-cols-8">
          {[...Array(12)].map((_, i) => (
             <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
