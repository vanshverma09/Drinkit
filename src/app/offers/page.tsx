"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Tag, Copy, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";

const offers = [
  {
    id: "o1",
    code: "PREM1200",
    title: "First Time User Offer! 🎉",
    description: "Get a massive flat ₹1200 OFF on your first premium order above ₹10,000.",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    validity: "Valid on first order > ₹10k"
  },
  {
    id: "o2",
    code: "LATA1200",
    title: "Welcome Bonus! 🍾",
    description: "Flat ₹1200 discount for new customers on orders over ₹10,000.",
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    validity: "Valid on first order > ₹10k"
  },
  {
    id: "o2_5",
    code: "PREMLATA2400",
    title: "Double Bonus! 🎊",
    description: "Massive flat ₹2400 discount for select customers on orders over ₹10,000.",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    validity: "Valid on first order > ₹10k"
  },
  {
    id: "o3",
    code: "DRINKIT50",
    title: "Instant Discount 🍻",
    description: "Get ₹50 OFF instantly on your cart. No minimum order value.",
    color: "bg-success/10 text-success border-success/20",
    validity: "No minimum value"
  }
];

export default function OffersPage() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <AppShell>
      <div className="bg-background min-h-screen pb-[120px]">
        {/* HEADER */}
        <header className="sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-light py-3 px-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-full transition-colors active:bg-gray-100 dark:active:bg-white/5">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-heading font-bold text-text-primary">Available Offers</h1>
        </header>

        <div className="p-4 space-y-4">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border-light rounded-[--radius-lg] p-5 shadow-sm overflow-hidden relative"
            >
              {/* Decorative circle */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${offer.color.split(' ')[0]} blur-2xl opacity-50`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag size={20} className={offer.color.split(' ')[1]} />
                    <h3 className="font-bold text-base text-text-primary">{offer.title}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between border-t border-border-light pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-tertiary mb-1">Code</span>
                    <span className="font-mono font-bold text-primary bg-primary-50 dark:bg-primary/10 px-2 py-1 rounded border border-primary/20 border-dashed tracking-wider">
                      {offer.code}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-medium text-text-tertiary">{offer.validity}</span>
                    <button 
                      onClick={() => handleCopy(offer.code)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${
                        copiedCode === offer.code 
                          ? 'bg-success/10 text-success' 
                          : 'bg-surface border border-border-light text-text-primary hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <CheckCircle2 size={14} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
