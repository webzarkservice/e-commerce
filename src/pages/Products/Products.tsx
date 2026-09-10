import { useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { products } from "../../data/data";
import ProductGrid from "../../components/catalog/ProductGrid";

const categories = Array.from(new Set(products.map((product) => product.category)));
const maxCatalogPrice = Math.max(...products.map((product) => product.price));
type SortOption = "featured" | "price-low" | "price-high" | "name";

function FilterPanel({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  featuredOnly,
  setFeaturedOnly,
  inStockOnly,
  setInStockOnly,
}: {
  category: string;
  setCategory: (value: string) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (value: boolean) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-muted dark:text-slate-400">Category</p>
        <div className="space-y-1">
          <button type="button" onClick={() => setCategory("All products")} className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-left text-sm ${category === "All products" ? "bg-blue-50 font-bold text-webzark dark:bg-slate-800" : "text-navy hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}>
            All products <span className="text-xs text-muted">{products.length}</span>
          </button>
          {categories.map((item) => {
            const count = products.filter((product) => product.category === item).length;
            return (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-left text-sm ${category === item ? "bg-blue-50 font-bold text-webzark dark:bg-slate-800" : "text-navy hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}>
                {item} <span className="text-xs text-muted">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border pt-5 dark:border-slate-700">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-muted dark:text-slate-400">Price range</p>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-muted">From
            <input type="number" min={0} max={maxPrice} value={minPrice} onChange={(event) => setMinPrice(Number(event.target.value))} className="mt-1 w-full rounded-[8px] border border-border bg-page px-2 py-2 text-sm text-navy outline-none focus:border-webzark dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
          <label className="text-xs text-muted">To
            <input type="number" min={0} max={maxCatalogPrice} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-1 w-full rounded-[8px] border border-border bg-page px-2 py-2 text-sm text-navy outline-none focus:border-webzark dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </label>
        </div>
      </div>

      <div className="border-t border-border pt-5 dark:border-slate-700">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-muted dark:text-slate-400">Availability</p>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-navy dark:text-slate-200">
          <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} className="sr-only" />
          <span className={`grid h-4 w-4 place-items-center rounded border ${inStockOnly ? "border-webzark bg-webzark text-white" : "border-slate-300 dark:border-slate-600"}`} aria-hidden="true">{inStockOnly && <Check size={12} />}</span>
          In stock
        </label>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-navy dark:text-slate-200">
          <input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} className="sr-only" />
          <span className={`grid h-4 w-4 place-items-center rounded border ${featuredOnly ? "border-webzark bg-webzark text-white" : "border-slate-300 dark:border-slate-600"}`} aria-hidden="true">{featuredOnly && <Check size={12} />}</span>
          Featured picks
        </label>
      </div>
    </div>
  );
}

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxCatalogPrice);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const perPage = 12;

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery))
        && (category === "All products" || product.category === category)
        && product.price >= minPrice
        && product.price <= maxPrice
        && (!featuredOnly || product.featured)
        && (!inStockOnly || product.stock > 0)
      );
    });
    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [category, featuredOnly, inStockOnly, maxPrice, minPrice, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const currentPage = Math.min(page, pageCount);
  const pageProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);
  const setFilter = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };
  const clearFilters = () => {
    setQuery("");
    setCategory("All products");
    setMinPrice(0);
    setMaxPrice(maxCatalogPrice);
    setFeaturedOnly(false);
    setInStockOnly(false);
    setSort("featured");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-page text-ink dark:bg-slate-950 dark:text-slate-100">
      <section className="border-b border-border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-[-.04em] text-navy dark:text-white">Browse products</h1>
              <p className="mt-2 text-sm text-muted dark:text-slate-400">Compare useful hardware, then buy from the retailer you trust.</p>
            </div>
            <label className="relative w-full max-w-2xl">
              <span className="sr-only">Search products</span>
              <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search products, categories, or use cases" className="h-12 w-full rounded-[10px] border border-border bg-page pl-11 pr-4 text-sm text-navy outline-none transition placeholder:text-muted focus:border-webzark focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setMobileFiltersOpen((open) => !open)} className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border bg-white px-3 text-xs font-bold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark dark:border-slate-700 dark:bg-slate-900 dark:text-white lg:hidden">
              <SlidersHorizontal size={15} /> Filters
            </button>
            <span className="text-xs text-muted dark:text-slate-400">{filteredProducts.length} results</span>
          </div>
          <label className="flex min-h-11 items-center gap-2 text-xs font-bold text-navy dark:text-slate-200">
            Sort by
            <select value={sort} onChange={(event) => setFilter(setSort, event.target.value as SortOption)} className="min-h-11 rounded-[10px] border border-border bg-white px-3 text-xs font-semibold outline-none focus:border-webzark focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900">
              <option value="featured">Featured first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        <div className={`mb-5 rounded-[14px] border border-border bg-white p-4 dark:border-slate-700 dark:bg-slate-900 lg:hidden ${mobileFiltersOpen ? "block" : "hidden"}`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-bold text-navy dark:text-white">Filters</h2>
            <button type="button" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} className="grid h-11 w-11 place-items-center text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark"><X size={18} /></button>
          </div>
          <FilterPanel {...{ category, setCategory: (value: string) => setFilter(setCategory, value), minPrice, setMinPrice: (value: number) => setFilter(setMinPrice, value), maxPrice, setMaxPrice: (value: number) => setFilter(setMaxPrice, value), featuredOnly, setFeaturedOnly: (value: boolean) => setFilter(setFeaturedOnly, value), inStockOnly, setInStockOnly: (value: boolean) => setFilter(setInStockOnly, value) }} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden rounded-[16px] border border-border bg-white p-5 lg:block dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display font-bold text-navy dark:text-white">Filters</h2>
              <button type="button" onClick={clearFilters} className="text-xs font-bold text-webzark hover:underline">Clear all</button>
            </div>
            <FilterPanel {...{ category, setCategory: (value: string) => setFilter(setCategory, value), minPrice, setMinPrice: (value: number) => setFilter(setMinPrice, value), maxPrice, setMaxPrice: (value: number) => setFilter(setMaxPrice, value), featuredOnly, setFeaturedOnly: (value: boolean) => setFilter(setFeaturedOnly, value), inStockOnly, setInStockOnly: (value: boolean) => setFilter(setInStockOnly, value) }} />
          </aside>
          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-[-.03em] text-navy dark:text-white">Compare your shortlist</h2>
                <p className="mt-2 text-sm text-muted dark:text-slate-400">Save favorites with the heart, then open a retailer link to purchase.</p>
              </div>
              <button type="button" onClick={clearFilters} className="hidden text-xs font-bold text-webzark hover:underline sm:block">Reset filters</button>
            </div>
            <ProductGrid products={pageProducts} emptyTitle="No matching products" emptyText="Try a different search or clear a filter." />
            {pageCount > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Product pages">
                <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => value - 1)} className="grid h-9 w-9 place-items-center rounded-[8px] border border-border text-navy disabled:opacity-40 dark:border-slate-700 dark:text-white"><ChevronLeft size={16} /></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((item) => (
                  <button key={item} type="button" onClick={() => setPage(item)} className={`grid h-9 w-9 place-items-center rounded-[8px] text-xs font-bold ${item === currentPage ? "bg-webzark text-white" : "border border-border text-navy hover:border-webzark dark:border-slate-700 dark:text-white"}`}>{item}</button>
                ))}
                <button type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => value + 1)} className="grid h-9 w-9 place-items-center rounded-[8px] border border-border text-navy disabled:opacity-40 dark:border-slate-700 dark:text-white"><ChevronRight size={16} /></button>
              </nav>
            )}
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted dark:border-slate-800 dark:text-slate-400">Affiliate disclosure: Webzark Marketplace may earn a commission when you buy through a retailer link. Prices and availability can change on the retailer site.</p>
      </section>
    </main>
  );
}
