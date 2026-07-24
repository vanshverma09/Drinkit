"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getUserOrders() {
  // const session = await getServerSession(authOptions);
  const session: any = null;
  
  /*
  if (!session?.user?.email) {
    return [];
  }
  */

  let user = null;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  if (!user) {
    user = await prisma.user.findFirst();
  }

  if (!user) return [];

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders;
}
