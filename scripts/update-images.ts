import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { products } from '../src/data/dummy';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Updating product images from local dummy data...');
  for (const p of products) {
    try {
      await prisma.product.update({
        where: { id: p.id },
        data: { image: p.image },
      });
      console.log(`Updated ${p.name} -> ${p.image}`);
    } catch (e) {
      console.log(`Skipped ${p.name} (product ID not found)`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
