"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    menuItemId: string;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
    removeFromCart: (menuItemId: string) => void;
    updateQuantity: (menuItemId: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: () => number;
    totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((i) => i.menuItemId === item.menuItemId);
                
                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.menuItemId === item.menuItemId
                                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                                : i
                        ),
                    });
                } else {
                    set({
                        items: [...currentItems, { ...item, id: crypto.randomUUID(), quantity: item.quantity || 1 }],
                    });
                }
            },
            removeFromCart: (menuItemId) => {
                set({ items: get().items.filter((i) => i.menuItemId !== menuItemId) });
            },
            updateQuantity: (menuItemId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(menuItemId);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.menuItemId === menuItemId ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            totalAmount: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            totalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'dinewise-cart',
        }
    )
);
