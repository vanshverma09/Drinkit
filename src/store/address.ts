import { create } from 'zustand';

export type Address = {
  id: number;
  type: string;
  text: string;
};

export const savedAddresses: Address[] = [
  { id: 1, type: "Home", text: "14B, 3rd Floor, Green Enclave, Sector 45" },
  { id: 2, type: "Work", text: "Tech Park, Building C, Floor 8" },
  { id: 3, type: "Other", text: "Apt 204, Rosewood Apartments, Main Road" },
];

interface AddressStore {
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  selectedAddress: savedAddresses[0],
  setSelectedAddress: (address) => set({ selectedAddress: address }),
}));
