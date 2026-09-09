import { useMemo, useState } from "react";
import {
  Heart,
  SlidersHorizontal,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { products } from "../../data/data";
import { useWishlist } from "../../context/WishlistContext";
import ProductGrid from "../../components/catalog/ProductGrid";

type SortOption = "recent" | "price-low" | "price-high";

export default function Wishlist() {
  const wishlist = useWishlist();
  const [sort, setSort] = useState<SortOption>("recent");
  const savedProducts = useMemo(() => {
    const saved = products.filter((product) => wishlist.has(product.id));
    if (sort === "price-low")
      return [...saved].sort((a, b) => a.price - b.price);
    if (sort === "price-high")
      return [...saved].sort((a, b) => b.price - a.price);
    return saved;
  }, [sort, wishlist.ids]);
  const recommendations = products
    .filter((product) => !wishlist.has(product.id))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-ink dark:bg-slate-950 dark:text-slate-100">
      <section className="border-b border-border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-[1780px] flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">

            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-[-.04em] text-navy dark:text-white sm:text-3xl">
                My Wishlist{" "}
                <span className="text-lg font-medium text-muted dark:text-slate-400">
                  ({wishlist.count} items)
                </span>
              </h1>
              <p className="mt-1 text-xs text-muted dark:text-slate-400">
                Your saved items, all in one place.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-3 text-xs dark:border-slate-700 dark:bg-slate-800">

            <span>
              <strong className="block text-[11px] text-navy dark:text-white">
                Save what you love
              </strong>
              <span className="text-[10px] text-muted dark:text-slate-400">
                Keep useful products close while you compare.
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-[1780px] items-center justify-between gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex shrink-0 items-center gap-6"
            aria-label="Wishlist filters"
          >
            <span className="border-b-2 border-webzark px-1 py-3 text-[11px] font-bold text-webzark">
              All items ({wishlist.count})
            </span>
            <span className="px-1 py-3 text-[11px] font-semibold text-muted dark:text-slate-400">
              In stock ({savedProducts.length})
            </span>
            <span className="px-1 py-3 text-[11px] font-semibold text-muted dark:text-slate-400">
              Top picks (
              {
                products.filter(
                  (product) => wishlist.has(product.id) && product.featured,
                ).length
              }
              )
            </span>
          </nav>
          <label className="flex shrink-0 items-center gap-2 py-2 text-[10px] font-bold text-navy dark:text-slate-200">
            Sort by
            <span className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="appearance-none rounded-[6px] border border-border bg-white py-2 pl-3 pr-8 text-[10px] font-semibold outline-none focus:border-webzark dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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

      <section className="mx-auto max-w-[1780px] px-4 py-4 sm:px-6 lg:px-8">
        {savedProducts.length ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs text-muted dark:text-slate-400">
                {savedProducts.length} products ready to compare
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-webzark lg:hidden"
              >
                <SlidersHorizontal size={14} aria-hidden="true" /> Filters
              </button>
            </div>
            <ProductGrid products={savedProducts} />
          </>
        ) : (
          <div className="rounded-[10px] border border-dashed border-border bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <Heart
              className="mx-auto text-rose-400"
              size={34}
              aria-hidden="true"
            />
            <h2 className="mt-4 font-display text-2xl font-extrabold text-navy dark:text-white">
              Your wishlist is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
              Save products while you compare them, then use the retailer link
              when you are ready.
            </p>
            <a
              className="mt-6 inline-flex rounded-[7px] bg-webzark px-5 py-3 text-sm font-bold text-white hover:bg-webzark-dark"
              href="/products"
            >
              Browse products
            </a>
          </div>
        )}
      </section>

      {recommendations.length > 0 && (
        <section className="border-t border-border bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-[1780px] px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-base font-extrabold text-navy dark:text-white">
                  You may also like
                </h2>
                <p className="mt-1 text-[10px] text-muted dark:text-slate-400">
                  Based on your saved products
                </p>
              </div>
              <a
                className="inline-flex items-center gap-1 text-[10px] font-bold text-webzark"
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
