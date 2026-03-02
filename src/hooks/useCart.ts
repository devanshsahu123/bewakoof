/**
 * useCart – lightweight localStorage-backed cart hook.
 *
 * Cart is stored as an array of CartItem objects under the key "siyapaa_cart".
 * Any component that calls this hook will react to changes made by other
 * components via the custom "cart-updated" window event.
 */

import { useState, useEffect, useCallback } from "react";

const CART_KEY = "siyapaa_cart";
const CART_EVENT = "cart-updated";

export interface CartItem {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    mrp: number;
    image: string;
    size: string;
    quantity: number;
}

/* ── helpers ──────────────────────────────────────────────── */

function readCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
}

function writeCart(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    // Notify all components on this page that the cart changed
    window.dispatchEvent(new Event(CART_EVENT));
}

/* ── hook ─────────────────────────────────────────────────── */

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Sync from localStorage on mount + when another component updates cart
    useEffect(() => {
        setCart(readCart());
        const sync = () => setCart(readCart());
        window.addEventListener(CART_EVENT, sync);
        window.addEventListener("storage", sync); // cross-tab sync
        return () => {
            window.removeEventListener(CART_EVENT, sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    /** Total number of individual items (sum of all quantities) */
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    /** Add or increment an item. If same id+size exists, increments quantity. */
    const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
        const current = readCart();
        const existingIdx = current.findIndex(
            (c) => c.id === item.id && c.size === item.size
        );
        if (existingIdx >= 0) {
            current[existingIdx].quantity += 1;
        } else {
            current.push({ ...item, quantity: 1 });
        }
        writeCart(current);
        setCart([...current]);
    }, []);

    /** Remove one item completely from the cart */
    const removeFromCart = useCallback((id: string, size: string) => {
        const updated = readCart().filter(
            (c) => !(c.id === id && c.size === size)
        );
        writeCart(updated);
        setCart(updated);
    }, []);

    return { cart, cartCount, addToCart, removeFromCart };
}
