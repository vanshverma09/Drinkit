import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  brand?: string;
  price: number;
  mrp: number;
  image: string;
  volume?: string;
  category?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set({ items: get().items.filter(item => item.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      items: get().items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    });
  },
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
}));
