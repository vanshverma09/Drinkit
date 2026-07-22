"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
  Package,
  Tag,
  Settings,
  HelpCircle,
  Grid3X3,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

const secondaryNavItems = [
  { label: "Offers", href: "/offers", icon: Tag },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const cartItemsCount = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mainNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Categories", href: "/categories", icon: Grid3X3 },
    { label: "Cart", href: "/cart", icon: ShoppingCart, badge: mounted ? cartItemsCount : 0 },
    { label: "Favorites", href: "/wishlist", icon: Heart },
    { label: "Orders", href: "/orders", icon: Package },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed top-0 left-0 bottom-0 bg-surface border-r border-border-light z-[--z-sticky]",
        "transition-all duration-[--duration-slow] ease-[--ease-out]",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 h-16 border-b border-border-light shrink-0",
          collapsed && "justify-center px-0"
        )}
      >
        <Image
          src="/logo.png"
          alt="DrinkIT"
          width={32}
          height={32}
          className="rounded-[--radius-sm] shrink-0"
        />
        {!collapsed && (
          <span className="text-lg font-heading font-bold text-primary animate-fade-in">
            DrinkIT
          </span>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-[--radius-md] transition-all duration-[--duration-normal] group",
                isActive
                  ? "bg-primary-50 text-primary dark:bg-primary/10"
                  : "text-text-secondary hover:bg-gray-50 hover:text-text-primary dark:hover:bg-white/5",
                collapsed && "justify-center px-0"
              )}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full animate-scale-in" />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                className="shrink-0 transition-all"
              />
              {!collapsed && (
                <span
                  className={cn(
                    "text-sm truncate",
                    isActive ? "font-semibold" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
              )}
              {/* Badge */}
              {item.badge && item.badge > 0 && (
                <span
                  className={cn(
                    "bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center",
                    collapsed
                      ? "absolute top-1 right-1 h-4 min-w-4 px-1"
                      : "ml-auto h-5 min-w-5 px-1.5"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-border-light" />

        {/* Secondary Nav */}
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[--radius-md] transition-all duration-[--duration-normal]",
                isActive
                  ? "bg-primary-50 text-primary dark:bg-primary/10"
                  : "text-text-secondary hover:bg-gray-50 hover:text-text-primary dark:hover:bg-white/5",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} className="shrink-0" />
              {!collapsed && (
                <span className={cn("text-sm truncate", isActive ? "font-semibold" : "font-medium")}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Collapse Toggle + Logout */}
      <div className="border-t border-border-light px-3 py-3 space-y-1 shrink-0">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[--radius-md] text-text-secondary hover:bg-gray-50 hover:text-text-primary dark:hover:bg-white/5 transition-all w-full"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={20} className="shrink-0 mx-auto" />
          ) : (
            <>
              <ChevronLeft size={20} className="shrink-0" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
        <button
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-[--radius-md] text-error hover:bg-error-light dark:hover:bg-error/10 transition-all w-full",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
