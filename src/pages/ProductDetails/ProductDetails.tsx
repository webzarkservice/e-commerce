import { useState } from "react";
import { products } from "../../data/data";
import { useCart } from "../../context/CartContext";
import ProductGrid from "../../components/catalog/ProductGrid";
import { Badge, Button, Card, Separator } from "../../components/ui";

export default function ProductDetails() {
  const product = products.find((item) => item.id === Number(new URLSearchParams(window.location.search).get("id"))) || products[0];
  const cart = useCart();
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const quantity = cart.count(product.id);
  const gallery = product.gallery || [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <main className="min-h-screen bg-page px-3 py-4 text-ink sm:px-4 sm:py-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-[1440px]">
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[10px] text-muted sm:gap-2 sm:text-[11px]">
          <a href="/" className="font-semibold text-webzark hover:text-webzark-dark">Home</a>
          <span>/</span>
          <a href="/#catalog" className="hover:text-webzark">Hardware</a>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="font-medium text-navy">{product.name}</span>
        </nav>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.85fr)_300px] lg:gap-4">
          <div data-aos="fade-right" className="grid gap-3 sm:grid-cols-[58px_minmax(0,1fr)]">
            <div className="order-2 flex max-w-full gap-2 overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:overflow-visible sm:pb-0">
              {gallery.map((image, index) => (
                <button onClick={() => setActiveImage(image)} className={`h-12 w-12 overflow-hidden rounded-[14px] border bg-white p-1 ${activeImage === image ? "border-webzark ring-2 ring-blue-100" : "border-border"}`} key={`${image}-${index}`} aria-label={`View product image ${index + 1}`} aria-pressed={activeImage === image}>
                  <img className="h-full w-full object-cover" src={image} alt="" />
                </button>
              ))}
            </div>
            <div className="order-1 flex min-h-[280px] items-center justify-center overflow-hidden rounded-[14px] border border-border bg-white p-3 sm:min-h-[360px] sm:p-5 sm:order-2 md:min-h-[500px]">
              <img className="max-h-[470px] w-full object-contain mix-blend-multiply" src={activeImage} alt={product.name} />
            </div>
          </div>

          <div data-aos="fade-up" className="px-1 py-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-amber-100 text-amber-700">Bestseller</Badge>
              <span className="text-[11px] text-muted">Trusted by business buyers</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-.04em] text-navy sm:text-3xl md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-xs font-medium text-muted">{product.specs.join(" | ")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="font-bold text-amber-500">★★★★★</span>
              <span className="font-semibold text-navy">4.8</span>
              <a href="#reviews" className="text-webzark underline underline-offset-2">Write a review</a>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">{product.description} Designed for dependable professional use, easy setup, and a comfortable daily workflow.</p>
            <Separator className="my-5" />
            <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
              <div><span className="text-[10px] text-muted">Brand</span><strong className="mt-1 block text-xs text-navy">Webzark</strong></div>
              <div><span className="text-[10px] text-muted">SKU</span><strong className="mt-1 block text-xs text-navy">WZ-{product.id}0{product.id}8</strong></div>
              <div><span className="text-[10px] text-muted">Availability</span><strong className="mt-1 block text-xs text-success">In stock</strong></div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-1.5 border-t border-border pt-5 text-center text-[9px] text-muted sm:gap-2 sm:text-[10px]">
              <span>◌<br />Professional use</span>
              <span>◉<br />High durability</span>
              <span>◍<br />Ergonomic design</span>
            </div>
          </div>

          <Card data-aos="fade-left" className="h-fit p-4 shadow-card sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <strong className="font-display text-2xl text-navy">${product.price.toFixed(2)}</strong>
              <button className="text-xl text-muted hover:text-webzark" aria-label="Save product">♡</button>
            </div>
            <p className="mt-2 text-xs text-success">{product.stock} in stock · ships today</p>
            <p className="mt-5 text-[11px] font-bold text-navy">Quantity</p>
            <div className="mt-2 flex items-center justify-between rounded-[14px] border border-border px-3 py-2 text-sm">
              <button onClick={() => cart.remove(product.id)} aria-label="Decrease quantity">-</button>
              <strong>{quantity || 1}</strong>
              <button onClick={() => cart.add(product.id)} aria-label="Increase quantity">+</button>
            </div>
            <Button className="mt-3 w-full" onClick={() => cart.add(product.id)}>Add to Cart</Button>
            <Button variant="secondary" className="mt-2 w-full border border-webzark bg-white text-webzark hover:bg-blue-50" onClick={() => { window.location.href = `/checkout?product=${product.id}`; }}>Buy Now</Button>
            <div className="mt-5 space-y-3 border-t border-border pt-4 text-[11px] text-muted">
              <p><strong className="text-navy">Free Shipping</strong><br />On orders over $500</p>
              <p><strong className="text-navy">Estimated Delivery</strong><br />3-5 business days</p>
              <p><strong className="text-navy">Easy Returns</strong><br />7-day return policy</p>
              <p><strong className="text-navy">Secure Checkout</strong><br />Your data is protected</p>
            </div>
          </Card>
        </section>

        <section className="mt-8 overflow-hidden rounded-[14px] border border-border bg-white">
          <div className="flex overflow-x-auto border-b border-border text-xs font-bold text-muted">
            {["Overview", "Specifications", "Applications", "What's in the Box", "Reviews (128)", "Support"].map((tab, index) => (
              <a className={`min-w-fit px-5 py-4 ${index === 0 ? "border-b-2 border-webzark text-webzark" : "hover:text-webzark"}`} href={index === 4 ? "#reviews" : "#overview"} key={tab}>{tab}</a>
            ))}
          </div>
          <div id="overview" className="grid gap-7 p-4 sm:p-5 md:grid-cols-[1.15fr_1fr_.8fr] md:p-7">
            <div>
              <h2 className="font-display text-base font-extrabold text-navy">Product Overview</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{product.description} The design balances reliable performance with practical controls, durable materials, and a compact footprint for busy workspaces.</p>
              <div className="mt-5 rounded-[14px] bg-blue-50 p-4 text-xs text-navy"><strong>Built for professionals</strong><br /><span className="text-muted">Trusted by contractors, builders, and operations teams.</span></div>
            </div>
            <div>
              <h2 className="font-display text-base font-extrabold text-navy">Key Features</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">{product.specs.concat(["Compact and lightweight design", "Suitable for professional and industrial use"]).map((spec) => <li key={spec}><span className="mr-2 text-webzark">●</span>{spec}</li>)}</ul>
            </div>
            <div>
              <h2 className="font-display text-base font-extrabold text-navy">Ideal For</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">{["Construction work", "Electrical installations", "Plumbing", "Woodworking", "Maintenance"].map((use) => <li key={use}>◈ <span className="ml-2">{use}</span></li>)}</ul>
            </div>
          </div>
        </section>

        <section id="reviews" className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">You may also like</p><h2 className="mt-1 font-display text-2xl font-extrabold text-navy">Related Products</h2></div>
            <a href="/#catalog" className="text-xs font-bold text-webzark">View all</a>
          </div>
          <ProductGrid products={related} />
        </section>
      </div>
    </main>
  );
}
