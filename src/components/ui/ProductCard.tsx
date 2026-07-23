"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";
import { Price } from "@/components/ui/Typography";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";

export interface ProductData {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  volume: string;
  image: string;
  isVeg: boolean;
  tag?: string;
  discount?: string;
  category: string;
}

interface ProductCardProps {
  product: ProductData;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const toggleWishlistStore = useWishlistStore((state) => state.toggleWishlist);
  const wishlistItems = useWishlistStore((state) => state.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => setMounted(true), []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product as any);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistStore(product as any);
  };
  
  const isHeartActive = mounted ? isWishlisted : false;

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 p-3 bg-surface border border-border-light rounded-[--radius-lg] shadow-sm relative overflow-hidden"
      >
        {/* Badges */}
        <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 items-start">
          {product.discount && (
            <div className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-[--radius-sm] shadow-sm">
              {product.discount}
            </div>
          )}
        </div>

        {/* Image */}
        <div className="relative w-24 h-24 shrink-0 rounded-[--radius-md] overflow-hidden bg-gray-50 dark:bg-white/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 py-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] text-text-tertiary font-medium mb-0.5">{product.brand}</div>
              <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </div>
            <button 
              onClick={toggleWishlist}
              className="p-1 -mr-1 -mt-1 text-text-tertiary hover:text-error transition-colors z-20 relative"
            >
              <Heart size={18} className={isHeartActive ? "fill-error text-error" : ""} />
            </button>
          </div>
          
          <div className="text-xs text-text-secondary mt-1">{product.volume}</div>
          
          <div className="flex items-center justify-between mt-auto pt-2">
            <Price amount={product.price} mrp={product.mrp} size="sm" />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className={`h-8 px-4 rounded-[--radius-sm] text-xs font-bold transition-colors shadow-sm flex items-center justify-center ${
                isAdding 
                  ? 'bg-success text-white border border-success'
                  : 'bg-primary-50 dark:bg-primary/20 text-primary border border-primary/20 hover:bg-primary hover:text-white'
              }`}
            >
              {isAdding ? "Added" : "Add"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid Mode
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border-light rounded-[--radius-lg] p-3 shadow-sm flex flex-col relative overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 items-start">
        {product.discount && (
          <div className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-[--radius-sm] shadow-sm">
            {product.discount}
          </div>
        )}
        {product.tag && (
          <div className="bg-secondary text-secondary-900 text-[9px] font-bold px-1.5 py-0.5 rounded-r-[--radius-sm] shadow-sm ml-[-1px]">
            {product.tag}
          </div>
        )}
      </div>

      {/* Wishlist */}
      <button 
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-20 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-text-tertiary hover:text-error transition-colors shadow-sm"
      >
        <Heart size={16} className={isHeartActive ? "fill-error text-error" : ""} />
      </button>

      {/* Image */}
      <div className="relative w-full aspect-square mb-2 rounded-[--radius-md] overflow-hidden bg-gray-50 dark:bg-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 150px, 200px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <div className="text-[10px] text-text-tertiary font-medium mb-0.5">{product.brand}</div>
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug mb-1">
          {product.name}
        </h3>
        <div className="text-xs text-text-secondary mb-2">{product.volume}</div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <Price amount={product.price} mrp={product.mrp} size="sm" />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`w-8 h-8 rounded-[--radius-sm] flex items-center justify-center transition-colors shadow-sm ${
              isAdding 
                ? 'bg-success text-white border border-success'
                : 'bg-primary-50 dark:bg-primary/20 text-primary border border-primary/20 hover:bg-primary hover:text-white'
            }`}
          >
            <Plus size={18} strokeWidth={isAdding ? 3 : 2.5} className={isAdding ? "rotate-45 transition-transform" : "transition-transform"} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
