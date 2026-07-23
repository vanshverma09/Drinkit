"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function placeOrder(items: { id: string, quantity: number }[], address: string) {
  try {
    // 1. Verify User is Logged In
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "You must be logged in to place an order." };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return { success: false, error: "User not found." };
    }

    if (items.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }

    // 2. Fetch real prices securely from the database
    // (Never trust the prices sent from the client frontend!)
    let calculatedTotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id }
      });

      if (!product) {
        return { success: false, error: `Product not found: ${item.id}` };
      }

      calculatedTotal += (product.price * item.quantity);

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // Lock in the price at checkout
      });
    }

    // 3. Create the Order and OrderItems in one secure transaction
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: calculatedTotal,
        address: address || "Default Address",
        status: "PROCESSING",
        orderItems: {
          create: orderItemsData
        }
      }
    });

    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Order processing error:", error);
    return { success: false, error: "Failed to process order." };
  }
}
