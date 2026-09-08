import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type CartItems = Record<number, number>;
type CartContextValue = {
  items: CartItems;
  add: (id: number) => void;
  remove: (id: number) => void;
  clear: (id: number) => void;
  clearAll: () => void;
  count: (id: number) => number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "webzark-cart";

function readStoredCart(): CartItems {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return {};

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    if (error instanceof SyntaxError) return {};
    throw error;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

  return Object.entries(parsed).reduce<CartItems>((items, [id, quantity]) => {
    if (typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0) {
      items[Number(id)] = quantity;
    }
    return items;
  }, {});
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems>(readStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    add: (id: number) => setItems((current) => ({ ...current, [id]: (current[id] || 0) + 1 })),
    remove: (id: number) => setItems((current) => {
      const next = { ...current };
      if (!next[id] || next[id] === 1) delete next[id];
      else next[id] -= 1;
      return next;
    }),
    clear: (id: number) => setItems((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    }),
    clearAll: () => setItems({}),
    count: (id: number) => items[id] || 0,
    total: Object.values(items).reduce((sum, quantity) => sum + quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
