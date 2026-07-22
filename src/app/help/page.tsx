"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import { ArrowLeft, Search, ChevronDown, Mail, Phone, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Orders & Delivery",
    items: [
      { q: "How fast is the night delivery?", a: "Our premium night delivery ensures your drinks arrive within 30-45 minutes in all major operating zones." },
      { q: "Do I need to show ID upon delivery?", a: "Yes, you must present a valid, government-issued photo ID to our delivery executive to verify you are of legal drinking age." }
    ]
  },
  {
    category: "Payments & Promos",
    items: [
      { q: "How do I use promo codes like PREMLATA2400?", a: "Simply add items to your cart, ensure your total meets the minimum order value (e.g., ₹10,000), and enter the code at checkout to receive your discount." },
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and DrinkIT Wallet." }
    ]
  }
];

export default function HelpCenterPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (question: string) => {
    if (openFaq === question) {
      setOpenFaq(null);
    } else {
      setOpenFaq(question);
    }
  };

  return (
    <AppShell>
      <div className="bg-background min-h-screen pb-[120px]">
        {/* HEADER */}
        <header className="sticky top-0 z-[--z-sticky] bg-primary h-[180px] rounded-b-[40px] shadow-lg overflow-hidden flex flex-col pt-4 px-4 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 -left-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
            <div className="absolute bottom-0 -right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
          </div>

          <div className="flex items-center gap-3 relative z-10 mb-6">
            <button 
              onClick={() => router.back()}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-heading font-semibold text-white text-lg">
              Help Center
            </h1>
          </div>

          <div className="relative z-10 px-2">
            <h2 className="text-white font-bold text-2xl mb-3">How can we help?</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </header>

        <div className="px-4 mt-6">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            <a 
              href="mailto:modithekalover@gmail.com"
              className="bg-surface border border-border-light rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm hover:bg-primary/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-text-secondary text-center">Email Us</span>
            </a>
          </div>

          {/* Contact Details */}
          <div className="bg-surface border border-border-light rounded-3xl p-5 mb-8 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">Direct Contact</h3>
            <div className="space-y-4">
              <a href="mailto:modithekalover@gmail.com" className="flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 p-2 rounded-xl transition-colors -ml-2">
                <div className="w-10 h-10 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-tertiary">Email Address</p>
                  <p className="font-bold text-text-primary">modithekalover@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-lg text-text-primary px-2">Frequently Asked Questions</h3>
            
            {faqs.map((category, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider px-2">
                  {category.category}
                </h4>
                <div className="bg-surface border border-border-light rounded-2xl overflow-hidden shadow-sm">
                  {category.items.map((item, i) => {
                    const isOpen = openFaq === item.q;
                    return (
                      <div key={item.q} className={cn("border-b border-border-light last:border-b-0")}>
                        <button 
                          onClick={() => toggleFaq(item.q)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <span className="font-medium text-text-primary pr-4">{item.q}</span>
                          <ChevronDown className={cn(
                            "w-5 h-5 text-text-tertiary transition-transform duration-300 shrink-0",
                            isOpen && "rotate-180"
                          )} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-text-secondary leading-relaxed bg-gray-50 dark:bg-white/5">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AppShell>
  );
}
