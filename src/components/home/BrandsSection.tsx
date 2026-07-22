"use client";

import React from "react";
import { motion } from "framer-motion";
import { brands } from "@/data/dummy";

export function BrandsSection() {
  return (
    <div className="mb-8 px-4">
      <h2 className="text-lg font-heading font-bold text-text-primary mb-4">Popular Brands</h2>
      <div className="grid grid-cols-3 gap-3">
        {brands.map((brand, idx) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-3 rounded-[--radius-lg] bg-surface border border-border-light shadow-sm"
          >
            <div className="text-3xl mb-1">{brand.logo}</div>
            <span className="text-xs font-semibold text-text-secondary text-center">{brand.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
