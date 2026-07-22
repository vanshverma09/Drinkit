"use client";

import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/dummy";
import Link from "next/link";

export function CategoriesSlider() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-heading font-bold text-text-primary">Explore Categories</h2>
      </div>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex gap-4 px-4 overflow-x-auto hide-scrollbar pb-2"
      >
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories?tab=${encodeURIComponent(cat.name)}`}>
            <motion.div
              variants={item}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-soft ${cat.color}`}
              >
                {cat.icon}
              </motion.div>
              <span className="text-xs font-medium text-text-secondary text-center leading-tight">
                {cat.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
