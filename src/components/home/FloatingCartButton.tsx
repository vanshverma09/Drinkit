"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Price } from "@/components/ui/Typography";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";

export function FloatingCartButton() {
  const router = useRouter();
  const cartItemsCount = useCartStore((state) => state.totalItems());
  const cartTotalPrice = useCartStore((state) => state.totalPrice());
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  // Auto-hide when scrolling down, show when scrolling up
  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!mounted || cartItemsCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-[80px] lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-80 z-[--z-sticky]"
    >
      <div className="bg-primary text-white rounded-[--radius-xl] shadow-2xl p-3 flex items-center justify-between border border-primary-dark/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-[--radius-md] flex items-center justify-center">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <div>
            <div className="text-xs text-white/80 font-medium">{cartItemsCount} {cartItemsCount === 1 ? 'Item' : 'Items'}</div>
            <div className="font-bold flex items-center gap-1">
              <span>₹{cartTotalPrice}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => router.push('/cart')}
          className="flex items-center gap-1 bg-white text-primary px-4 py-2 rounded-[--radius-md] font-bold text-sm active:scale-95 transition-transform"
        >
          View Cart
        </button>
      </div>
    </motion.div>
  );
}
