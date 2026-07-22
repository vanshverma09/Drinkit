"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, ArrowLeft, Mic, Clock, TrendingUp, X, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import Image from "next/image";
import { Price } from "@/components/ui/Typography";
import { Plus } from "lucide-react";
import { searchProducts } from "./actions";
import { Product } from "@prisma/client";

/* ── MOCK DATA ────────────────────────────────────────────── */
const recentSearches = ["Jack Daniel's", "Blue Label", "Absolut", "Heineken"];
const popularSearches = ["Whiskey", "Beer", "Vodka", "Premium Brands", "Rum"];
const trendingKeywords = ["Weekend Party", "Premium", "Chilled"];
const filterOptions = ["All", "Whiskey", "Vodka", "Beer", "Rum", "Premium"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "New Arrivals"];

/* ── VOICE SEARCH MODAL ───────────────────────────────────── */
function VoiceSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-surface w-full max-w-sm rounded-[24px] p-8 flex flex-col items-center shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-text-tertiary hover:text-text-primary bg-gray-100 dark:bg-white/5 rounded-full">
          <X size={20} />
        </button>
        <h3 className="text-xl font-heading font-bold text-text-primary mb-8">Listening...</h3>
        
        {/* Pulsing Mic */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-2 bg-primary rounded-full"
          />
          <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Mic size={32} className="text-white" />
          </div>
        </div>
        
        <p className="text-text-secondary text-sm text-center">Try saying "Blue Label" or "Cold Beer"</p>
      </motion.div>
    </div>
  );
}

/* ── MAIN SEARCH PAGE ─────────────────────────────────────── */
export default function SearchPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("Relevance");
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Auto focus input and fetch live data on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    searchProducts("", "").then(data => setAllProducts(data));
  }, []);

  // Search logic (debounced)
  useEffect(() => {
    if (!query.trim()) {
      setIsTyping(false);
      setResults([]);
      return;
    }

    setIsTyping(true);
    setIsSearching(true);
    
    const delay = setTimeout(() => {
      let filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

      if (activeFilter !== "All") {
        filtered = filtered.filter(p => p.category.includes(activeFilter) || p.category === activeFilter);
      }

      if (activeSort === "Price: Low to High") filtered.sort((a, b) => a.price - b.price);
      if (activeSort === "Price: High to Low") filtered.sort((a, b) => b.price - a.price);

      setResults(filtered);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [query, activeFilter, activeSort, allProducts]);

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── HEADER (Mobile optimized, no AppShell needed for full screen search) ── */}
      <header className="sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-full transition-colors active:bg-gray-100 dark:active:bg-white/5">
            <ArrowLeft size={22} />
          </button>
          
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search beverages, brands..."
              className="w-full bg-background dark:bg-white/5 border border-border rounded-[--radius-search] py-2.5 pl-4 pr-20 text-sm focus:outline-none focus:border-primary transition-all text-text-primary placeholder:text-text-tertiary"
            />
            <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
              {query && (
                <button onClick={clearSearch} className="p-1.5 text-text-tertiary hover:text-text-primary rounded-full transition-colors">
                  <X size={16} />
                </button>
              )}
              <div className="w-px h-4 bg-border-light mx-1" />
              <button 
                onClick={() => setIsVoiceOpen(true)}
                className="p-1.5 text-primary hover:bg-primary-50 dark:hover:bg-primary/10 rounded-full transition-colors"
              >
                <Mic size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto">
        
        {/* State 1: Empty Query (History & Suggestions) */}
        {!query && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-6">
            
            {/* Recent Searches */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary">Recent Searches</h3>
                <button className="text-xs text-primary font-medium">Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(item => (
                  <button 
                    key={item} 
                    onClick={() => setQuery(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border-light rounded-[--radius-md] text-sm text-text-secondary hover:text-primary transition-colors shadow-sm"
                  >
                    <Clock size={14} className="text-text-tertiary" />
                    {item}
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Searches */}
            <section>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Popular Right Now</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(item => (
                  <button 
                    key={item} 
                    onClick={() => setQuery(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary/10 border border-primary/20 rounded-[--radius-md] text-sm text-primary font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <TrendingUp size={14} />
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* State 2: Active Search & Results */}
        {query && (
          <div className="flex flex-col h-full">
            
            {/* Filter & Sort Chips */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border-light py-2 px-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <div className="flex items-center gap-1 bg-surface border border-border px-3 py-1.5 rounded-full text-xs font-semibold text-text-primary shrink-0 shadow-sm relative">
                <Filter size={14} />
                <span onClick={() => setShowSortDropdown(!showSortDropdown)} className="cursor-pointer flex items-center gap-1">
                  Sort: {activeSort} <ChevronDown size={14} />
                </span>
                
                {showSortDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-[--radius-md] shadow-xl z-50 p-1">
                    {sortOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setActiveSort(opt); setShowSortDropdown(false); }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-[--radius-sm] ${activeSort === opt ? 'bg-primary-50 text-primary font-bold' : 'text-text-primary hover:bg-gray-50'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="w-px h-4 bg-border-light shrink-0 mx-1" />
              
              {filterOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setActiveFilter(opt)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border shadow-sm ${
                    activeFilter === opt 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-surface border-border-light text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Loading Skeletons */}
            {isSearching ? (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              /* Results Grid */
              <div className="p-4 flex-1">
                {results.length > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  >
                    {results.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-surface border border-border-light rounded-[--radius-lg] p-3 shadow-sm flex flex-col"
                      >
                         {/* Image */}
                        <div className="relative w-full aspect-square mb-2 rounded-[--radius-md] overflow-hidden bg-gray-50 dark:bg-white/5">
                          {product.discount && (
                            <div className="absolute top-0 left-0 z-10 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-[--radius-sm] shadow-sm">
                              {product.discount}
                            </div>
                          )}
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
                              className="w-8 h-8 rounded-[--radius-sm] bg-primary-50 dark:bg-primary/20 text-primary flex items-center justify-center border border-primary/20 hover:bg-primary hover:text-white transition-colors shadow-sm"
                            >
                              <Plus size={18} strokeWidth={2.5} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  /* No Results */
                  <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                    <h3 className="text-lg font-heading font-bold text-text-primary mb-2">No drinks found</h3>
                    <p className="text-text-secondary text-sm max-w-[250px]">
                      We couldn't find any match for "{query}". Try searching for something else.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      
      <AnimatePresence>
        <VoiceSearchModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      </AnimatePresence>
    </div>
  );
}
