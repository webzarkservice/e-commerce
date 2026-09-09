import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type WishlistContextValue = {
  ids: number[];
  has: (id: number) => boolean;
  toggle: (id: number) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "webzark-wishlist";

function readWishlist(): number[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === "number" && Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>(readWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const value = useMemo(() => ({
    ids,
    has: (id: number) => ids.includes(id),
    toggle: (id: number) => setIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]),
    count: ids.length,
  }), [ids]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
