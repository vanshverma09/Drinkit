export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  mrp: number;
  discount: string;
  imageUrl: string;
  weight: string;
  categoryId: string;
  inStock: boolean;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: "Home" | "Work" | "Other";
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
