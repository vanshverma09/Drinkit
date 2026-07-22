"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email"); return; }
    setError("");
    setIsLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href="/login/email"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </motion.div>

      {isSent ? (
        /* ── Success State ──────────────────────────────── */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-5"
          >
            <CheckCircle2 size={40} className="text-primary" />
          </motion.div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            Check your inbox
          </h2>
          <p className="text-white/50 text-sm max-w-xs mb-6">
            We sent a password reset link to{" "}
            <span className="text-white/70 font-medium">{email}</span>
          </p>
          <Link
            href="/login/email"
            className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-[14px]
              flex items-center justify-center gap-2 transition-all active:scale-[0.97] shadow-primary"
          >
            Back to Login
          </Link>
          <button
            onClick={() => { setIsSent(false); setEmail(""); }}
            className="mt-4 text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            Try a different email
          </button>
        </motion.div>
      ) : (
        /* ── Form State ─────────────────────────────────── */
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-heading font-bold text-white mb-2">
              Forgot Password?
            </h2>
            <p className="text-white/50 text-sm">
              No worries! Enter your email and we&apos;ll send you a reset link.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            <div className="relative mb-1">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="Enter your email"
                autoFocus
                className={`w-full h-12 pl-10 pr-4 bg-white/5 border rounded-[14px] text-white text-sm
                  placeholder:text-white/25 focus:outline-none transition-all
                  ${error ? "border-error/60 focus:ring-2 focus:ring-error/20" : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"}`}
              />
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-error text-xs mt-1.5 ml-1 mb-4">
                {error}
              </motion.p>
            )}

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
                  Send Reset Link
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </motion.form>
        </>
      )}
    </div>
  );
}
