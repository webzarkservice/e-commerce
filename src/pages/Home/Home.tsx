import { categoryShowcase, products } from "../../data/data";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import CategoryCard from "../../components/catalog/CategoryCard";
import ProductGrid from "../../components/catalog/ProductGrid";

type IconName =
  | "search"
  | "cart"
  | "user"
  | "menu"
  | "arrow"
  | "check"
  | "chevron";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.5L20 8H6" />
        <circle cx="10" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m7 10 5 5 5-5" />,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const button =
  "inline-flex items-center justify-center gap-3 px-4 py-3 text-sm font-bold transition duration-200 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark";

export default function Home() {
  return (
    <div className="min-h-screen bg-page text-ink">


      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid max-w-[1780px] gap-8 bg-gradient-to-br from-blue-50 to-page px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:px-[7vw] lg:gap-16 lg:py-24">
          <RevealOnScroll>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-webzark">
                The hardware behind better work
              </p>

              <h1 className="font-display text-[clamp(2.5rem,9vw,5.5rem)] font-extrabold leading-[.98] tracking-[-.06em] text-navy">
                Everything your
                <br />
                <em className="not-italic text-webzark">
                  business needs
                </em>{" "}
                to run.
              </h1>

              <p className="mt-5 max-w-[490px] text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Reliable hardware for point of sale, billing, inventory and
                the everyday moments that keep your business moving.
              </p>

              <a
                className={`${button} mt-5 bg-webzark text-white shadow-button hover:-translate-y-0.5 rounded-[14px] hover:bg-webzark-dark`}
                href="#catalog"
              >
                Browse hardware <Icon name="arrow" size={17} />
              </a>

              <div className="mt-8 flex flex-wrap gap-5 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Icon name="check" size={15} />
                  Tested for daily use
                </span>

                <span className="flex items-center gap-1">
                  <Icon name="check" size={15} />
                  Straightforward support
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="relative">
            <div className="aspect-[1.08] overflow-hidden rounded-[14px] bg-blue-100">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=85"
                alt="Business operator using a modern checkout terminal"
              />
            </div>

            <div className="absolute -bottom-5 rounded-[14px] right-3 flex flex-col bg-white px-5 py-4 shadow-card md:-right-6">
              <strong className="font-display text-sm text-navy">
                Chosen by 2,400+
              </strong>

              <span className="mt-1 text-[11px] text-muted">
                businesses worldwide
              </span>
            </div>
          </RevealOnScroll>
        </section>

        {/* Categories */}
        <section
          id="categories"
          data-aos="fade-up"
          className="mx-auto max-w-[1680px] px-4 py-16 md:py-24"
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-webzark">
                Browse by use case
              </p>

              <h2 className="font-display text-4xl font-extrabold tracking-[-.05em] text-navy">
                Find the right fit.
              </h2>
            </div>

            <a
              className="flex items-center gap-2 text-xs font-bold text-webzark"
              href="#catalog"
            >
              View all categories <Icon name="arrow" size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categoryShowcase.map((item, index) => (
              <CategoryCard
                key={item.name}
                name={item.name}
                text={item.text}
                image={item.image}
                delay={index * 80}
                onClick={() => { window.location.href = `/search?q=${encodeURIComponent(item.name)}`; }}
                icon={<Icon name="arrow" size={17} />}
              />
            ))}
          </div>
        </section>

        {/* Catalog */}
        <section
          id="catalog"
          data-aos="fade-up"
          className="border-t border-border bg-page px-4 py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1680px]">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-webzark">
                  The catalog
                </p>

                <h2 className="font-display text-3xl font-extrabold tracking-[-.05em] text-navy sm:text-4xl">
                  Hardware that works.
                </h2>
              </div>

              <a
                href="/search"
                className="inline-flex items-center gap-2 self-start rounded-[14px] border border-border px-4 py-2 text-xs font-bold text-webzark transition duration-200 hover:-translate-y-0.5 hover:border-webzark hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark sm:self-auto"
              >
                View all <Icon name="arrow" size={15} />
              </a>
            </div>
            <ProductGrid products={products.slice(0, 10)} horizontal />
          </div>
        </section>

        {/* Support */}
        <section
          id="support"
          data-aos="fade-up"
          className="!rounded-none grid gap-8 bg-navy px-4 py-16 text-white md:grid-cols-2 md:px-[max(1rem,calc((100%-1280px)/2))] md:py-20"
        >
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-blue-300">
              Here when you need us
            </p>

            <h2 className="font-display text-4xl font-extrabold tracking-[-.05em]">
              Hardware questions?
              <br />

              <em className="not-italic text-blue-300">
                We speak your language.
              </em>
            </h2>
          </div>

          <div className="max-w-sm self-end">
            <p className="text-sm leading-7 text-blue-100">
              From choosing your first printer to scaling a whole counter
              setup, our team can help you make a practical choice.
            </p>

            <a
              className={`${button} mt-3 bg-white rounded-[14px] text-navy hover:bg-blue-50`}
              href="mailto:hello@webzark.com"
            >
              Contact support <Icon name="arrow" size={17} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}