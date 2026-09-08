import { useEffect, useMemo, useState } from "react";
import { categories, products } from "../../data/data";
import CatalogSearch, {
  productSearchText,
} from "../../components/catalog/CatalogSearch";
import ProductGrid from "../../components/catalog/ProductGrid";
import { Select } from "../../components/ui";
import PageFrame from "../PageFrame";

export default function Search() {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get("q") || "",
  );

  const [category, setCategory] = useState("All hardware");
  const [brand, setBrand] = useState("All brands");
  const [price, setPrice] = useState("All prices");
  const [sort, setSort] = useState("Featured");

  useEffect(() => {
    const syncQuery = () =>
      setQuery(new URLSearchParams(window.location.search).get("q") || "");

    window.addEventListener("popstate", syncQuery);

    return () => window.removeEventListener("popstate", syncQuery);
  }, []);

  const brands = [
    "All brands",
    ...Array.from(
      new Set(products.map((product) => product.name.split(" ")[0])),
    ),
  ];

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All hardware" ||
        product.category === category ||
        (category === "Printers" && product.category.includes("printers")) ||
        (category === "Scanners" && product.category.includes("scanners")) ||
        (category === "Networking" &&
          (product.category === "Networking" ||
            product.category === "Network cables")) ||
        (category === "Accessories" &&
          [
            "Accessories",
            "Computer accessories",
            "Audio equipment",
          ].includes(product.category));

      const matchesQuery = query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .every((term) => productSearchText(product).includes(term));

      const matchesBrand =
        brand === "All brands" || product.name.startsWith(`${brand} `);

      const matchesPrice =
        price === "All prices" ||
        (price === "Under $100" && product.price < 100) ||
        (price === "$100 - $250" &&
          product.price >= 100 &&
          product.price <= 250) ||
        (price === "Over $250" && product.price > 250);

      return (
        matchesCategory &&
        matchesQuery &&
        matchesBrand &&
        matchesPrice
      );
    });

    return [...filtered].sort((a, b) =>
      sort === "Price: low to high"
        ? a.price - b.price
        : sort === "Price: high to low"
          ? b.price - a.price
          : Number(b.featured) - Number(a.featured),
    );
  }, [brand, category, price, query, sort]);

  const clearFilters = () => {
    setCategory("All hardware");
    setBrand("All brands");
    setPrice("All prices");
  };

  return (
    <PageFrame title="Search hardware" intro="">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* =========================================
            LEFT FILTER SIDEBAR
        ========================================= */}
        <aside
          data-aos="fade-right"
          className="hidden lg:block"
        >
          {/* Filter Header */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <strong className="font-display text-sm text-ink">
              Filter by
            </strong>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-webzark transition-colors hover:text-webzark-dark"
            >
              Clear all
            </button>
          </div>

          {/* Category */}
          <div className="border-b border-border py-5">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider text-muted">
              Category
            </span>

            <div className="space-y-1">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`flex w-full items-center justify-between py-1.5 text-left text-xs transition-colors ${
                    category === item
                      ? "font-bold text-webzark"
                      : "text-muted hover:text-webzark"
                  }`}
                >
                  <span>{item}</span>

                  <small className="text-[10px] text-slate-400">
                    {item === "All hardware"
                      ? products.length
                      : products.filter(
                          (product) =>
                            product.category === item ||
                            (item === "Printers" &&
                              product.category.includes("printers")) ||
                            (item === "Scanners" &&
                              product.category.includes("scanners")) ||
                            (item === "Networking" &&
                              ["Networking", "Network cables"].includes(
                                product.category,
                              )) ||
                            (item === "Accessories" &&
                              [
                                "Accessories",
                                "Computer accessories",
                                "Audio equipment",
                              ].includes(product.category)),
                        ).length}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="border-b border-border py-5">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider text-muted">
              Brand
            </span>

            <div className="space-y-1">
              {brands.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBrand(item)}
                  className={`block w-full py-1.5 text-left text-xs transition-colors ${
                    brand === item
                      ? "font-bold text-webzark"
                      : "text-muted hover:text-webzark"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="py-5">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider text-muted">
              Price
            </span>

            <div className="space-y-1">
              {[
                "All prices",
                "Under $100",
                "$100 - $250",
                "Over $250",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrice(item)}
                  className={`block w-full py-1.5 text-left text-xs transition-colors ${
                    price === item
                      ? "font-bold text-webzark"
                      : "text-muted hover:text-webzark"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* =========================================
            RIGHT PRODUCT AREA
        ========================================= */}
        <div
          data-aos="fade-up"
          className="min-w-0"
        >
          {/* Search Bar
              IMPORTANT:
              It now starts at the exact top of the
              product area, aligned with Filter by.
          */}
          <div className="mb-5">
            <CatalogSearch
              products={products}
              initialQuery={query}
              onSearch={setQuery}
            />
          </div>

          {/* Mobile Filters */}
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            className="mb-5 grid grid-cols-2 gap-2 lg:hidden"
          >
            <Select
              className="w-full bg-white"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>

            <Select
              className="w-full bg-white"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            >
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>

            <Select
              className="w-full bg-white"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            >
              <option>All prices</option>
              <option>Under $100</option>
              <option>$100 - $250</option>
              <option>Over $250</option>
            </Select>

            <Select
              className="w-full bg-white"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </Select>
          </div>

          {/* Results / Sort */}
          <div
            data-aos="fade-up"
            data-aos-delay="75"
            className="mb-5 flex items-center justify-between border-b border-border pb-3"
          >
            <p className="text-xs text-muted">
              {visibleProducts.length}{" "}
              {visibleProducts.length === 1 ? "product" : "products"}
            </p>

            <div className="hidden items-center gap-2 text-xs text-muted lg:flex">
              <span>Sort by</span>

              <Select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-9 min-w-[140px] border-0 bg-white py-1.5 font-bold text-ink shadow-none focus:ring-0"
              >
                <option>Featured</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </Select>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-webzark hover:text-webzark-dark lg:hidden"
            >
              Clear filters
            </button>
          </div>

          {/* Products */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <ProductGrid
              products={visibleProducts}
              emptyTitle="No matching hardware"
              emptyText="Try a different search or category."
            />
          </div>
        </div>
      </div>
    </PageFrame>
  );
}