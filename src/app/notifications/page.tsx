"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Bell, Tag, Package, CreditCard, 
  Megaphone, CheckCheck, Trash2, Clock, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy Notification Data
const initialNotifications = [
  {
    id: "n1",
    type: "offer",
    title: "50% OFF on Energy Drinks! ⚡",
    message: "Use code ENERGY50 at checkout to get flat 50% off up to ₹100 on all energy drinks. Valid till midnight.",
    time: "10 mins ago",
    dateGroup: "Today",
    isRead: false,
    icon: Tag,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10"
  },
  {
    id: "n2",
    type: "order",
    title: "Order Delivered Successfully! 🎉",
    message: "Your order #ORD-8392104 has been delivered. We hope you enjoy your drinks!",
    time: "2 hours ago",
    dateGroup: "Today",
    isRead: false,
    icon: Package,
    color: "text-primary",
    bg: "bg-green-50 dark:bg-green-500/10"
  },
  {
    id: "n3",
    type: "payment",
    title: "Payment Received",
    message: "Payment of ₹345 was successful for your recent order via UPI.",
    time: "2 hours ago",
    dateGroup: "Today",
    isRead: true,
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10"
  },
  {
    id: "n4",
    type: "announcement",
    title: "Introducing DrinkIT Pro 👑",
    message: "Get free delivery on all orders and exclusive access to flash sales. Subscribe now for just ₹99/month.",
    time: "Yesterday, 10:00 AM",
    dateGroup: "Yesterday",
    isRead: true,
    icon: Megaphone,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-500/10"
  },
  {
    id: "n5",
    type: "order",
    title: "Order Cancelled",
    message: "Order #ORD-5392101 was cancelled due to store unavailability. Refund initiated.",
    time: "05 Jul, 09:20 PM",
    dateGroup: "Older",
    isRead: true,
    icon: Package,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/10"
  }
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "offer", label: "Offers" },
  { id: "order", label: "Orders" },
  { id: "payment", label: "Payments" },
  { id: "announcement", label: "Announcements" }
];

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    ));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(
    n => activeTab === "all" || n.type === activeTab
  );

  // Group filtered notifications by dateGroup
  const groupedNotifications = filteredNotifications.reduce((acc, current) => {
    if (!acc[current.dateGroup]) {
      acc[current.dateGroup] = [];
    }
    acc[current.dateGroup].push(current);
    return acc;
  }, {} as Record<string, typeof initialNotifications>);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-8">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-semibold text-gray-900 dark:text-gray-100 text-lg">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={cn(
              "p-2 rounded-full transition-colors",
              unreadCount > 0 
                ? "text-primary hover:bg-green-50 dark:hover:bg-green-500/10" 
                : "text-gray-400 opacity-50 cursor-not-allowed"
            )}
            title="Mark all as read"
          >
            <CheckCheck className="w-5 h-5" />
          </button>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-3 gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab.id 
                  ? "text-white" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeFilterTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Notifications List ── */}
      <div className="px-4 mt-4 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All caught up!</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                You have no {activeTab !== "all" ? activeTab : ""} notifications at the moment.
              </p>
            </motion.div>
          ) : (
            Object.entries(groupedNotifications).map(([group, groupNotifs]) => (
              <div key={group} className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-1">
                  {group}
                </h3>
                <AnimatePresence mode="popLayout">
                  {groupNotifs.map((notification, i) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30, delay: i * 0.05 }}
                      className={cn(
                        "relative bg-white dark:bg-card rounded-2xl p-4 border transition-all",
                        notification.isRead 
                          ? "border-gray-100 dark:border-gray-800 shadow-sm opacity-70 hover:opacity-100" 
                          : "border-primary/20 shadow-md ring-1 ring-primary/10"
                      )}
                    >
                      {/* Unread Indicator */}
                      {!notification.isRead && (
                        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                          notification.bg,
                          notification.color
                        )}>
                          <notification.icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1 pr-4">
                          <h4 className={cn(
                            "font-semibold text-gray-900 dark:text-white mb-1",
                            !notification.isRead && "font-bold text-gray-900 dark:text-white"
                          )}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 dark:text-gray-500 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {notification.time}
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-50 dark:border-gray-800/50">
                        <button 
                          onClick={() => toggleReadStatus(notification.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors",
                            notification.isRead 
                              ? "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" 
                              : "text-primary hover:bg-green-50 dark:hover:bg-green-500/10"
                          )}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {notification.isRead ? "Mark Unread" : "Mark Read"}
                        </button>
                        <button 
                          onClick={() => removeNotification(notification.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
