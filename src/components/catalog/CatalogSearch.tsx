import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../../data/data";
import { Input } from "../ui";

export const productSearchText = (product: Product) => `${product.name} ${product.category} ${product.description} ${product.specs.join(" ")}`.toLowerCase();

export default function CatalogSearch({ products, initialQuery = "", onSearch }: { products: Product[]; initialQuery?: string; onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const suggestions = query.trim()
    ? products.filter((product) => query.toLowerCase().trim().split(/\s+/).every((term) => productSearchText(product).includes(term))).slice(0, 5)
    : [];
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const submit = (value = query) => {
    const trimmed = value.trim();
    onSearch?.(trimmed);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative w-full max-w-xl">
      <form onSubmit={(event) => { event.preventDefault(); submit(); }}>
        <Search className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted" size={17} />
        <Input value={query} onFocus={() => setOpen(true)} onChange={(event) => { const value = event.target.value; setQuery(value); setOpen(true); if (!value.trim()) submit(""); }} onKeyDown={(event) => { if (event.key === "Escape") { setQuery(""); submit(""); } }} placeholder="Search products, categories, or brands..." aria-label="Search catalog" className="rounded-[14px] pl-10 pr-4" />
      </form>
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-[14px] border border-border bg-white p-1 shadow-card">
          {suggestions.map((product) => (
            <button key={product.id} type="button" className="flex w-full items-center gap-3 rounded-[14px] px-3 py-2 text-left hover:bg-soft" onClick={() => submit(product.name)}>
              <span className="text-xs font-semibold text-navy">{product.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
