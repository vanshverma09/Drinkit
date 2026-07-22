"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Floating Beverage Emojis ─────────────────────────────── */
const floatingItems = [
  { emoji: "🧃", x: 8, y: 15, size: 28, delay: 0, duration: 7 },
  { emoji: "🍵", x: 85, y: 10, size: 24, delay: 1, duration: 9 },
  { emoji: "☕", x: 15, y: 75, size: 22, delay: 2, duration: 8 },
  { emoji: "🥤", x: 90, y: 70, size: 26, delay: 0.5, duration: 10 },
  { emoji: "🍹", x: 45, y: 5, size: 20, delay: 3, duration: 7 },
  { emoji: "🧋", x: 70, y: 85, size: 24, delay: 1.5, duration: 9 },
  { emoji: "🍺", x: 5, y: 45, size: 18, delay: 2.5, duration: 8 },
  { emoji: "🥛", x: 92, y: 40, size: 20, delay: 0.8, duration: 11 },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* ── Animated Background ───────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0A1628 0%, #0F2318 30%, #132A1C 50%, #0F2318 70%, #0A1628 100%)",
        }}
      />

      {/* ── Moving Mesh Gradient ──────────────────────────── */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(22,163,74,0.15) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(22,163,74,0.15) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(22,163,74,0.15) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(22,163,74,0.15) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating Beverage Icons ───────────────────────── */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
          }}
          animate={{
            y: [0, -25, 5, -15, 0],
            x: [0, 10, -8, 5, 0],
            rotate: [0, 10, -10, 5, 0],
            opacity: [0.15, 0.25, 0.15, 0.2, 0.15],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* ── Content Container ─────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="DrinkIT"
              width={52}
              height={52}
              className="rounded-[14px] shadow-lg"
              priority
            />
            <div>
              <h1 className="text-2xl font-heading font-bold text-white">
                Drink<span className="text-primary">it</span>
              </h1>
              <p className="text-[11px] text-white/40 tracking-wider uppercase -mt-0.5">
                Drinks Delivered Fast
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Glassmorphism Card — wraps page content */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[24px] overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {children}
        </motion.div>

        {/* Bottom Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-white mt-6 leading-relaxed"
        >
          By continuing, you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-primary transition-colors">
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
