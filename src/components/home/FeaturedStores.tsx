"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { stores } from "@/data/dummy";

export function FeaturedStores() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-lg font-heading font-bold text-text-primary">Featured Stores</h2>
        <button className="text-primary text-sm font-semibold">See all</button>
      </div>
      <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar pb-2">
        {stores.map((store, idx) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="shrink-0 w-[240px] rounded-[--radius-xl] overflow-hidden bg-surface border border-border-light shadow-sm"
          >
            <div className="relative h-28 w-full">
              <Image src={store.image} alt={store.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3 text-white">
                <h3 className="font-heading font-bold text-lg">{store.name}</h3>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center gap-1 font-medium text-text-primary">
                <Star size={14} className="fill-secondary text-secondary" />
                <span>{store.rating}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-[--radius-sm] font-medium text-xs">
                <Clock size={12} />
                <span>{store.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
