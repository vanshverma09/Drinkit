"use client";

import React, { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { CategoriesSlider } from "@/components/home/CategoriesSlider";
import { ProductRow } from "@/components/home/ProductRow";
import { BrandsSection } from "@/components/home/BrandsSection";
import { FeaturedStores } from "@/components/home/FeaturedStores";
import { FloatingCartButton } from "@/components/home/FloatingCartButton";
import { MembershipBanner } from "@/components/home/MembershipBanner";
import { getTrendingProducts, getFlashSaleProducts, getRecommendedProducts, getProductsByCategory, getPremiumBrandsProducts } from "@/data/dummy";
import Link from "next/link";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch for motion components

  return (
    <AppShell>
      <div className="pb-16 lg:pb-0">
        {/* Dynamic greeting based on time could go here, but Header handles address/search */}
        <div className="pt-2 px-4 pb-1">
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Good Morning, Vansh
          </h1>
          <p className="text-sm text-text-secondary">What would you like to drink today?</p>
        </div>

        {/* Premium Brands Banner */}
        <div className="px-4 mt-4 mb-2">
          <Link href="/premium-brands">
            <div className="relative w-full h-24 rounded-[20px] overflow-hidden bg-gradient-to-r from-amber-500/80 to-yellow-600/90 shadow-md flex items-center justify-between px-6 active:scale-[0.98] transition-transform">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <h3 className="text-white font-heading font-bold text-lg leading-tight shadow-sm">
                  Most Premium Brands<br/>in the World
                </h3>
                <p className="text-white/90 text-xs mt-1 font-medium">Explore the collection &rarr;</p>
              </div>
              <div className="relative z-10 text-4xl shadow-sm">✨</div>
            </div>
          </Link>
        </div>

        <PromoCarousel />
        
        <CategoriesSlider />
        
        <ProductRow 
          title="Flash Sale" 
          items={getFlashSaleProducts()} 
          showTimer={true} 
        />
        
        <BrandsSection />
        
        <ProductRow 
          title="Trending Drinks" 
          items={getTrendingProducts()} 
        />

        <MembershipBanner />
        
        <ProductRow 
          title="Cold Drinks" 
          items={getProductsByCategory("Cold Drinks")} 
        />
        
        <ProductRow 
          title="Fresh Juices" 
          items={getProductsByCategory("Juices")} 
        />
        
        <FeaturedStores />
        
        <ProductRow 
          title="Recommended For You" 
          items={getRecommendedProducts()} 
        />
        
        {/* End of content spacing */}
        <div className="h-20" />
      </div>

      <FloatingCartButton />
    </AppShell>
  );
}
