"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function EmailLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    
    // Dynamically import signIn
    const { signIn } = await import("next-auth/react");
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrors({ password: "Invalid email or password" });
      setIsLoading(false);
    } else {
      router.push("/home");
    }
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
      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </motion.div>

      {/* Heading */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={stagger} className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Email Login
        </h2>
        <p className="text-white/50 text-sm">
          Sign in with your email and password
        </p>
      </motion.div>

      {/* Form */}
      <motion.form custom={1} initial="hidden" animate="visible" variants={stagger} onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@example.com"
              autoFocus
              className={`w-full h-12 pl-10 pr-4 bg-white/5 border rounded-[14px] text-white text-sm
                placeholder:text-white/25 focus:outline-none transition-all
                ${errors.email ? "border-error/60 focus:ring-2 focus:ring-error/20" : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"}`}
            />
          </div>
          {errors.email && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-error text-xs mt-1.5 ml-1">
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="Enter your password"
              className={`w-full h-12 pl-10 pr-12 bg-white/5 border rounded-[14px] text-white text-sm
                placeholder:text-white/25 focus:outline-none transition-all
                ${errors.password ? "border-error/60 focus:ring-2 focus:ring-error/20" : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-error text-xs mt-1.5 ml-1">
              {errors.password}
            </motion.p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/login/forgot-password"
            className="text-primary/80 hover:text-primary text-xs font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-[14px]
            flex items-center justify-center gap-2 transition-all active:scale-[0.97]
            disabled:opacity-60 disabled:cursor-not-allowed shadow-primary"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </motion.form>

      {/* Register */}
      <motion.p custom={3} initial="hidden" animate="visible" variants={stagger} className="text-center text-sm text-white/40 mt-8">
        Don&apos;t have an account?{" "}
        <Link href="/login/register" className="text-primary font-semibold hover:underline underline-offset-2">
          Register
        </Link>
      </motion.p>
    </div>
  );
}
