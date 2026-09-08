import { products } from "../../data/data";
import PageFrame from "../PageFrame";
import ProductGrid from "../../components/catalog/ProductGrid";

export default function CategoryProducts() {
  const category = new URLSearchParams(window.location.search).get("category") || "Printers";
  const matching = products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase().replace("printers", "printer")));
  return (
    <PageFrame title={category} intro={`Browse dependable ${category.toLowerCase()} selected for business use.`}>
      <ProductGrid products={matching.length ? matching : products} />
    </PageFrame>
  );
}
