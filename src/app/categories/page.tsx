"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List as ListIcon, ChevronDown } from "lucide-react";
import AppShell from "@/components/AppShell";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { categories, products } from "@/data/dummy";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* Mock subcategories based on active main category */
const getSubcategories = (mainCategory: string) => {
  if (mainCategory === "Cold Drinks") return ["Colas", "Clear Sodas", "Diet & Zero", "Mixers"];
  if (mainCategory === "Juices") return ["100% Fruit", "Mixed Fruit", "Lemonades", "Smoothies"];
  if (mainCategory === "Tea") return ["Green Tea", "Iced Tea", "Black Tea", "Herbal"];
  if (mainCategory === "Coffee") return ["Cold Coffee", "Instant", "Beans", "Filter"];
  return ["All Options", "Best Sellers", "New Arrivals", "Premium"];
};

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading categories...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || categories[0].name;
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSubTab, setActiveSubTab] = useState("All Options");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  
  // Infinite scroll simulation ref
  const bottomRef = useRef<HTMLDivElement>(null);

  // Filter products when tabs change
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay for category switch
    const timer = setTimeout(() => {
      let filtered = products.filter(p => p.category === activeTab || activeTab === "All");
      // Add more items to make infinite scroll visible (duplicating dummy data for demo)
      setDisplayedProducts([...filtered, ...filtered.map(p => ({...p, id: p.id + '_dup'}))]);
      setIsLoading(false);
      setActiveSubTab(getSubcategories(activeTab)[0]); // Reset sub tab
    }, 400);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Infinite scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayedProducts.length > 0) {
          setIsFetchingMore(true);
          // Simulate fetching more data
          setTimeout(() => {
            setDisplayedProducts(prev => [
              ...prev, 
              ...products.map(p => ({...p, id: p.id + '_more_' + Math.random()}))
            ]);
            setIsFetchingMore(false);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, displayedProducts.length]);

  return (
    <AppShell>
      <div className="bg-background min-h-screen pb-24 lg:pb-8 flex flex-col">
        
        {/* ── HEADER SECTION ── */}
        <div className="sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-light pt-2">
          
          {/* Top Row: Title & Actions */}
          <div className="flex items-center justify-between px-4 pb-3">
            <h1 className="text-xl font-heading font-bold text-text-primary">Categories</h1>
            <div className="flex items-center gap-2">
              <Link href="/search" className="p-2 text-text-secondary hover:text-primary bg-gray-50 dark:bg-white/5 rounded-full transition-colors">
                <Search size={18} />
              </Link>
              <div className="flex bg-gray-100 dark:bg-white/5 rounded-full p-1">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-full transition-colors ${viewMode === "grid" ? "bg-surface text-primary shadow-sm" : "text-text-tertiary"}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-full transition-colors ${viewMode === "list" ? "bg-surface text-primary shadow-sm" : "text-text-tertiary"}`}
                >
                  <ListIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Tabs (Horizontal Scroll) */}
          <div className="px-4 pb-0 flex overflow-x-auto hide-scrollbar gap-6 relative">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.name)}
                className={`pb-3 whitespace-nowrap text-sm font-semibold transition-colors relative ${
                  activeTab === cat.name ? "text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {cat.name}
                {activeTab === cat.name && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── SUBCATEGORIES ── */}
        <div className="bg-background pt-3 pb-2 px-4 flex overflow-x-auto hide-scrollbar gap-2 sticky top-[100px] z-10">
          {getSubcategories(activeTab).map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubTab(sub)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border shadow-sm ${
                activeSubTab === sub 
                  ? 'bg-text-primary border-text-primary text-surface' 
                  : 'bg-surface border-border-light text-text-secondary hover:text-text-primary'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* ── PRODUCT GRID / LIST ── */}
        <div className="flex-1 p-4">
          {isLoading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={viewMode === "list" ? "h-28" : ""}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              key={viewMode} // Forces re-animation when changing view modes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" : "flex flex-col gap-3"}
            >
              <AnimatePresence>
                {displayedProducts.map((product, idx) => (
                  <ProductCard key={`${product.id}-${idx}`} product={product} viewMode={viewMode} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Infinite Scroll Loader */}
          <div ref={bottomRef} className="py-6 flex justify-center">
            {isFetchingMore && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
