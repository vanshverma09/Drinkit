"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Mail, Lock, Phone, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone) errs.phone = "Phone number is required";
    else if (form.phone.replace(/\D/g, "").length < 10) errs.phone = "Enter a valid 10-digit number";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    return errs;
  };

  /* Password strength */
  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Excellent"][strength];
  const strengthColor = ["", "bg-error", "bg-warning", "bg-warning", "bg-success", "bg-primary"][strength];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => router.push("/login/otp?phone=" + encodeURIComponent(form.phone)), 1000);
  };

  const inputClass = (field: string) =>
    `w-full h-12 pl-10 pr-4 bg-white/5 border rounded-[14px] text-white text-sm
     placeholder:text-white/25 focus:outline-none transition-all
     ${errors[field] ? "border-error/60 focus:ring-2 focus:ring-error/20" : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"}`;

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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Create Account
        </h2>
        <p className="text-white/50 text-sm">
          Join DrinkIT for fast beverage delivery
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-3.5"
      >
        {/* Name */}
        <div>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Full Name" className={inputClass("name")} />
          </div>
          {errors.name && <p className="text-error text-xs mt-1 ml-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Email Address" className={inputClass("email")} />
          </div>
          {errors.email && <p className="text-error text-xs mt-1 ml-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Phone Number"
              className={inputClass("phone")}
            />
          </div>
          {errors.phone && <p className="text-error text-xs mt-1 ml-1">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="Password"
              className={`${inputClass("password")} pr-12`}
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
          {/* Strength Meter */}
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      strength >= level ? strengthColor : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/40 font-medium">{strengthLabel}</span>
            </div>
          )}
          {errors.password && <p className="text-error text-xs mt-1 ml-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <CheckCircle2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              placeholder="Confirm Password"
              className={inputClass("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && <p className="text-error text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="!mt-6 w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-[14px]
            flex items-center justify-center gap-2 transition-all active:scale-[0.97]
            disabled:opacity-60 disabled:cursor-not-allowed shadow-primary"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </motion.form>

      {/* Login */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-white/40 mt-6"
      >
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-2">
          Sign in
        </Link>
      </motion.p>
    </div>
  );
}
