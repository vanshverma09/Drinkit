"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Bell,
  ChevronDown,
  Search,
  Mic,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ShoppingBag,
  Heart,
  Wallet,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Profile Dropdown Data ───────────────────────────────── */
const profileMenuItems = [
  { label: "My Orders", href: "/orders", icon: ShoppingBag },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Rewards", href: "/rewards", icon: Gift },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help & Support", href: "/help", icon: HelpCircle },
];

export default function Header() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  /* Sticky shadow on scroll */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Keyboard shortcut: Ctrl+K → focus search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[--z-sticky] bg-surface/95 backdrop-blur-md transition-shadow duration-[--duration-normal]",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="px-4 py-3">
        {/* Row 1: Logo · Address · Icons */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Logo + Delivery Address */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="DrinkIT"
                width={36}
                height={36}
                className="rounded-[--radius-sm]"
                priority
              />
            </Link>
            <button className="flex items-center gap-1 min-w-0 group">
              <MapPin
                size={18}
                className="shrink-0 text-primary fill-primary/20"
              />
              <div className="flex flex-col items-start min-w-0">
                <span className="flex items-center gap-0.5">
                  <span className="text-sm font-semibold text-text-primary leading-tight">
                    Home
                  </span>
                  <ChevronDown
                    size={14}
                    className="text-text-tertiary group-hover:text-primary transition-colors"
                  />
                </span>
                <span className="text-[11px] text-text-tertiary truncate max-w-[160px] sm:max-w-[240px]">
                  14B, 3rd Floor, Green Enclave, Sector 45
                </span>
              </div>
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {/* Notification Bell */}
            <Link
              href="/notifications"
              className={cn(
                "relative p-2.5 rounded-[--radius-md] transition-colors touch-target",
                "hover:bg-gray-100 dark:hover:bg-white/10",
                pathname === "/notifications" && "bg-primary-50 text-primary"
              )}
              aria-label="Notifications"
            >
              <Bell size={22} className="text-text-primary" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-error rounded-full ring-2 ring-surface animate-pulse" />
            </Link>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={cn(
                  "p-2 rounded-[--radius-md] transition-all touch-target",
                  "hover:bg-gray-100 dark:hover:bg-white/10",
                  isProfileOpen && "bg-primary-50"
                )}
                aria-label="Profile menu"
                aria-expanded={isProfileOpen}
              >
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary/20 flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
              </button>

              {/* Dropdown Panel */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-[--radius-lg] shadow-xl animate-scale-in origin-top-right z-[--z-dropdown]">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-border-light">
                    <p className="text-sm font-semibold text-text-primary">
                      Vansh Verma
                    </p>
                    <p className="text-xs text-text-tertiary">
                      +91 98765 43210
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                            isActive
                              ? "text-primary bg-primary-50 dark:bg-primary/10 font-medium"
                              : "text-text-primary hover:bg-gray-50 dark:hover:bg-white/5"
                          )}
                        >
                          <Icon size={18} className={isActive ? "text-primary" : "text-text-tertiary"} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border-light py-1">
                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-light dark:hover:bg-error/10 w-full transition-colors">
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-text-tertiary" />
          </div>
          <input
            id="global-search"
            type="text"
            placeholder="Search beverages, brands..."
            className={cn(
              "w-full bg-background dark:bg-white/5 border border-border rounded-[--radius-search] py-3 pl-11 pr-20 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
              "placeholder:text-text-tertiary"
            )}
          />
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            <span className="hidden sm:inline-flex text-[10px] text-text-disabled border border-border rounded px-1.5 py-0.5 font-mono">
              Ctrl+K
            </span>
            <button
              className="p-2 text-text-tertiary hover:text-primary transition-colors rounded-full hover:bg-primary-50"
              aria-label="Voice search"
            >
              <Mic size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
