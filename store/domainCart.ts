import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DomainItem {
  id: string;
  name: string;
  price: number;
  termYears: number;
}

interface DomainCartState {
  items: DomainItem[];
  addItem: (item: DomainItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useDomainCart = create<DomainCartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.termYears, 0);
      },
    }),
    {
      name: 'domain-cart-storage',
    }
  )
);
