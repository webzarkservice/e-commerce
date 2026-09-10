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
      className={`product-card group flex h-[326px] shrink-0 flex-col overflow-hidden rounded-[14px] border border-border/90 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-card dark:border-slate-700 dark:bg-slate-900 lg:h-[326px] ${
        horizontal ? "w-[178px] sm:w-[196px]" : "w-full min-w-0 lg:w-4/5 lg:justify-self-center"
      }`}
    >
      {/* Product image */}
      <div className="relative block h-[132px] w-full shrink-0 overflow-hidden bg-soft p-3 dark:bg-slate-800 sm:h-[144px] lg:h-[132px]">
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
          className={`absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full text-lg shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 sm:h-8 sm:w-8 ${saved ? "bg-webzark text-white" : "bg-white text-navy"}`}
        >
          <Heart size={16} strokeWidth={2} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      {/* Product content */}
      <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-3.5 lg:p-3.5">
        {/* Category */}
        <p className="mb-1 shrink-0 text-[10px] font-bold uppercase leading-4 tracking-[.08em] text-webzark">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="product-card-title shrink-0 font-display text-sm font-bold leading-5 text-navy dark:text-white">{product.name}</h3>

        {/* Description */}
        <p className="product-card-description my-1.5 line-clamp-2 min-h-0 text-xs leading-[1.35rem] text-muted dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <strong className="tabular-nums font-display text-[1.05rem] leading-5 text-navy dark:text-white">
            ${product.price}
            <small className="font-sans text-[10px] font-normal text-muted"> USD</small>
          </strong>
          <span className={`text-right text-[10px] leading-4 ${product.stock > 0 ? "text-success" : "text-muted"}`}>
            {product.stock > 0 ? `In stock (${product.stock})` : "Check retailer"}
          </span>
        </div>
        <details className="relative mt-2">
          <summary className="flex h-11 w-full cursor-pointer list-none items-center justify-center gap-1 rounded-[10px] bg-webzark px-2 py-1 text-xs font-bold text-white shadow-button transition hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 sm:h-9">
            View retailers <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <div className="absolute bottom-12 left-0 right-0 z-10 overflow-hidden rounded-[12px] border border-border bg-white p-1.5 shadow-card sm:bottom-10 dark:border-slate-700 dark:bg-slate-800">
            {getRetailerLinks(product).map((retailer) => (
              <a
                key={retailer.name}
                className="flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-xs font-bold text-navy hover:bg-blue-50 hover:text-webzark dark:text-white dark:hover:bg-slate-700"
                href={retailer.url}
                target="_blank"
                rel="noreferrer"
              >
                <img className="h-4 w-4 shrink-0 object-contain" src={retailer.logo} alt="" aria-hidden="true" />
                {retailer.name}
              </a>
            ))}
          </div>
        </details>
      </div>
    </article>
  );
}
