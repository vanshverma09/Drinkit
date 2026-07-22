"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Mail, ChevronRight } from "lucide-react";

/* ── Social Icon SVGs ─────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.28-3.74 4.25z" />
    </svg>
  );
}

/* ── Divider with text ────────────────────────────────────── */
function OrDivider() {
  return (
    <div className="flex items-center gap-4 my-5">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-white/30 text-xs uppercase tracking-wider font-medium">
        or
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

/* ── Phone Login Page ─────────────────────────────────────── */
export default function PhoneLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "Phone number is required";
    if (cleaned.length < 10) return "Enter a valid 10-digit number";
    if (cleaned.length > 10) return "Phone number too long";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePhone(phone);
    if (err) {
      setError(err);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push(`/login/otp?phone=${encodeURIComponent(phone)}`);
    }, 800);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (error) setError("");
  };

  const stagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      {/* Heading */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={stagger} className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Welcome back 👋
        </h2>
        <p className="text-white/50 text-sm">
          Sign in to get your drinks delivered in minutes
        </p>
      </motion.div>

      {/* Phone Form */}
      <motion.form custom={1} initial="hidden" animate="visible" variants={stagger} onSubmit={handleSubmit}>
        <label className="block text-white/60 text-sm font-medium mb-2">
          Phone Number
        </label>
        <div className="flex gap-2 mb-1">
          {/* Country Code */}
          <div className="flex items-center gap-1.5 px-3 rounded-[14px] bg-white/5 border border-white/10 text-white shrink-0">
            <span className="text-base">🇮🇳</span>
            <span className="text-sm font-medium">+91</span>
          </div>
          {/* Input */}
          <div className="relative flex-1">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your number"
              autoFocus
              className={`w-full h-12 pl-10 pr-4 bg-white/5 border rounded-[14px] text-white text-sm
                placeholder:text-white/25 focus:outline-none transition-all
                ${error
                  ? "border-error/60 focus:ring-2 focus:ring-error/20"
                  : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                }`}
            />
          </div>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-error text-xs mt-1.5 ml-1"
          >
            {error}
          </motion.p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-[14px]
            flex items-center justify-center gap-2 transition-all active:scale-[0.97]
            disabled:opacity-60 disabled:cursor-not-allowed shadow-primary"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Continue
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </motion.form>

      {/* Divider */}
      <motion.div custom={2} initial="hidden" animate="visible" variants={stagger}>
        <OrDivider />
      </motion.div>

      {/* Social Buttons */}
      <motion.div custom={3} initial="hidden" animate="visible" variants={stagger} className="space-y-3">
        <button 
          onClick={() => {
            import("next-auth/react").then(({ signIn }) => signIn("google", { callbackUrl: "/home" }))
          }}
          type="button"
          className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[14px] text-white text-sm font-medium flex items-center justify-center gap-3 transition-all active:scale-[0.97]"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[14px] text-white text-sm font-medium flex items-center justify-center gap-3 transition-all active:scale-[0.97]">
          <AppleIcon />
          Continue with Apple
        </button>
      </motion.div>

      {/* Email link */}
      <motion.div custom={4} initial="hidden" animate="visible" variants={stagger} className="mt-5">
        <Link
          href="/login/email"
          className="w-full flex items-center justify-center gap-2 text-white/40 hover:text-white/60 text-sm transition-colors py-2"
        >
          <Mail size={16} />
          Sign in with Email
          <ChevronRight size={14} />
        </Link>
      </motion.div>

      {/* Register */}
      <motion.p custom={5} initial="hidden" animate="visible" variants={stagger} className="text-center text-sm text-white/40 mt-6">
        New to DrinkIT?{" "}
        <Link href="/login/register" className="text-primary font-semibold hover:underline underline-offset-2">
          Create account
        </Link>
      </motion.p>
    </div>
  );
}
