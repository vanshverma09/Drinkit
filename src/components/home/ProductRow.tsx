"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Price } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/Badge";
import { products } from "@/data/dummy";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";

interface ProductRowProps {
  title: string;
  items: typeof products;
  showTimer?: boolean;
}

export function ProductRow({ title, items, showTimer }: ProductRowProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-heading font-bold text-text-primary">{title}</h2>
          {showTimer && (
            <div className="flex items-center gap-1 bg-error-50 dark:bg-error/10 text-error px-2 py-0.5 rounded-[--radius-sm] text-xs font-bold">
              <span>12</span>:<span>45</span>:<span>00</span>
            </div>
          )}
        </div>
        <button className="text-primary text-sm font-semibold">See all</button>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
        {items.map((product, idx) => (
          <motion.div
            key={product.id}
            onClick={() => router.push(`/product/${product.id}`)}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="snap-start shrink-0 w-[150px] relative bg-surface border border-border-light rounded-[--radius-lg] p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer"
          >
            {/* Tags */}
            <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 items-start">
              {product.discount && (
                <div className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-[--radius-sm] rounded-tl-[--radius-lg] shadow-sm">
                  {product.discount}
                </div>
              )}
              {product.tag && (
                <div className="bg-secondary text-secondary-900 text-[9px] font-bold px-1.5 py-0.5 rounded-r-[--radius-sm] shadow-sm ml-[-1px]">
                  {product.tag}
                </div>
              )}
            </div>

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
            <div className="mt-auto flex flex-col flex-1">
              <div className="text-[10px] text-text-tertiary font-medium mb-0.5">{product.brand}</div>
              <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug mb-1">
                {product.name}
              </h3>
              <div className="text-xs text-text-secondary mb-2">{product.volume}</div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <Price amount={product.price} mrp={product.mrp} size="sm" />
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-8 h-8 rounded-[--radius-sm] bg-primary-50 dark:bg-primary/20 text-primary flex items-center justify-center border border-primary/20 hover:bg-primary hover:text-white transition-colors shadow-sm"
                  aria-label="Add to cart"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
