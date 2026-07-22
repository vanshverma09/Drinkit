import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { products } from '../src/data/dummy'; // adjust path if necessary

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with DrinkIT products...');

  // Clear existing products to prevent duplicates on re-seed
  await prisma.product.deleteMany({});
  console.log('Cleared existing products.');

  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        volume: p.volume,
        price: p.price,
        mrp: p.mrp,
        discount: p.discount || null,
        image: p.image,
        stock: 100, // default stock
      }
    });
    console.log(`Added ${p.name}`);
  }

  console.log('Seeding complete! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
