import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "circle" | "text";
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className,
  variant = "rectangle",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        variant === "circle" && "rounded-full",
        variant === "rectangle" && "rounded-[--radius-md]",
        variant === "text" && "rounded-[--radius-xs] h-4",
        className
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ── Pre-built skeleton patterns ─────────────────────────── */

function ProductCardSkeleton() {
  return (
    <div className="rounded-[--radius-card] bg-surface p-3 space-y-3">
      <Skeleton className="w-full aspect-square rounded-[--radius-lg]" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2 h-3" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton variant="text" className="w-16 h-5" />
        <Skeleton className="w-8 h-8 rounded-[--radius-sm]" />
      </div>
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton variant="circle" className="w-16 h-16" />
      <Skeleton variant="text" className="w-12 h-3" />
    </div>
  );
}

function BannerSkeleton() {
  return <Skeleton className="w-full h-[140px] rounded-[--radius-card]" />;
}

export { Skeleton, ProductCardSkeleton, CategoryCardSkeleton, BannerSkeleton };
