"use client";

import { create } from "zustand";
import type { CartItem } from "./types";
import { getProduct } from "./data";

interface CartStore {
  items: CartItem[];
  cartOpen: boolean;
  menuOpen: boolean;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useStore = create<CartStore>((set, get) => ({
  items: [],
  cartOpen: false,
  menuOpen: false,

  add: (productId, qty = 1) =>
    set((state) => {
      const found = state.items.find((i) => i.productId === productId);
      if (found) {
        return {
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return { items: [...state.items, { productId, qty }] };
    }),

  setQty: (productId, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((i) => i.productId !== productId)
          : state.items.map((i) =>
              i.productId === productId ? { ...i, qty } : i
            ),
    })),

  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),

  count: () => get().items.reduce((s, i) => s + i.qty, 0),

  subtotal: () =>
    get().items.reduce(
      (s, i) => s + i.qty * (getProduct(i.productId)?.price ?? 0),
      0
    ),
}));
