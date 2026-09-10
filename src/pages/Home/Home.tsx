import { useMemo, useState } from "react";
import { getRetailerLinks, products } from "../../data/data";
import ProductGrid from "../../components/catalog/ProductGrid";

const categories = ["All products", ...Array.from(new Set(products.map((product) => product.category)))];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [category, setCategory] = useState(categories[0]);
  const filteredProducts = useMemo(
    () => category === categories[0] ? products : products.filter((product) => product.category === category),
    [category],
  );

  return (
    <main className="min-h-screen bg-page text-ink dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-9 sm:px-6 sm:py-12 md:grid-cols-[1.02fr_.98fr] md:items-center md:py-20 lg:gap-16 lg:px-8">
        <div>
          <h1 className="max-w-3xl font-display text-[clamp(2.5rem,11vw,5.5rem)] font-extrabold leading-[.96] tracking-[-.04em] text-navy dark:text-white">
            Everything your business needs
            <span className="text-webzark"> to run.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted dark:text-slate-400">
            Clear product picks for work, retail, and home offices. Compare the essentials, then buy from the platform you trust.
          </p>
          <div className="mt-7">
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-webzark px-5 py-3 text-sm font-bold text-white shadow-button transition hover:-translate-y-px hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2" href="#catalog">
              Browse products <Arrow />
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[16px] bg-soft shadow-card dark:bg-slate-800">
          <img className="aspect-[1.2] h-full w-full object-cover md:aspect-[1.06]" src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=85" alt="Modern point-of-sale terminal" />
        </div>
      </section>

      <section id="catalog" className="border-t border-border px-4 py-10 dark:border-slate-800 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-[-.04em] text-navy dark:text-white sm:text-4xl">Shop by category</h2>
              <p className="mt-2 text-sm text-muted dark:text-slate-400">{filteredProducts.length} products selected for comparison.</p>
            </div>
            <label className="flex w-full flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-muted dark:text-slate-400 md:w-auto md:min-w-[220px]">
              Filter products
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-[10px] border border-border bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal text-navy outline-none focus:border-webzark focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      <section className="border-t border-border bg-white px-4 py-10 dark:border-slate-800 dark:bg-slate-900 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display text-3xl font-extrabold tracking-[-.04em] text-navy dark:text-white">Compare top picks</h2>
          <div className="mt-6 hidden overflow-x-auto rounded-[16px] border border-border dark:border-slate-700 md:block">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-soft text-xs uppercase tracking-[.12em] text-muted dark:bg-slate-800 dark:text-slate-400">
                <tr><th className="px-4 py-4">Product</th><th className="px-4 py-4">Best for</th><th className="px-4 py-4">Guide price</th><th className="px-4 py-4">Selected as</th><th className="px-4 py-4" /></tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-slate-700">
                {products.filter((product) => product.featured).slice(0, 5).map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-4 font-bold text-navy dark:text-white">{product.name}</td>
                    <td className="px-4 py-4 text-muted dark:text-slate-400">{product.category}</td>
                    <td className="px-4 py-4 font-bold text-navy dark:text-white">${product.price}</td>
                    <td className="px-4 py-4 font-semibold text-webzark">Editor&apos;s pick</td>
                    <td className="px-4 py-4"><a className="font-bold text-webzark hover:text-webzark-dark" href={getRetailerLinks(product)[0].url} target="_blank" rel="noreferrer">Buy <Arrow /></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 md:hidden"><ProductGrid products={products.filter((product) => product.featured).slice(0, 4)} /></div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-10 dark:border-slate-800 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display text-3xl font-extrabold tracking-[-.04em] text-navy dark:text-white">What shoppers say</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Useful shortlist", "The comparison makes it easy to narrow down the right setup without opening ten tabs.", "Aarav M."],
              ["Clear and practical", "Product descriptions are short, specific, and focused on how the hardware is actually used.", "Meera K."],
              ["Fast decision", "I found a scanner for our stock room in a few minutes and bought it from the linked store.", "Rohan S."],
            ].map(([title, quote, name]) => (
              <blockquote key={title} className="rounded-[16px] border border-border bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-amber-500">★★★★★</p>
                <strong className="mt-3 block text-sm text-navy dark:text-white">{title}</strong>
                <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">“{quote}”</p>
                <cite className="mt-4 block text-xs font-bold not-italic text-navy dark:text-slate-200">{name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
