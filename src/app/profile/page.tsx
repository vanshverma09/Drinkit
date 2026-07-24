"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { 
  ArrowLeft, Wallet, Gift, MapPin, CreditCard, 
  HelpCircle, HeadphonesIcon, Settings, Moon, Sun, 
  Globe, LogOut, ChevronRight, Edit3, User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuSections = [
  {
    title: "Account & Payments",
    items: [
      { id: "wallet", label: "DrinkIT Wallet", icon: Wallet, value: "₹1250", href: "/profile/wallet" },
      { id: "rewards", label: "My Rewards", icon: Gift, value: "840 pts", href: "/profile/rewards", highlight: true },
      { id: "addresses", label: "Saved Addresses", icon: MapPin, href: "/profile/addresses" },
      { id: "cards", label: "Saved Cards", icon: CreditCard, href: "/profile/cards" },
    ]
  },
  {
    title: "Support & Help",
    items: [
      { id: "help", label: "Help Center", icon: HelpCircle, href: "/help" },
      { id: "support", label: "Live Chat Support", icon: HeadphonesIcon, href: "/help" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { id: "settings", label: "App Settings", icon: Settings, href: "/settings" },
      { id: "language", label: "Language", icon: Globe, value: "English", href: "#" },
      // Dark mode is handled separately as a toggle
    ]
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  // ── Unauthenticated State ──
  /*
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface p-8 rounded-[32px] shadow-xl border border-border flex flex-col items-center max-w-sm w-full"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <UserIcon size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">You're not logged in</h2>
          <p className="text-text-secondary text-sm mb-8">
            Log in to view your orders, save your wishlist, and get exclusive rewards.
          </p>
          <button 
            onClick={() => router.push("/login")}
            className="w-full h-12 bg-primary text-white font-bold rounded-[14px] flex items-center justify-center shadow-primary active:scale-95 transition-transform"
          >
            Log In or Sign Up
          </button>
        </motion.div>
      </div>
    );
  }
  */

  // ── Loading State ──
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  const user = {
    name: session?.user?.name || "DrinkIT User",
    email: session?.user?.email || "No email provided",
    avatar: session?.user?.image || "/modi.png",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ── Header ── */}
      <header className="relative z-10 bg-primary h-40 rounded-b-[40px] shadow-lg overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
          <div className="absolute bottom-0 -right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
        </div>

        <div className="relative z-10 px-4 pt-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => alert("Edit profile clicked!")}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── Avatar Modal (Instagram Style) ── */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatarModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden shadow-2xl border-2 border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 -mt-16 relative z-20">
        {/* ── Animated Profile Card ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-surface rounded-3xl p-5 shadow-xl border border-border-light flex items-center gap-5"
        >
          <motion.button 
            onClick={() => setShowAvatarModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-20 h-20 rounded-full border-4 border-surface shadow-md overflow-hidden bg-gray-100 shrink-0"
          >
            <Image 
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-text-primary truncate">{user.name}</h2>
            <p className="text-sm text-text-secondary mt-0.5 truncate">{user.email}</p>
          </div>
        </motion.div>

        {/* ── Menu Sections ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-6 space-y-6"
        >
          {menuSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
              <div className="bg-surface rounded-2xl shadow-sm border border-border-light overflow-hidden">
                {section.items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => { 
                      if (item.href && item.href !== "#") {
                        router.push(item.href);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors",
                      i !== section.items.length - 1 && "border-b border-border-light"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        item.highlight 
                          ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" 
                          : "bg-gray-50 dark:bg-white/5 text-text-secondary"
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-text-primary">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.value && (
                        <span className={cn(
                          "font-semibold",
                          item.highlight ? "text-yellow-600 dark:text-yellow-400" : "text-primary"
                        )}>
                          {item.value}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-text-tertiary" />
                    </div>
                  </motion.button>
                ))}

                {/* Dark Mode Toggle inside Preferences */}
                {section.title === "Preferences" && mounted && (
                  <motion.div
                    variants={itemVariants}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-t border-border-light cursor-pointer"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0 text-text-secondary">
                        {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </div>
                      <span className="font-medium text-text-primary">
                        Dark Mode
                      </span>
                    </div>
                    
                    <button 
                      className={cn(
                        "relative w-12 h-6 rounded-full transition-colors",
                        theme === 'dark' ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                      )}
                    >
                      <motion.div
                        className="absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        animate={{ left: theme === 'dark' ? "28px" : "4px" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          ))}

          {/* ── Logout Button ── */}
          <motion.div variants={itemVariants}>
            <button 
              onClick={() => signOut({ callbackUrl: "/home" })}
              className="w-full bg-surface rounded-2xl p-4 shadow-sm border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors mt-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold">Log Out</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
