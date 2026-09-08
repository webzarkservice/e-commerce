import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../data/data";
import { useCart } from "../../context/CartContext";
import ProductCard from "../product/ProductCard";
import { EmptyState } from "../ui";

type ProductGridProps = {
  products: Product[];
  emptyTitle?: string;
  emptyText?: string;
  emptyAction?: ReactNode;
  horizontal?: boolean;
};

export default function ProductGrid({
  products,
  emptyTitle = "No hardware found",
  emptyText = "Try a different search or browse the full catalog.",
  emptyAction,
  horizontal = false,
}: ProductGridProps) {
  const cart = useCart();
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState({ width: 100, left: 0 });

  useEffect(() => {
    if (!horizontal || !railRef.current) return;

    const rail = railRef.current;
    const updateThumb = () => {
      const overflow = rail.scrollWidth - rail.clientWidth;
      const width = overflow > 0 ? Math.max(Math.min((rail.clientWidth / rail.scrollWidth) * 35, 10), 4) : 100;
      const left = overflow > 0 ? (rail.scrollLeft / overflow) * (100 - width) : 0;
      setScrollRatio({ width, left });
    };

    updateThumb();
    rail.addEventListener("scroll", updateThumb, { passive: true });
    window.addEventListener("resize", updateThumb);
    return () => {
      rail.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, [horizontal, products.length]);

  if (!products.length) {
    return <EmptyState title={emptyTitle}>{emptyText}{emptyAction}</EmptyState>;
  }

  const cards = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      quantity={cart.count(product.id)}
      onSelect={() => { window.location.href = `/product?id=${product.id}`; }}
      onAdd={() => cart.add(product.id)}
      onRemove={() => cart.remove(product.id)}
      onBuy={() => { window.location.href = `/checkout?product=${product.id}`; }}
      delay={Math.min(index * 60, 240)}
      horizontal={horizontal}
    />
  ));

  return (
    <div className={horizontal ? "relative" : ""}>
      <div ref={horizontal ? railRef : undefined} className={horizontal ? "catalog-rail flex snap-x gap-3 overflow-x-auto pb-3" : "grid grid-cols-2 gap-3 lg:grid-cols-4 2xl:grid-cols-6"}>
      {cards}
      </div>
      {horizontal && (
        <div className="catalog-track" aria-hidden="true">
          <span className="catalog-thumb" style={{ width: `${scrollRatio.width}%`, left: `${scrollRatio.left}%` }} />
        </div>
      )}
    </div>
  );
}
