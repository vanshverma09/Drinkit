"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Share2, Heart, Star, Clock, ShieldCheck, 
  ChevronDown, ChevronUp, Plus, Minus, Info, 
  Rotate3D, Maximize2, X
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Price } from "@/components/ui/Typography";
import { ProductRow } from "@/components/home/ProductRow";
import { getProductById } from "./actions";
import { useCartStore } from "@/store/cart";

// Dummy extra data for the product page
const productDetails = {
  images: [
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop",
  ],
  rating: 4.8,
  reviewsCount: 1245,
  deliveryEta: "15 mins",
  ingredients: "Carbonated Water, Sugar, Citric Acid, Natural Flavors, Sodium Citrate, Caffeine, Sodium Benzoate (To Protect Taste).",
  nutrition: [
    { label: "Calories", value: "140 kcal" },
    { label: "Total Fat", value: "0g" },
    { label: "Sodium", value: "45mg" },
    { label: "Total Carbs", value: "39g" },
    { label: "Sugars", value: "39g" },
    { label: "Protein", value: "0g" },
  ],
  storage: "Store in a cool, dry place. Best served chilled.",
  reviews: [
    { id: 1, user: "Alex M.", rating: 5, date: "2 days ago", comment: "Always perfectly chilled when delivered!" },
    { id: 2, user: "Sarah K.", rating: 4, date: "1 week ago", comment: "Great taste, fast delivery." }
  ]
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [is3DOpen, setIs3DOpen] = useState(false);

  // Zustand Cart Hooks
  const { items, addToCart, updateQuantity, removeFromCart } = useCartStore();
  const cartItem = items.find(item => item.id === product?.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (params.id) {
      getProductById(params.id as string).then(found => {
        if (found) setProduct(found);
      });
    }
  }, [params.id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on DrinkIT!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-[100px]">
      
      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Share2 size={18} />
          </button>
          <button onClick={() => setIsWishlisted(!isWishlisted)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Heart size={18} className={isWishlisted ? "fill-error text-error" : ""} />
          </button>
        </div>
      </header>

      {/* ── IMAGE GALLERY ── */}
      <div className="relative w-full h-[50vh] bg-gray-50 dark:bg-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <Image
              src={product.image || productDetails.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Floating Actions on Image */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button 
            onClick={() => setIsZoomOpen(true)}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-text-primary shadow-lg"
          >
            <Maximize2 size={18} />
          </button>
          <button 
            onClick={() => setIs3DOpen(true)}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg"
          >
            <Rotate3D size={18} />
          </button>
        </div>
      </div>

      {/* Image Thumbnails */}
      <div className="flex justify-center gap-2 -mt-4 relative z-10">
        {productDetails.images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeImage === idx ? "w-6 bg-primary" : "bg-white/50 border border-border"
            }`}
          />
        ))}
      </div>

      {/* ── PRODUCT INFO ── */}
      <main className="px-4 pt-6 space-y-6">
        
        {/* Title & Brand */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.brand}</span>
              <h1 className="text-2xl font-heading font-bold text-text-primary mt-1 leading-tight">{product.name}</h1>
              <p className="text-sm text-text-secondary mt-1">{product.volume}</p>
            </div>
            
            {/* Rating Badge */}
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-success px-2 py-1 rounded-[--radius-sm] border border-success/20">
                <span className="font-bold text-sm">{productDetails.rating}</span>
                <Star size={14} className="fill-success" />
              </div>
              <span className="text-[10px] text-text-tertiary mt-1 underline underline-offset-2">{productDetails.reviewsCount} ratings</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing & Delivery ETA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between p-4 bg-surface border border-border-light rounded-[--radius-lg] shadow-sm">
            <div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-text-primary">₹{product.price}</span>
                <span className="text-sm text-text-tertiary line-through mb-1">₹{product.mrp}</span>
                {product.discount && (
                  <span className="text-xs font-bold text-primary bg-primary-50 dark:bg-primary/10 px-1.5 py-0.5 rounded-sm mb-1 ml-1">
                    {product.discount}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-text-secondary mt-1">Inclusive of all taxes</p>
            </div>
            
            <div className="w-px h-10 bg-border-light mx-4" />
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-text-primary font-medium">
                <Clock size={16} className="text-primary" />
                <span>{productDetails.deliveryEta}</span>
              </div>
              <span className="text-[10px] text-text-tertiary mt-1">Delivery Time</span>
            </div>
          </div>
        </motion.div>

        {/* ── ACCORDIONS ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border-light rounded-[--radius-lg] shadow-sm overflow-hidden"
        >
          {/* Nutrition Facts */}
          <div className="border-b border-border-light last:border-0">
            <button 
              onClick={() => toggleSection("nutrition")}
              className="w-full flex items-center justify-between p-4 text-text-primary font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2"><Info size={16} className="text-text-tertiary" /> Nutrition Facts</div>
              {expandedSection === "nutrition" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {expandedSection === "nutrition" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-sm text-text-secondary grid grid-cols-2 gap-y-3 gap-x-4 border-t border-border-light/50 mt-2">
                    {productDetails.nutrition.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b border-border-light border-dashed pb-1">
                        <span>{item.label}</span>
                        <span className="font-medium text-text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ingredients */}
          <div className="border-b border-border-light last:border-0">
            <button 
              onClick={() => toggleSection("ingredients")}
              className="w-full flex items-center justify-between p-4 text-text-primary font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-text-tertiary" /> Ingredients & Storage</div>
              {expandedSection === "ingredients" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {expandedSection === "ingredients" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-sm text-text-secondary border-t border-border-light/50 mt-2">
                    <p className="mb-3"><strong>Ingredients:</strong> {productDetails.ingredients}</p>
                    <p><strong>Storage:</strong> {productDetails.storage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── RELATED PRODUCTS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="-mx-4">
          {/* Note: In a real app we'd fetch actual related products from DB here */}
        </motion.div>

        {/* ── REVIEWS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-lg font-heading font-bold text-text-primary mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {productDetails.reviews.map(review => (
              <div key={review.id} className="p-4 bg-surface border border-border-light rounded-[--radius-lg] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-text-primary">{review.user}</span>
                  <span className="text-xs text-text-tertiary">{review.date}</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < review.rating ? "fill-secondary text-secondary" : "fill-gray-200 text-gray-200 dark:fill-white/10 dark:text-white/10"} />
                  ))}
                </div>
                <p className="text-sm text-text-secondary">{review.comment}</p>
              </div>
            ))}
            <button className="w-full py-3 border border-border-light rounded-[--radius-md] text-sm font-semibold text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              View All 1,245 Reviews
            </button>
          </div>
        </motion.div>

      </main>

      {/* ── STICKY BOTTOM ACTION BAR ── */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[100] bg-surface border-t border-border-light p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 pb-safe"
      >
        {quantity === 0 ? (
          <button 
            onClick={() => addToCart(product)}
            className="w-full h-12 bg-primary text-white rounded-[--radius-lg] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-primary"
          >
            Add to Cart
            <span className="text-white/80 font-normal">|</span>
            ₹{product.price}
          </button>
        ) : (
          <div className="flex items-center justify-between w-full h-12 bg-primary rounded-[--radius-lg] text-white px-4 shadow-primary">
            <button 
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors"
            >
              <Minus size={20} />
            </button>
            <span className="font-bold">{quantity}</span>
            <button 
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        )}
      </motion.div>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            <button onClick={() => setIsZoomOpen(false)} className="absolute top-4 right-4 p-2 text-white bg-white/20 rounded-full z-[210]">
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <Image src={productDetails.images[activeImage]} alt="Zoomed" fill className="object-contain" />
            </div>
          </motion.div>
        )}

        {is3DOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button onClick={() => setIs3DOpen(false)} className="absolute top-4 right-4 p-2 text-white bg-white/20 rounded-full z-[210]">
              <X size={24} />
            </button>
            <div className="w-full max-w-sm aspect-square border-2 border-dashed border-white/20 rounded-[--radius-xl] flex flex-col items-center justify-center text-white/50">
              <Rotate3D size={48} className="mb-4 animate-pulse" />
              <p className="font-heading font-bold text-xl text-white">3D Viewer</p>
              <p className="text-sm">Interactive 3D model placeholder</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
