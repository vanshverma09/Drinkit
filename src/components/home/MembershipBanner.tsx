"use client";

import React from "react";
import { motion } from "framer-motion";

export function MembershipBanner() {
  return (
    <div className="px-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[--radius-xl] bg-gradient-to-r from-purple-600 to-indigo-600 p-5 text-white shadow-lg"
      >
        <div className="absolute top-0 right-0 p-2 opacity-20 transform translate-x-4 -translate-y-4">
          <span className="text-8xl">👑</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">👑</span>
            <h3 className="font-heading font-bold text-lg">DrinkIT Pro</h3>
          </div>
          <p className="text-white/80 text-sm mb-4 max-w-[200px]">
            Get free delivery & extra 5% off on every order
          </p>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-[--radius-md] font-bold text-sm shadow-sm active:scale-95 transition-transform">
            Join Now at ₹99/mo
          </button>
        </div>
      </motion.div>
    </div>
  );
}
