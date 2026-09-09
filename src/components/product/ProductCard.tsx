import { getRetailerLinks, type Product } from "../../data/data";
import { Badge } from "../ui";
import { useWishlist } from "../../context/WishlistContext";
import { Heart, ChevronDown } from "lucide-react";

export default function ProductCard({
  product,
  horizontal = false,
}: {
  product: Product;
  horizontal?: boolean;
}) {
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);
  return (
    <article
      className={`group flex h-[362px] shrink-0 flex-col overflow-hidden rounded-[12px] border border-border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-card dark:border-slate-700 dark:bg-slate-900 ${
        horizontal ? "w-[196px] sm:w-[210px]" : ""
      }`}
    >
      {/* Product image */}
      <div className="relative block h-[164px] w-full shrink-0 overflow-hidden bg-slate-50 p-3 dark:bg-slate-800">
        <img
        className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03] dark:mix-blend-normal"
          src={product.image}
          alt={product.name}
        />

        <div className="absolute left-3 top-3 flex items-center gap-2">

          {product.featured && <Badge className="bg-webzark text-white">Editor's pick</Badge>}
        </div>
        <button
          type="button"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => wishlist.toggle(product.id)}
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-lg shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark ${saved ? "bg-webzark text-white" : "bg-white/95 text-navy"}`}
        >
          <Heart size={16} strokeWidth={2} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      {/* Product content */}
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-2.5">
        {/* Category */}
        <p className="mb-1 shrink-0 text-[9px] font-bold uppercase leading-3 text-webzark">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="product-card-title shrink-0 font-display text-sm font-bold leading-5 text-navy dark:text-white sm:text-base">
          {product.name}
        </h3>

        {/* Description */}
        <p className="product-card-description my-2 line-clamp-2 min-h-0 text-xs leading-5 text-muted dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <strong className="font-display text-base leading-5 text-navy dark:text-white sm:text-lg">
            ${product.price}
            <small className="font-sans text-[9px] font-normal text-muted"> USD</small>
          </strong>
          <span className={`text-right text-[10px] leading-4 ${product.stock > 0 ? "text-success" : "text-muted"}`}>
            {product.stock > 0 ? `In stock (${product.stock})` : "Check retailer"}
          </span>
        </div>
        <details className="relative mt-2">
          <summary className="flex h-9 w-full cursor-pointer list-none items-center justify-center gap-1 rounded-[9px] bg-webzark px-2 py-1 text-[10px] font-bold text-white transition hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark">
            View retailers <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <div className="absolute bottom-10 left-0 right-0 z-10 overflow-hidden rounded-[10px] border border-border bg-white p-1 shadow-card dark:border-slate-700 dark:bg-slate-800">
            {getRetailerLinks(product).map((retailer) => (
              <a
                key={retailer.name}
                className="block rounded-[8px] px-3 py-2 text-center text-xs font-bold text-navy hover:bg-blue-50 hover:text-webzark dark:text-white dark:hover:bg-slate-700"
                href={retailer.url}
                target="_blank"
                rel="noreferrer"
              >
                {retailer.name}
              </a>
            ))}
          </div>
        </details>
      </div>
    </article>
  );
}