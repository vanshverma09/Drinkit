"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import { ArrowLeft, ShoppingCart, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function PremiumBrandsPage() {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlistStore = useWishlistStore((state) => state.toggleWishlist);
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => setMounted(true), []);

  const product = {
    id: "prem-br",
    name: "Premlata Brandi",
    brand: "Premlata",
    price: 120000,
    mrp: 135000,
    volume: "750 ml",
    image: "/premlata-brandi.png",
    isVeg: true,
    category: "Brandy",
    tag: "Ultra Premium"
  };

  return (
    <AppShell>
      <div className="bg-background min-h-screen pb-[120px]">
        {/* HEADER */}
        <header className="sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-light py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-full transition-colors active:bg-gray-100 dark:active:bg-white/5">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-heading font-bold text-text-primary">Most Premium Brands</h1>
          </div>
        </header>

        {/* HERO SECTION */}
        <div className="p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-br from-amber-900 via-yellow-700 to-amber-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center mt-4 border border-amber-500/30"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="bg-black/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-amber-500/50 flex items-center gap-1 backdrop-blur-sm relative z-10">
              <Star size={12} fill="currentColor" /> Ultra Premium Collection
            </div>

            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full max-w-[320px] h-[400px] mb-8 z-10 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
            >
              <Image 
                src={product.image}
                alt="Premlata Brandi"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <h2 className="text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-2 relative z-10 drop-shadow-sm">
              {product.name}
            </h2>
            <p className="text-amber-100/80 font-medium mb-6 relative z-10">The Crown Jewel of Brandy</p>

            <div className="flex items-end gap-3 mb-8 relative z-10">
              <span className="text-3xl font-bold text-white">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-amber-200/50 line-through mb-1">₹{product.mrp.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 text-amber-300 bg-black/30 px-4 py-2 rounded-xl mb-4 relative z-10 border border-amber-500/30">
              <span className="text-xl">🌙</span>
              <span className="text-sm font-bold">Free Premium Night Delivery Included</span>
            </div>

            <div className="flex w-full max-w-sm gap-3 relative z-10">
              <button 
                onClick={() => toggleWishlistStore(product as any)}
                className={`flex-1 font-bold text-sm py-4 rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all border ${
                  mounted && wishlistItems.some(item => item.id === product.id)
                    ? "bg-red-500/20 border-red-500 text-red-500" 
                    : "bg-black/40 border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                }`}
              >
                <Heart size={20} className={mounted && wishlistItems.some(item => item.id === product.id) ? "fill-red-500" : ""} />
                {mounted && wishlistItems.some(item => item.id === product.id) ? "Saved" : "Favorite"}
              </button>

              <button 
                onClick={() => addToCart(product as any)}
                className="flex-[2.5] bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>
            </div>
          </motion.div>
          
          <div className="mt-8 px-4 space-y-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-3">About The Legend</h3>
              <p className="text-text-secondary leading-relaxed">
                Experience the pinnacle of luxury with Premlata Brandi. Crafted through generations of masterful distillation, 
                this exquisite spirit is reserved only for the most discerning connoisseurs. Sourced from the finest grapes 
                and aged in rare, century-old French oak casks, it embodies the perfect harmony of heritage and indulgence.
              </p>
            </div>

            <div className="bg-surface border border-border-light rounded-2xl p-5 shadow-sm">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Star size={16} /> Tasting Notes
              </h4>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex gap-3">
                  <span className="font-bold text-text-primary min-w-[60px]">Nose:</span>
                  <span>Intense aromas of dark chocolate, dried figs, and roasted almonds with a whisper of vintage leather.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-text-primary min-w-[60px]">Palate:</span>
                  <span>Velvety and incredibly rich. Layers of caramel, spiced honey, and toasted vanilla cascade effortlessly.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-text-primary min-w-[60px]">Finish:</span>
                  <span>Exceptionally long, warm, and satisfying with lingering notes of oak and gentle spice.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-between text-sm text-text-tertiary border-t border-border-light pt-6">
              <span>Origin: Exclusively Bottled</span>
              <span>Volume: 750 ML</span>
              <span>ABV: 42.5%</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
