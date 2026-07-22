"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, Phone, MessageSquare, MapPin, CheckCircle2, 
  Package, Truck, MoreHorizontal, ShieldCheck, Star
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy tracking states
const trackingSteps = [
  { id: 1, title: "Order Accepted", time: "10:00 AM", icon: CheckCircle2, completed: true },
  { id: 2, title: "Order Prepared", time: "10:05 AM", icon: Package, completed: true },
  { id: 3, title: "Out for Delivery", time: "10:12 AM", icon: Truck, completed: true },
  { id: 4, title: "Delivered", time: "--:--", icon: MapPin, completed: false },
];

export default function TrackingPage() {
  const router = useRouter();
  
  // Animate map marker
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
            <div>
              <h1 className="font-heading font-semibold text-gray-900 dark:text-gray-100 text-lg">
                Track Order
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                #ORD-8392104 • 3 items
              </p>
            </div>
          </div>
          <button className="text-primary font-medium text-sm">
            Help
          </button>
        </div>
      </header>

      {/* ── Live Map Placeholder ── */}
      <div className="relative w-full h-[35vh] sm:h-[40vh] bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {/* Fake Map Texture */}
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Animated Path (SVG) */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path
            d="M 20 80 Q 50 20 80 40"
            fill="transparent"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Destination Marker */}
        <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="w-8 h-8 text-red-500 fill-white" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-[2px]" />
          </div>
        </div>

        {/* Delivery Partner Marker (Animated) */}
        <motion.div 
          className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            top: ["80%", "60%", "45%"],
            left: ["20%", "45%", "65%"]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative">
            {/* Pulse Effect */}
            <motion.div 
              className="absolute inset-0 bg-primary/40 rounded-full -m-2"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="bg-white p-1.5 rounded-full shadow-lg border-2 border-primary relative z-10">
              <Truck className="w-5 h-5 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Order Status Overlay ── */}
      <div className="relative -mt-6 px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card rounded-2xl shadow-xl p-5 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                12 mins
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Estimated Delivery Time
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              On the way
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 mb-2 overflow-hidden">
            <motion.div 
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* ── Driver Card ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
                alt="Delivery Partner"
                width={50}
                height={50}
                className="rounded-full object-cover border-2 border-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-card p-0.5 rounded-full shadow-sm">
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Rajesh Kumar</h3>
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">4.8</span>
                <span>• 1,240 deliveries</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* ── Animated Timeline ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Tracking Details</h3>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800" />
            <motion.div 
              className="absolute left-[15px] top-4 w-0.5 bg-primary"
              initial={{ height: 0 }}
              animate={{ height: "65%" }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            />

            <div className="space-y-6">
              {trackingSteps.map((step, i) => (
                <div key={step.id} className="relative flex gap-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.2) }}
                    className={cn(
                      "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                      step.completed 
                        ? "bg-primary border-primary text-white" 
                        : "bg-white dark:bg-card border-gray-200 dark:border-gray-700 text-gray-400"
                    )}
                  >
                    <step.icon className="w-4 h-4" />
                  </motion.div>
                  
                  <div className="flex-1 pt-1">
                    <h4 className={cn(
                      "font-medium",
                      step.completed ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                    )}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {step.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Delivery Address</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Home • 123, Tech Park, Sector 45, Gurgaon, Haryana 122003
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
