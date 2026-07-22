"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { banners } from "@/data/dummy";

export function PromoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full overflow-hidden mt-2 mb-6" ref={containerRef}>
      <motion.div 
        className="flex gap-4 px-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            className={`relative min-w-[280px] sm:min-w-[320px] h-40 rounded-[20px] overflow-hidden snap-center shrink-0 bg-gradient-to-r ${banner.color} border border-border-light`}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority
              className="object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-heading font-bold text-lg leading-tight">{banner.title}</h3>
              <p className="text-white/80 text-sm">{banner.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
