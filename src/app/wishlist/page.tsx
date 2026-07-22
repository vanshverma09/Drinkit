"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Heart, HeartOff, ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/dummy";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";

export default function WishlistPage() {
  const router = useRouter();
  const wishlist = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const [showShareToast, setShowShareToast] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => setMounted(true), []);

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };
  
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-8">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex flex-col">
              <h1 className="font-heading font-semibold text-gray-900 dark:text-gray-100 text-lg">
                My Wishlist
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {wishlist.length} items
              </p>
            </div>
          </div>
          <button 
            onClick={handleShare}
            className="p-2 text-gray-500 hover:text-primary transition-colors"
            title="Share Wishlist"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Share Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50"
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 py-6">
        {/* ── Wishlist Grid ── */}
        <AnimatePresence mode="popLayout">
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1], 
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6"
              >
                <HeartOff className="w-10 h-10 text-red-500" />
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-[250px]">
                Save your favorite drinks here so you can easily find and order them later.
              </p>
              <button 
                onClick={() => router.push("/home")}
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
              >
                Explore Drinks
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            >
              <AnimatePresence>
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="relative group"
                  >
                    <ProductCard 
                      product={product} 
                      viewMode="grid"
                    />
                    
                    {/* Overlay buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-2 lg:flex pointer-events-none">
                       <button 
                         onClick={() => {
                           addToCart(product as any);
                           removeFromWishlist(product.id);
                         }}
                         className="bg-primary text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg shadow-primary/40"
                       >
                         <ShoppingCart className="w-4 h-4" />
                         Move to Cart
                       </button>
                       <button 
                         onClick={() => removeFromWishlist(product.id)}
                         className="bg-white text-red-500 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg"
                       >
                         <HeartOff className="w-4 h-4" />
                         Remove
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Recommendations Section ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {products.slice(5, 9).map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                viewMode="grid"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
