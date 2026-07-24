import React from "react";
import AppShell from "@/components/AppShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { CategoriesSlider } from "@/components/home/CategoriesSlider";
import { ProductRow } from "@/components/home/ProductRow";
import { BrandsSection } from "@/components/home/BrandsSection";
import { FeaturedStores } from "@/components/home/FeaturedStores";
import { FloatingCartButton } from "@/components/home/FloatingCartButton";
import { MembershipBanner } from "@/components/home/MembershipBanner";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // Fetch all products from our live Postgres database
  const products = await prisma.product.findMany();
  
  // Categorize them on the server just like dummy data used to
  const premiumProducts = products.filter(p => p.category === "Premium");
  const trendingProducts = products.filter(p => p.category === "Whiskey" || p.category === "Vodka").slice(0, 10);
  const flashSaleProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 5); // Just a mock flash sale
  const softDrinks = products.filter(p => p.category === "Soft Drinks");
  const coldDrinks = products.filter(p => p.category === "Beer" || p.category === "Vodka").slice(0, 6);
  const recommended = products.slice(0, 8);

  const userName = session?.user?.name ? session.user.name.split(" ")[0] : "Guest";

  return (
    <AppShell>
      <div className="pb-16 lg:pb-0">
        <div className="pt-2 px-4 pb-1">
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Good Morning, {userName}
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
        
        {softDrinks.length > 0 && (
          <ProductRow 
            title="Refreshing Soft Drinks" 
            items={softDrinks as any} 
          />
        )}
        
        <ProductRow 
            title="Flash Sale" 
            items={flashSaleProducts as any} 
            showTimer={true} 
        />
        
        <BrandsSection />
        
        <ProductRow 
          title="Trending Drinks" 
          items={trendingProducts as any} 
        />

        <MembershipBanner />
        
        <ProductRow 
          title="Cold Drinks" 
          items={coldDrinks as any} 
        />
        
        <FeaturedStores />
        
        <ProductRow 
          title="Recommended For You" 
          items={recommended as any} 
        />
        
        <div className="h-20" />
      </div>

      <FloatingCartButton />
    </AppShell>
  );
}
