"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getLatestOrder() {
  const session = await getServerSession(authOptions);
  
  let user = null;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({ where: { email: session.user.email } });
  }

  if (!user) {
    user = await prisma.user.findFirst();
  }
  
  if (!user) return null;
  
  const order = await prisma.order.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { orderItems: true }
  });
  
  return order;
}
