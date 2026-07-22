"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  ArrowLeft, Palette, Globe, Accessibility, 
  Bell, Shield, Lock, Info, MessageSquare, 
  ChevronRight, Moon, Sun
} from "lucide-react";
import { cn } from "@/lib/utils";

// Settings data structure
const settingsGroups = [
  {
    title: "Preferences",
    items: [
      { id: "theme", label: "Theme", icon: Palette, isToggle: true },
      { id: "language", label: "Language", icon: Globe, value: "English (US)" },
      { id: "accessibility", label: "Accessibility", icon: Accessibility }
    ]
  },
  {
    title: "Notifications",
    items: [
      { id: "notifications", label: "Notification Preferences", icon: Bell }
    ]
  },
  {
    title: "Account & Security",
    items: [
      { id: "privacy", label: "Privacy", icon: Shield },
      { id: "security", label: "Security", icon: Lock }
    ]
  },
  {
    title: "About & Support",
    items: [
      { id: "app-info", label: "App Info", icon: Info, value: "v1.0.0" },
      { id: "feedback", label: "Send Feedback", icon: MessageSquare }
    ]
  }
];

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border-light">
        <div className="flex items-center gap-3 px-4 h-16">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <h1 className="font-heading font-semibold text-text-primary text-lg">
            Settings
          </h1>
        </div>
      </header>

      <div className="px-4 py-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {settingsGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-3 px-2">
                {group.title}
              </h3>
              <div className="bg-surface rounded-2xl shadow-sm border border-border-light overflow-hidden">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className={cn(
                      "w-full flex items-center justify-between p-4 transition-colors",
                      itemIdx !== group.items.length - 1 && "border-b border-border-light",
                      !item.isToggle && "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                    )}
                    onClick={() => {
                      if (!item.isToggle) {
                        // Dummy navigation or action
                        console.log(`Navigating to ${item.id}`);
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 text-text-secondary flex items-center justify-center shrink-0">
                        {item.id === "theme" && mounted ? (
                          theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />
                        ) : (
                          <item.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-medium text-text-primary">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.isToggle && mounted ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.id === "theme") {
                              setTheme(theme === "dark" ? "light" : "dark");
                            }
                          }}
                          className={cn(
                            "relative w-12 h-6 rounded-full transition-colors outline-none",
                            theme === "dark" ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                          )}
                        >
                          <motion.div
                            className="absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full shadow-sm"
                            animate={{ left: theme === "dark" ? "28px" : "4px" }}
                            transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                          />
                        </button>
                      ) : (
                        <>
                          {item.value && (
                            <span className="text-sm font-medium text-text-secondary">
                              {item.value}
                            </span>
                          )}
                          <ChevronRight className="w-5 h-5 text-text-tertiary" />
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
