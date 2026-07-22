"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, Search, Filter, Receipt, Star, 
  RotateCcw, ChevronRight, Package, XCircle, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy Order Data
const dummyOrders = [
  {
    id: "ORD-8392104",
    status: "current",
    date: "Today, 10:00 AM",
    total: 345,
    items: [
      { name: "Coca Cola Classic", qty: 2 },
      { name: "Red Bull Energy", qty: 1 }
    ],
    eta: "12 mins",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "ORD-7392103",
    status: "completed",
    date: "14 Jul 2026, 04:30 PM",
    total: 890,
    items: [
      { name: "Orange Juice", qty: 3 },
      { name: "Mineral Water", qty: 2 },
      { name: "Diet Coke", qty: 1 }
    ],
    rating: 5,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "ORD-6392102",
    status: "completed",
    date: "10 Jul 2026, 11:15 AM",
    total: 450,
    items: [
      { name: "Monster Energy", qty: 2 },
      { name: "Gatorade Blue", qty: 2 }
    ],
    rating: 0,
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "ORD-5392101",
    status: "cancelled",
    date: "05 Jul 2026, 09:20 PM",
    total: 220,
    items: [
      { name: "Sparkling Water", qty: 4 }
    ],
    cancelReason: "Store closed",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=150&auto=format&fit=crop"
  }
];

const tabs = [
  { id: "all", label: "All" },
  { id: "current", label: "Current" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = dummyOrders.filter(
    order => activeTab === "all" || order.status === activeTab
  );

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
            <h1 className="font-heading font-semibold text-gray-900 dark:text-gray-100 text-lg">
              My Orders
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Animated Tabs ── */}
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-3 gap-2">
          {tabs.map((tab) => (
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
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Order List ── */}
      <div className="px-4 mt-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No orders found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                You don't have any {activeTab !== "all" ? activeTab : ""} orders yet.
              </p>
            </motion.div>
          ) : (
            filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white dark:bg-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                {/* Status Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    {order.status === "current" && <Clock className="w-4 h-4 text-primary animate-pulse" />}
                    {order.status === "completed" && <Package className="w-4 h-4 text-green-500" />}
                    {order.status === "cancelled" && <XCircle className="w-4 h-4 text-red-500" />}
                    
                    <span className={cn(
                      "text-sm font-semibold capitalize",
                      order.status === "current" && "text-primary",
                      order.status === "completed" && "text-green-500",
                      order.status === "cancelled" && "text-red-500"
                    )}>
                      {order.status === "current" ? "Arriving in " + order.eta : order.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{order.date}</span>
                </div>

                {/* Order Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                    <Image 
                      src={order.image} 
                      alt="Order Items" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {order.id}
                      </h3>
                      <span className="font-bold text-gray-900 dark:text-white">
                        ₹{order.total}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {order.items.map(item => `${item.qty}x ${item.name}`).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-2">
                  {order.status === "current" && (
                    <button 
                      onClick={() => router.push("/tracking")}
                      className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Track Order
                    </button>
                  )}
                  
                  {order.status !== "current" && (
                    <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reorder
                    </button>
                  )}

                  {order.status === "completed" && order.rating === 0 && (
                    <button className="flex-1 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />
                      Rate Order
                    </button>
                  )}

                  <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Receipt className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
