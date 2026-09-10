import type { Product } from "../../data/data";
import ProductCard from "../product/ProductCard";
import { EmptyState } from "../ui";

type ProductGridProps = {
  products: Product[];
  emptyTitle?: string;
  emptyText?: string;
  horizontal?: boolean;
};

export default function ProductGrid({
  products,
  emptyTitle = "No hardware found",
  emptyText = "Try a different search or browse the full catalog.",
  horizontal = false,
}: ProductGridProps) {
  if (!products.length) {
    return <EmptyState title={emptyTitle}>{emptyText}</EmptyState>;
  }

  const cards = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      horizontal={horizontal}
    />
  ));

  return (
    <div>
      <div className={horizontal ? "catalog-rail flex snap-x gap-3 overflow-x-auto pb-3" : "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"}>
        {cards}
      </div>
    </div>
  );
}
