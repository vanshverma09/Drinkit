import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  volume: string;
  image: string;
  isVeg: boolean;
  category: string;
  discount?: string;
  tag?: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (product) => {
        const items = get().items;
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      toggleWishlist: (product) => {
        const isExist = get().items.find(item => item.id === product.id);
        if (isExist) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },
      isInWishlist: (productId) => !!get().items.find(item => item.id === productId),
    }),
    {
      name: 'drinkit-wishlist',
    }
  )
);

