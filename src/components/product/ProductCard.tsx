import type { Product } from "../../data/data";
import { Badge, Button } from "../ui";

export default function ProductCard({
  product,
  quantity,
  onSelect,
  onAdd,
  onRemove,
  onBuy,
  delay = 0,
  horizontal = false,
}: {
  product: Product;
  quantity: number;
  onSelect: () => void;
  onAdd: () => void;
  onRemove: () => void;
  onBuy: () => void;
  delay?: number;
  horizontal?: boolean;
}) {
  return (
    <article
      data-aos={horizontal ? undefined : "fade-up"}
      data-aos-delay={horizontal ? undefined : delay}
      className={`group flex h-[329px] shrink-0 flex-col overflow-hidden rounded-[14px] border border-border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
        horizontal ? "w-[196px] sm:w-[210px]" : ""
      }`}
    >
      {/* Product image */}
      <button
        className="relative block h-[133px] w-full shrink-0 overflow-hidden bg-soft sm:h-[144px]"
        onClick={onSelect}
      >
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.name}
        />

        {product.featured && (
          <Badge className="absolute left-3 top-3 bg-webzark text-white">
            Featured
          </Badge>
        )}
      </button>

      {/* Product content */}
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-2.5">
        {/* Category */}
        <p className="mb-0.5 shrink-0 text-[8px] font-bold uppercase leading-3 text-webzark">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="product-card-title shrink-0 font-display text-[10px] font-bold leading-4 text-navy sm:text-xs">
          {product.name}
        </h3>

        {/* Description */}
        <p className="product-card-description my-1 line-clamp-2 min-h-0 text-[12px] leading-5 text-muted">
          {product.description}
        </p>

        {/* Price / stock */}
        <div className="my-1 flex shrink-0 flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
          <strong className="font-display text-sm leading-5 text-navy sm:text-base">
            ${product.price}
            <small className="font-sans text-[9px] font-normal text-muted">
              {" "}
              USD
            </small>
          </strong>

          <span className="text-[10px] leading-4 text-success">
            <i className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success" />
            {product.stock} in stock
          </span>
        </div>

        {/* View details */}
        <a
          className="mb-1 block shrink-0 text-[10px] font-bold leading-4 text-webzark hover:text-webzark-dark"
          href={`/product?id=${product.id}`}
        >
          View details
        </a>

        {/* Actions */}
        <div className="mt-auto shrink-0">
          {quantity ? (
            <div className="flex h-8 gap-1">
              <div className="flex min-w-0 flex-1 items-center justify-between rounded-[14px] bg-blue-50 px-1 text-xs font-bold text-webzark">
                <button
                  aria-label={`Decrease ${product.name}`}
                  className="px-1 py-1"
                  onClick={onRemove}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  aria-label={`Increase ${product.name}`}
                  className="px-1 py-1"
                  onClick={onAdd}
                >
                  +
                </button>
              </div>

              <Button
                className="h-8 shrink-0 px-2 py-1 text-[10px]"
                onClick={onBuy}
              >
                Buy
              </Button>
            </div>
          ) : (
            <div className="flex h-8 gap-1">
              <Button
                className="h-8 min-w-0 flex-1 bg-blue-50 px-2 py-1 text-[10px] text-webzark hover:bg-webzark hover:text-white"
                onClick={onAdd}
              >
                <span className="whitespace-nowrap">Add to cart</span>
              </Button>

              <Button
                className="h-8 shrink-0 px-2 py-1 text-[10px]"
                onClick={onBuy}
              >
                Buy
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}