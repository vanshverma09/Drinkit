"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, MapPin, Clock, CreditCard, ChevronRight, ChevronLeft,
  Gift, CheckCircle2, ShieldCheck, Wallet, Smartphone, Banknote
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useAddressStore } from "@/store/address";
import { placeOrder } from "./actions";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";

export default function CheckoutPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  const { items, totalPrice, clearCart } = useCartStore();
  const { selectedAddress } = useAddressStore();
  
  const itemTotal = totalPrice();
  const handlingFee = 15;
  const grandTotal = itemTotal + handlingFee;

  // Checkout States
  const [step, setStep] = useState<"review" | "processing" | "success">("review");
  
  // Form States
  const [deliveryType, setDeliveryType] = useState<"instant" | "scheduled">("instant");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const donationMedia = [
    { type: "image", src: "/donation/beekh.jpg", alt: "Support children" },
    { type: "video", src: "/donation/video.mp4", alt: "Donation Video" },
    { type: "image", src: "/donation/fun.jpg", alt: "Fun activities" },
  ];

  const nextMedia = () => setCurrentMediaIndex((prev) => (prev + 1) % donationMedia.length);
  const prevMedia = () => setCurrentMediaIndex((prev) => (prev - 1 + donationMedia.length) % donationMedia.length);

  useEffect(() => setIsClient(true), []);

  const initiateOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setIsDonationModalOpen(true);
  };

  const executeOrder = async (donation: number) => {
    setIsDonationModalOpen(false);
    setDonationAmount(donation);
    setStep("processing");
    
    // Map items to the format required by our Server Action
    const orderPayload = items.map(i => ({ id: i.id, quantity: i.quantity }));
    const address = selectedAddress.text;

    try {
      const response = await placeOrder(orderPayload, address);

      if (response.success) {
        setStep("success");
        clearCart(); // Clear the Zustand store!
        
        setTimeout(() => {
          router.push(`/tracking`);
        }, 4000);
      } else {
        toast.error(response.error || "Failed to place order.");
        setStep("review");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      setStep("review");
    }
  };

  if (!isClient) return null;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      
      <AnimatePresence mode="wait">
        
        {/* ── STEP 1: REVIEW & PAY ── */}
        {step === "review" && (
          <motion.div 
            key="review"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col flex-1 pb-[100px]"
          >
            {/* Header */}
            <header className="sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-light py-3 px-4 flex items-center gap-3">
              <button onClick={() => router.back()} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-full transition-colors active:bg-gray-100 dark:active:bg-white/5">
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-xl font-heading font-bold text-text-primary">Checkout</h1>
            </header>

            <main className="p-4 space-y-5">
              
              {/* Delivery Address */}
              <section className="bg-surface border border-border-light rounded-[--radius-lg] p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-heading font-bold text-text-primary flex items-center gap-2">
                    <MapPin size={18} className="text-primary" /> Delivery Address
                  </h2>
                  <button className="text-primary text-sm font-semibold">Change</button>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-[--radius-md]">
                  <h3 className="font-bold text-sm text-text-primary">{selectedAddress.type}</h3>
                  <p className="text-sm text-text-secondary mt-1">{selectedAddress.text}</p>
                  <p className="text-sm text-text-secondary mt-0.5">+91 98765 43210</p>
                </div>
              </section>

              {/* Delivery Slot */}
              <section className="bg-surface border border-border-light rounded-[--radius-lg] p-4 shadow-sm">
                <h2 className="font-heading font-bold text-text-primary flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-primary" /> Delivery Time
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setDeliveryType("instant")}
                    className={`p-3 rounded-[--radius-md] border text-left transition-colors ${
                      deliveryType === "instant" 
                        ? "border-primary bg-primary-50 dark:bg-primary/10" 
                        : "border-border-light hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-text-primary">Instant</span>
                      {deliveryType === "instant" && <CheckCircle2 size={16} className="text-primary" />}
                    </div>
                    <span className="text-xs text-text-secondary">Delivery in 15 mins</span>
                  </button>
                  <button 
                    onClick={() => setDeliveryType("scheduled")}
                    className={`p-3 rounded-[--radius-md] border text-left transition-colors ${
                      deliveryType === "scheduled" 
                        ? "border-primary bg-primary-50 dark:bg-primary/10" 
                        : "border-border-light hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-text-primary">Schedule</span>
                      {deliveryType === "scheduled" && <CheckCircle2 size={16} className="text-primary" />}
                    </div>
                    <span className="text-xs text-text-secondary">Pick a time slot</span>
                  </button>
                </div>
              </section>

              {/* Gift Note */}
              <section className="bg-surface border border-border-light rounded-[--radius-lg] p-4 shadow-sm">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsGift(!isGift)}>
                  <div className="flex items-center gap-2">
                    <Gift size={18} className="text-primary" />
                    <div>
                      <h2 className="font-heading font-bold text-text-primary">Send as a Gift</h2>
                      <p className="text-xs text-text-secondary">Add a personalized message</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isGift ? "bg-primary" : "bg-gray-200 dark:bg-white/10"}`}>
                    <motion.div 
                      layout 
                      className="w-4 h-4 rounded-full bg-white shadow-sm"
                      animate={{ x: isGift ? 16 : 0 }}
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {isGift && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <textarea 
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Write a lovely message... (Optional)"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-border-light rounded-[--radius-md] p-3 text-sm text-text-primary focus:outline-none focus:border-primary resize-none h-20"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Payment Methods */}
              <section className="bg-surface border border-border-light rounded-[--radius-lg] p-4 shadow-sm">
                <h2 className="font-heading font-bold text-text-primary flex items-center gap-2 mb-3">
                  <CreditCard size={18} className="text-primary" /> Payment Method
                </h2>
                
                <div className="space-y-2">
                  {/* UPI */}
                  <label className="flex items-center justify-between p-3 border border-border-light rounded-[--radius-md] cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-text-secondary" />
                      <span className="font-semibold text-sm text-text-primary">UPI (GPay, PhonePe, Paytm)</span>
                    </div>
                    <input 
                      type="radio" name="payment" value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                  </label>

                  {/* Cards */}
                  <label className="flex items-center justify-between p-3 border border-border-light rounded-[--radius-md] cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Wallet size={20} className="text-text-secondary" />
                      <span className="font-semibold text-sm text-text-primary">Credit / Debit Card</span>
                    </div>
                    <input 
                      type="radio" name="payment" value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                  </label>

                  {/* COD */}
                  <label className="flex items-center justify-between p-3 border border-border-light rounded-[--radius-md] cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Banknote size={20} className="text-text-secondary" />
                      <span className="font-semibold text-sm text-text-primary">Cash on Delivery</span>
                    </div>
                    <input 
                      type="radio" name="payment" value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                  </label>
                </div>
              </section>

              {/* Order Summary (Compact) */}
              <section className="bg-surface border border-border-light rounded-[--radius-lg] p-4 shadow-sm">
                <div className="flex items-center justify-between cursor-pointer">
                  <h2 className="font-heading font-bold text-text-primary text-sm">Order Summary ({items.length} items)</h2>
                  <Link href="/cart" className="text-primary text-sm font-semibold">Edit Cart</Link>
                </div>
                <div className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Delivery & Handling</span>
                    <span>₹{handlingFee}</span>
                  </div>
                  <div className="h-px bg-border-light my-2" />
                  <div className="flex justify-between font-bold text-base text-text-primary">
                    <span>To Pay</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </section>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-text-tertiary">
                <ShieldCheck size={14} /> Safe and secure payments. 100% Authentic products.
              </div>

            </main>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-surface border-t border-border-light p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-safe">
              <button 
                onClick={initiateOrder}
                className="w-full h-12 bg-primary text-white rounded-[--radius-lg] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-primary"
              >
                Place Order • ₹{grandTotal}
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: PROCESSING ── */}
        {step === "processing" && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-24 h-24 mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck size={32} className="text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">Processing Payment</h2>
            <p className="text-text-secondary">Please do not close this window or hit back.</p>
          </motion.div>
        )}

        {/* ── STEP 3: SUCCESS ── */}
        {step === "success" && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-primary"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"
            >
              <CheckCircle2 size={48} className="text-primary" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-heading font-bold text-white mb-2"
            >
              Order Placed!
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 mb-8"
            >
              Your drinks are on the way. Sit back and relax.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 text-white/60 text-sm"
            >
              <div className="w-4 h-4 rounded-full border-2 border-white/60 border-t-white animate-spin" />
              Redirecting to live tracking...
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      <Modal
        isOpen={isDonationModalOpen}
        onClose={() => executeOrder(0)}
        closeOnOverlay={false}
        title="Support a Cause 💖"
        description="Would you like to donate a small amount to support underprivileged children before placing your order?"
      >
        <div className="flex flex-col gap-4 mt-2">
          
          {/* Carousel */}
          <div className="relative w-full h-[240px] sm:h-[380px] rounded-xl overflow-hidden group bg-gray-100 dark:bg-gray-800 shadow-inner">
            {donationMedia[currentMediaIndex].type === "image" ? (
              <Image 
                src={donationMedia[currentMediaIndex].src}
                alt={donationMedia[currentMediaIndex].alt}
                fill
                className="object-cover"
              />
            ) : (
              <video 
                src={donationMedia[currentMediaIndex].src} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {/* Navigation Buttons */}
            <button 
              onClick={prevMedia}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextMedia}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={18} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {donationMedia.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${idx === currentMediaIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/50'}`} 
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[10, 20, 50].map((amount) => (
              <button
                key={amount}
                onClick={() => executeOrder(amount)}
                className="py-3 px-2 border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-primary font-bold"
              >
                ₹{amount}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => executeOrder(0)}
            className="w-full py-1 text-sm text-text-secondary font-medium hover:text-text-primary transition-colors mt-[-4px]"
          >
            No thanks, just place my order
          </button>
        </div>
      </Modal>

    </div>
  );
}
