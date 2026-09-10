import { products } from "../../data/data";
import ProductGrid from "../../components/catalog/ProductGrid";
import { Card } from "../../components/ui";
import PageFrame from "../PageFrame";

export default function HowItWorks() {
  return (
    <PageFrame title="Compare once. Buy where you prefer." intro="Webzark helps business buyers narrow a crowded hardware market before sending them to a retailer to complete their purchase.">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,.72fr)] lg:gap-12">
        <ol className="overflow-hidden rounded-[16px] bg-white shadow-[0_16px_42px_rgba(18,33,61,.07)] ring-1 ring-slate-200/70 dark:bg-slate-900 dark:shadow-[0_18px_44px_rgba(0,0,0,.22)] dark:ring-slate-800">
          {[
            ["Browse focused picks", "Start with hardware selected for retail counters, workstations, and small-business operations."],
            ["Save your shortlist", "Use the heart on any product card to keep useful options together while you compare specifications."],
            ["Choose a retailer", "Open Amazon or Flipkart from a product card to check current price, delivery, and returns before you buy."],
          ].map(([title, text], index) => (
            <li className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-b border-border/80 px-5 py-6 last:border-0 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-5 sm:px-7 sm:py-7 dark:border-slate-800" key={title}>
              <span className="font-display text-2xl font-extrabold tracking-[-.04em] text-webzark/80 sm:text-3xl">0{index + 1}</span>
              <article>
                <h2 className="font-display text-xl font-extrabold tracking-[-.03em] text-navy dark:text-white sm:text-2xl">{title}</h2>
                <p className="mt-2 max-w-xl text-base leading-7 text-muted dark:text-slate-400">{text}</p>
              </article>
            </li>
          ))}
        </ol>
        <Card className="h-fit border-0 bg-navy p-1 shadow-[0_18px_48px_rgba(18,33,61,.18)] dark:bg-slate-800 dark:shadow-[0_20px_50px_rgba(0,0,0,.32)]">
          <div className="rounded-[13px] bg-navy p-6 text-white ring-1 ring-white/10 sm:p-8 dark:bg-slate-800">
            <h2 className="max-w-sm font-display text-2xl font-extrabold tracking-[-.03em] sm:text-3xl">A marketplace without the checkout.</h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-blue-100 dark:text-slate-300">We don&apos;t process payment, shipping, or returns. The retailer you choose handles the transaction and its policies.</p>
            <a className="mt-7 inline-flex min-h-11 items-center rounded-[10px] bg-white px-5 py-3 text-sm font-bold text-navy transition duration-300 hover:-translate-y-px hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy dark:focus-visible:ring-offset-slate-800" href="/products">Browse the catalog</a>
          </div>
        </Card>
      </div>
      <section className="mt-14 border-t border-border pt-10 dark:border-slate-800 sm:mt-20 sm:pt-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4"><div><h2 className="font-display text-2xl font-extrabold tracking-[-.03em] text-navy dark:text-white sm:text-3xl">Start with a proven pick</h2><p className="mt-2 text-base text-muted dark:text-slate-400">A few options to make the first comparison easier.</p></div><a className="inline-flex min-h-11 items-center text-sm font-bold text-webzark transition hover:text-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950" href="/affiliate-disclosure">Affiliate disclosure</a></div>
        <ProductGrid products={products.filter((product) => product.featured).slice(0, 4)} />
      </section>
    </PageFrame>
  );
}
