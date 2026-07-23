import 'dotenv/config';
import prisma from '../src/lib/prisma';

const GOOGLE_API_KEY = "AIzaSyDY9Jt_FABpRUNTHmNQVQmKkr12__-SVNM";
const SEARCH_ENGINE_ID = "e1eab0da5b4914a5c";

async function fetchImageForProduct(query: string): Promise<string | null> {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query + ' bottle')}&cx=${SEARCH_ENGINE_ID}&key=${GOOGLE_API_KEY}&searchType=image&num=1`;
    const response = await fetch(url);
    const data: any = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].link; // Return the first image URL
    } else {
      console.log(`[Google API Debug] No items. Full response:`, JSON.stringify(data));
    }
    return null;
  } catch (error) {
    console.error(`Error fetching image for ${query}:`, error);
    return null;
  }
}

async function updateAllProductImages() {
  console.log("Starting automatic image fetcher...");
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    // Only update if it's a local dummy image (starts with /) or empty
    if (!product.image || product.image.startsWith('/')) {
      console.log(`Fetching real image for: ${product.brand} ${product.name}...`);
      
      const imageUrl = await fetchImageForProduct(`${product.brand} ${product.name}`);
      
      if (imageUrl) {
        await prisma.product.update({
          where: { id: product.id },
          data: { image: imageUrl }
        });
        console.log(`✅ Updated ${product.name} with image: ${imageUrl}`);
      } else {
        console.log(`❌ Could not find image for ${product.name}`);
      }
      
      // Sleep for 500ms to avoid hitting API rate limits too quickly
      await new Promise(resolve => setTimeout(resolve, 500));
    } else {
      console.log(`⏭️ Skipping ${product.name}, already has real image.`);
    }
  }
  
  console.log("Finished updating all images!");
}

updateAllProductImages()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
