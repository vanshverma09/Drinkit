"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export default function BottomNavigation() {
  const pathname = usePathname();
  const cartItemsCount = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Cart", href: "/cart", icon: ShoppingCart, badge: mounted ? cartItemsCount : 0 },
    { label: "Favorites", href: "/wishlist", icon: Heart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[--z-fixed]",
        "bg-surface/95 backdrop-blur-md border-t border-border-light shadow-up",
        "lg:hidden" /* Hide on desktop — sidebar takes over */
      )}
      aria-label="Main navigation"
    >
      <div className="app-container flex items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-[--radius-md] transition-all duration-[--duration-normal] touch-target",
                isActive
                  ? "text-primary"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-all duration-[--duration-normal]"
                />
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-scale-in" />
                )}
                {/* Cart Badge */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center ring-2 ring-surface animate-bounce-in">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] transition-all duration-[--duration-normal]",
                  isActive ? "font-semibold" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe area for iPhone notch / gesture bar */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
