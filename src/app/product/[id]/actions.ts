"use server";

import prisma from "@/lib/prisma";

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
}
