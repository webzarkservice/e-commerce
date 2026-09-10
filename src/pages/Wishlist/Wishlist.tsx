import { useMemo, useState } from "react";
import { Heart, ArrowRight, ChevronDown } from "lucide-react";
import { products } from "../../data/data";
import { useWishlist } from "../../context/WishlistContext";
import ProductGrid from "../../components/catalog/ProductGrid";

type SortOption = "recent" | "price-low" | "price-high";
type WishlistFilter = "all" | "stock" | "top";

export default function Wishlist() {
  const wishlist = useWishlist();
  const [sort, setSort] = useState<SortOption>("recent");
  const [filter, setFilter] = useState<WishlistFilter>("all");
  const saved = useMemo(() => products.filter((product) => wishlist.ids.includes(product.id)), [wishlist.ids]);
  const inStockCount = saved.filter((product) => product.stock > 0).length;
  const topPicksCount = saved.filter((product) => product.featured).length;
  const savedProducts = useMemo(() => {
    const filtered = filter === "stock"
      ? saved.filter((product) => product.stock > 0)
      : filter === "top"
        ? saved.filter((product) => product.featured)
        : saved;
    if (sort === "price-low")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high")
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [filter, saved, sort]);
  const recommendations = products
    .filter((product) => !wishlist.has(product.id))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-ink dark:bg-slate-950 dark:text-slate-100">
      <section className="border-b border-border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">

            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-[-.04em] text-navy dark:text-white sm:text-3xl">
                My Wishlist{" "}
                <span className="text-lg font-medium text-muted dark:text-slate-400">
                  ({wishlist.count} items)
                </span>
              </h1>
              <p className="mt-2 text-sm text-muted dark:text-slate-400">
                Your saved items, all in one place.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[12px] border border-blue-100 bg-blue-50 px-4 py-3 text-xs dark:border-slate-700 dark:bg-slate-800">

            <span>
              <strong className="block text-xs text-navy dark:text-white">
                Save what you love
              </strong>
              <span className="text-xs text-muted dark:text-slate-400">
                Keep useful products close while you compare.
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-1 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-1" aria-label="Wishlist filters">
            {[
              ["all", `All items (${wishlist.count})`],
              ["stock", `In stock (${inStockCount})`],
              ["top", `Top picks (${topPicksCount})`],
            ].map(([value, label]) => <button key={value} type="button" onClick={() => setFilter(value as WishlistFilter)} aria-pressed={filter === value} className={`min-h-11 shrink-0 rounded-[10px] px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark ${filter === value ? "bg-blue-50 text-webzark dark:bg-slate-800" : "text-muted hover:bg-slate-50 hover:text-navy dark:hover:bg-slate-800"}`}>{label}</button>)}
          </nav>
          <label className="flex min-h-11 items-center justify-between gap-2 py-2 text-xs font-bold text-navy dark:text-slate-200 sm:shrink-0 sm:justify-start">
            Sort by
            <span className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
              className="min-h-11 appearance-none rounded-[10px] border border-border bg-white pl-3 pr-8 text-xs font-semibold outline-none focus:border-webzark focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="recent">Recently added</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted"
                size={13}
                aria-hidden="true"
              />
            </span>
          </label>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
        {savedProducts.length ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs text-muted dark:text-slate-400">
                {savedProducts.length} {filter === "all" ? "products" : filter === "stock" ? "in-stock products" : "top picks"} ready to compare
              </p>
            </div>
            <ProductGrid products={savedProducts} />
          </>
        ) : (
          <div className="rounded-[16px] border border-dashed border-border bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <Heart
              className="mx-auto text-rose-400"
              size={34}
              aria-hidden="true"
            />
            <h2 className="mt-4 font-display text-2xl font-extrabold text-navy dark:text-white">
              {wishlist.count ? "No products match this filter" : "Your wishlist is empty"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
              {wishlist.count ? "Choose another filter to see your saved products." : "Save products while you compare them, then use the retailer link when you are ready."}
            </p>
            {wishlist.count ? <button type="button" className="mt-6 inline-flex min-h-11 items-center rounded-[10px] bg-webzark px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2" onClick={() => setFilter("all")}>Show all saved products</button> : <a className="mt-6 inline-flex min-h-11 items-center rounded-[10px] bg-webzark px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2" href="/products">Browse products</a>}
          </div>
        )}
      </section>

      {recommendations.length > 0 && (
        <section className="border-t border-border bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-base font-extrabold text-navy dark:text-white">
                  You may also like
                </h2>
                <p className="mt-1 text-xs text-muted dark:text-slate-400">
                  Based on your saved products
                </p>
              </div>
              <a
                className="inline-flex items-center gap-1 text-xs font-bold text-webzark"
                href="/products"
              >
                View all <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
            <ProductGrid products={recommendations} horizontal />
          </div>
        </section>
      )}
    </main>
  );
}
