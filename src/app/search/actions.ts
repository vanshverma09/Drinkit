"use server";

import prisma from "@/lib/prisma";

export async function searchProducts(query: string, filter: string) {
  // If the dataset was huge, we'd do a Prisma query here like:
  // return await prisma.product.findMany({ where: { name: { contains: query } } })
  
  // Since our dataset is small, returning everything and letting the client filter
  // is faster for instant UI updates, or we can just return all.
  const allProducts = await prisma.product.findMany();
  return allProducts;
}
