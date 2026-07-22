"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));
}

/* ============================================================
   BUBBLE PARTICLE
   ============================================================ */

function BubbleParticle({ particle }: { particle: Particle }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, rgba(22,163,74,${particle.opacity * 0.5}) 100%)`,
        boxShadow: `0 0 ${particle.size * 2}px rgba(22,163,74,${particle.opacity * 0.3})`,
      }}
      animate={{
        y: [0, -80, -160],
        x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
        opacity: [0, particle.opacity, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ============================================================
   LIQUID BLOB
   ============================================================ */

function LiquidBlob({
  color,
  size,
  position,
  delay,
}: {
  color: string;
  size: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        ...position,
        width: size,
        height: size,
        background: color,
      }}
      animate={{
        scale: [1, 1.3, 1, 0.9, 1],
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 15, -10, 0],
        rotate: [0, 45, -30, 15, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ============================================================
   SPLASH SCREEN
   ============================================================ */

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete" | "exit">("loading");
  const [particles] = useState(() => generateParticles(30));
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  /* Progress bar simulation */
  const startProgress = useCallback(() => {
    let current = 0;
    progressRef.current = setInterval(() => {
      // Simulate realistic loading — fast start, slow middle, fast finish
      if (current < 30) current += Math.random() * 3 + 1;
      else if (current < 70) current += Math.random() * 1.5 + 0.5;
      else if (current < 90) current += Math.random() * 2 + 1;
      else current += Math.random() * 3 + 2;

      if (current >= 100) {
        current = 100;
        if (progressRef.current) clearInterval(progressRef.current);
        setProgress(100);
        setTimeout(() => setPhase("complete"), 300);
      } else {
        setProgress(Math.min(current, 99));
      }
    }, 60);
  }, []);

  useEffect(() => {
    startProgress();
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startProgress]);

  /* Auto-navigate after completion */
  useEffect(() => {
    if (phase === "complete") {
      const timer = setTimeout(() => setPhase("exit"), 800);
      return () => clearTimeout(timer);
    }
    if (phase === "exit") {
      const timer = setTimeout(() => router.push("/home"), 600);
      return () => clearTimeout(timer);
    }
  }, [phase, router]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none"
          style={{
            background:
              "linear-gradient(135deg, #0A1628 0%, #0F2318 35%, #132A1C 50%, #1A3320 65%, #0A1628 100%)",
          }}
        >
          {/* ── Liquid Blobs (Background) ──────────────────── */}
          <LiquidBlob
            color="rgba(22, 163, 74, 0.15)"
            size={400}
            position={{ top: "-10%", right: "-10%" }}
            delay={0}
          />
          <LiquidBlob
            color="rgba(255, 213, 79, 0.08)"
            size={350}
            position={{ bottom: "-15%", left: "-10%" }}
            delay={2}
          />
          <LiquidBlob
            color="rgba(22, 163, 74, 0.10)"
            size={250}
            position={{ top: "40%", left: "60%" }}
            delay={4}
          />
          <LiquidBlob
            color="rgba(34, 197, 94, 0.06)"
            size={300}
            position={{ bottom: "20%", right: "30%" }}
            delay={1}
          />

          {/* ── Particle Field ─────────────────────────────── */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((p) => (
              <BubbleParticle key={p.id} particle={p} />
            ))}
          </div>

          {/* ── Radial Glow ────────────────────────────────── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at center, rgba(22,163,74,0.12) 0%, transparent 70%)",
            }}
          />

          {/* ── Central Content ────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Glassmorphism Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center px-10 py-12 sm:px-16 sm:py-16 rounded-[32px]"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 32px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Animated Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative mb-8"
              >
                {/* Glow ring behind logo */}
                <motion.div
                  className="absolute inset-0 rounded-[28px]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #16A34A, #FFD54F, #22C55E, #16A34A)",
                    filter: "blur(20px)",
                    opacity: 0.4,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Logo pulsing shadow */}
                <motion.div
                  className="absolute inset-2 rounded-[24px] bg-primary/20"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ filter: "blur(16px)" }}
                />
                <Image
                  src="/logo.png"
                  alt="DrinkIT"
                  width={120}
                  height={120}
                  priority
                  className="relative rounded-[24px] shadow-2xl"
                />
              </motion.div>

              {/* Brand Name — letter-by-letter animation */}
              <div className="flex items-baseline mb-3 overflow-hidden">
                {"Drinkit".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`text-4xl sm:text-5xl font-heading font-bold ${
                      i >= 5 ? "text-primary" : "text-white"
                    }`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Slogan */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="text-white/50 text-sm sm:text-base font-medium tracking-wider uppercase"
              >
                Drinks Delivered Fast
              </motion.p>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="mt-6 mb-8 flex items-center gap-3"
              >
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/40" />
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 200 }}
                transition={{ duration: 0.4, delay: 2 }}
                className="relative"
              >
                {/* Track */}
                <div className="h-1 w-[200px] rounded-full bg-white/10 overflow-hidden">
                  {/* Fill */}
                  <motion.div
                    className="h-full rounded-full relative"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, #16A34A, #22C55E, #FFD54F)",
                      boxShadow: "0 0 12px rgba(22,163,74,0.5)",
                      transition: "width 0.1s ease-out",
                    }}
                  >
                    {/* Shimmer on progress bar */}
                    <div
                      className="absolute inset-0 animate-shimmer"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)",
                        backgroundSize: "200% 100%",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Percentage */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="text-center mt-3 text-white/30 text-xs font-number tabular-nums"
                >
                  {Math.round(progress)}%
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="mt-8 text-white text-[11px] tracking-widest uppercase"
            >
              Premium Beverage Delivery
            </motion.p>
          </div>

          {/* ── Corner Accents ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1 }}
            className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-primary/40 rounded-br-2xl"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
