"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Trash2, Plus, Minus, Tag, 
  ChevronRight, Sparkles, MapPin, ChevronLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { products } from "@/data/dummy";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const router = useRouter();
  const { items: cartItems, updateQuantity, removeFromCart: removeItem } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  useEffect(() => setIsClient(true), []);

  // Calculations
  const itemTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemMRP = cartItems.reduce((acc, item) => acc + (item.mrp * item.quantity), 0);

  useEffect(() => {
    if ((coupon === "PREM1200" || coupon === "LATA1200" || coupon === "PREMLATA2400") && itemTotal < 10000) {
      setCoupon(null);
      setCouponError("Order must be ₹10,000+ for this code");
    }
  }, [itemTotal, coupon]);
  const discount = itemMRP - itemTotal;
  const deliveryFee = itemTotal > 500 ? 0 : 40;
  const handlingFee = 15;
  const couponDiscount = coupon === "DRINKIT50" ? 50 : (coupon === "PREMLATA2400" ? 2400 : (coupon === "PREM1200" || coupon === "LATA1200" ? 1200 : 0));
  const grandTotal = Math.max(0, itemTotal + deliveryFee + handlingFee - couponDiscount);

  if (!isClient) return null;

  return (
    <AppShell>
      <div className="bg-background min-h-screen pb-[120px]">
        
        {/* ── HEADER ── */}
        <header className="sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-light py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-full transition-colors active:bg-gray-100 dark:active:bg-white/5">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-heading font-bold text-text-primary">Your Cart</h1>
          </div>
          <div className="text-sm font-semibold text-text-secondary">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </div>
        </header>

        {cartItems.length === 0 ? (
          /* ── EMPTY CART ── */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex flex-col items-center justify-center h-[60vh] px-6 text-center"
          >
            <div className="w-48 h-48 mb-6 relative">
              {/* Animated Empty State Illustration (CSS based) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center"
              >
                <span className="text-6xl">🛒</span>
              </motion.div>
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">Your cart is empty</h2>
            <p className="text-text-secondary mb-8">Looks like you haven't added any drinks yet.</p>
            <Link 
              href="/home" 
              className="w-full max-w-[200px] h-12 bg-primary text-white rounded-[--radius-lg] font-bold text-sm flex items-center justify-center active:scale-[0.98] transition-transform shadow-primary"
            >
              Start Browsing
            </Link>
          </motion.div>
        ) : (
          /* ── CART CONTENT ── */
          <div className="p-4 space-y-6">
            
            {/* Delivery Address Block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="bg-surface border border-border-light rounded-[--radius-lg] p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 dark:bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-primary">Delivery in 15 mins</h3>
                  <p className="text-xs text-text-secondary line-clamp-1">Home - 45B, Sector 3, Cyber City</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-text-tertiary" />
            </motion.div>

            {/* Cart Items */}
            <div className="space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Background Delete Action (revealed on swipe) */}
                    <div className="absolute inset-0 bg-error rounded-[--radius-lg] flex items-center justify-end px-6">
                      <Trash2 className="text-white" size={24} />
                    </div>

                    {/* Draggable Item Card */}
                    <motion.div 
                      drag="x"
                      dragConstraints={{ left: -80, right: 0 }}
                      dragElastic={0.1}
                      onDragEnd={(e, info) => {
                        if (info.offset.x < -60) removeItem(item.id);
                      }}
                      className="relative bg-surface border border-border-light rounded-[--radius-lg] p-3 flex gap-4 shadow-sm z-10 touch-pan-y"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 shrink-0 bg-gray-50 dark:bg-white/5 rounded-[--radius-md] overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex flex-col flex-1 py-0.5">
                        <h3 className="text-sm font-semibold text-text-primary line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-text-secondary mt-0.5">{item.volume}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-end gap-1.5">
                            <span className="font-bold text-text-primary">₹{item.price}</span>
                            {item.mrp > item.price && (
                              <span className="text-xs text-text-tertiary line-through mb-[2px]">₹{item.mrp}</span>
                            )}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-primary-50 dark:bg-primary/20 rounded-md border border-primary/20 text-primary h-8">
                            <button 
                              onClick={() => {
                                if (item.quantity === 1) removeItem(item.id);
                                else updateQuantity(item.id, item.quantity - 1);
                              }}
                              className="w-8 h-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                            </button>
                            <motion.span 
                              key={item.quantity}
                              initial={{ scale: 1.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-6 text-center text-sm font-bold"
                            >
                              {item.quantity}
                            </motion.span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Coupons */}
            <motion.div layout className="w-full bg-surface border border-border-light border-dashed rounded-[--radius-lg] p-4 shadow-sm">
              {!coupon ? (
                <div>
                  <div className="flex items-center gap-2">
                    <Tag size={20} className="text-primary shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm font-bold text-text-primary uppercase placeholder:normal-case placeholder:font-normal"
                    />
                    <button 
                      onClick={() => {
                        const code = couponInput.trim().toUpperCase();
                        if (code === "DRINKIT50") {
                          setCoupon(code);
                          setCouponError("");
                        } else if (code === "PREM1200" || code === "LATA1200" || code === "PREMLATA2400") {
                          if (itemTotal >= 10000) {
                            setCoupon(code);
                            setCouponError("");
                          } else {
                            setCouponError(`Add ₹${10000 - itemTotal} more to use this code`);
                          }
                        } else {
                          setCouponError("Invalid coupon code");
                        }
                      }}
                      className="text-primary font-bold text-sm px-3 py-1 bg-primary-50 dark:bg-primary/20 rounded-md"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-error text-xs mt-2 ml-7">{couponError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-success">
                    <Tag size={20} />
                    <span className="font-bold text-sm">Coupon Applied ({coupon})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-success">-₹{couponDiscount}</span>
                    <button onClick={() => { setCoupon(null); setCouponInput(""); }} className="text-text-tertiary hover:text-error transition-colors p-1 rounded-full">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Bill Summary */}
            <motion.div layout className="bg-surface border border-border-light rounded-[--radius-lg] p-4 shadow-sm">
              <h3 className="font-heading font-bold text-base text-text-primary mb-4">Bill Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Item Total</span>
                  <span className="font-medium text-text-primary">
                    <span className="line-through text-xs mr-1">₹{itemMRP}</span>
                    ₹{itemTotal}
                  </span>
                </div>
                
                <div className="flex justify-between text-text-secondary">
                  <span>Handling Fee (incl. GST)</span>
                  <span className="font-medium text-text-primary">₹{handlingFee}</span>
                </div>
                
                <div className="flex justify-between text-text-secondary">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-text-primary">
                    {deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-success">
                    <span>Coupon Discount</span>
                    <span className="font-medium">-₹{couponDiscount}</span>
                  </div>
                )}
                
                <div className="h-px bg-border-light my-3" />
                
                <div className="flex justify-between font-bold text-base text-text-primary">
                  <span>Grand Total</span>
                  <motion.span 
                    key={grandTotal}
                    initial={{ scale: 1.2, color: 'var(--color-primary)' }}
                    animate={{ scale: 1, color: 'inherit' }}
                  >
                    ₹{grandTotal}
                  </motion.span>
                </div>
              </div>
              
              {discount > 0 && (
                <div className="mt-4 bg-success-50 dark:bg-success/10 text-success p-3 rounded-[--radius-md] flex items-center gap-2 text-xs font-bold border border-success/20">
                  <Sparkles size={16} />
                  You are saving ₹{discount + couponDiscount} on this order!
                </div>
              )}
            </motion.div>

            {/* Upsell / Recommendations */}
            <div className="pt-2 pb-6">
              <h3 className="font-heading font-bold text-base text-text-primary mb-4">Before you checkout</h3>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {products.slice(4, 7).map(item => (
                  <div key={item.id} className="w-[120px] shrink-0 bg-surface border border-border-light rounded-[--radius-md] p-2 flex flex-col shadow-sm">
                    <div className="relative w-full aspect-square bg-gray-50 dark:bg-white/5 rounded-sm mb-2">
                      <Image src={item.image} alt={item.name} fill className="object-cover rounded-sm" />
                    </div>
                    <h4 className="text-xs font-semibold text-text-primary line-clamp-1 mb-1">{item.name}</h4>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-text-primary">₹{item.price}</span>
                      <button 
                        onClick={() => useCartStore.getState().addToCart(item)}
                        className="text-primary bg-primary-50 dark:bg-primary/20 p-1 rounded-sm"
                      >
                        <Plus size={14}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ── STICKY CHECKOUT BAR ── */}
      {cartItems.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-surface border-t border-border-light p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-safe"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-text-secondary">Total to pay</span>
              <motion.span 
                key={grandTotal}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-lg font-bold text-text-primary"
              >
                ₹{grandTotal}
              </motion.span>
            </div>
            
            <button 
              onClick={() => router.push("/checkout")}
              className="flex-1 h-12 bg-primary text-white rounded-[--radius-lg] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-primary"
            >
              Checkout
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AppShell>
  );
}
