"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";

const OTP_LENGTH = 6;

export default function OTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "9876543210";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* Countdown timer for resend */
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  /* Auto-focus first input */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* Auto-submit when all digits filled */
  const handleVerify = useCallback(() => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete OTP");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate verification (accept any 6-digit code)
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      // Navigate to home after success animation
      setTimeout(() => router.push("/home"), 1200);
    }, 1500);
  }, [otp, router]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (error) setError("");

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit on last digit
    if (digit && index === OTP_LENGTH - 1) {
      const code = newOtp.join("");
      if (code.length === OTP_LENGTH) {
        setTimeout(() => handleVerify(), 200);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pasted.length === OTP_LENGTH) {
      setTimeout(() => handleVerify(), 200);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(30);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  const maskedPhone = `+91 ${phone.slice(0, 2)}****${phone.slice(-2)}`;

  return (
    <div className="px-6 py-8 sm:px-8 sm:py-10">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </motion.div>

      {/* Success State */}
      {isVerified ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-5"
          >
            <ShieldCheck size={40} className="text-primary" />
          </motion.div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            Verified!
          </h2>
          <p className="text-white/50 text-sm">
            Redirecting you to DrinkIT...
          </p>
          <div className="mt-4 h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </motion.div>
      ) : (
        <>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-heading font-bold text-white mb-2">
              Verify OTP
            </h2>
            <p className="text-white/50 text-sm">
              We sent a 6-digit code to{" "}
              <span className="text-white/70 font-medium">{maskedPhone}</span>
            </p>
          </motion.div>

          {/* OTP Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-2.5 sm:gap-3 mb-2"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-number font-bold rounded-[14px] bg-white/5 border transition-all
                  focus:outline-none disabled:opacity-50
                  ${digit ? "text-white border-primary/50 bg-primary/5" : "text-white/80 border-white/10"}
                  ${error ? "border-error/50 shake" : "focus:border-primary/60 focus:ring-2 focus:ring-primary/20"}
                `}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-error text-xs text-center mt-2"
            >
              {error}
            </motion.p>
          )}

          {/* Verify Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleVerify}
            disabled={isVerifying || otp.join("").length < OTP_LENGTH}
            className="mt-6 w-full h-12 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-[14px]
              flex items-center justify-center gap-2 transition-all active:scale-[0.97]
              disabled:opacity-50 disabled:cursor-not-allowed shadow-primary"
          >
            {isVerifying ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={18} />
                Verify & Continue
              </>
            )}
          </motion.button>

          {/* Resend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-center"
          >
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-primary text-sm font-medium flex items-center gap-1.5 mx-auto hover:underline underline-offset-2"
              >
                <RefreshCw size={14} />
                Resend OTP
              </button>
            ) : (
              <p className="text-white/30 text-sm">
                Resend in{" "}
                <span className="font-number text-white/50 tabular-nums">
                  {String(Math.floor(resendTimer / 60)).padStart(1, "0")}:
                  {String(resendTimer % 60).padStart(2, "0")}
                </span>
              </p>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
