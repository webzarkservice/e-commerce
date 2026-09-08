import BrandLogo from "../ui/BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f1f38] text-white">
      <div className="mx-auto max-w-[1780px] px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-md">
            <a
              href="/"
              aria-label="Webzark Marketplace home"
              className="inline-flex rounded-[8px] transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f38]"
            >
              <BrandLogo inverse />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              The practical way to source the hardware your business relies on.
              Built for reliable purchasing, clear choices, and business-ready
              hardware.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Trusted business hardware marketplace
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Marketplace
            </h2>

            <nav
              className="mt-5 flex flex-col items-start gap-3"
              aria-label="Marketplace navigation"
            >
              <a
                href="/#catalog"
                className="rounded-[6px] text-sm text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Catalog
              </a>

              <a
                href="/cart"
                className="rounded-[6px] text-sm text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Cart
              </a>

              <a
                href="/checkout"
                className="rounded-[6px] text-sm text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Checkout
              </a>
            </nav>
          </div>

          {/* Account */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Account
            </h2>

            <nav
              className="mt-5 flex flex-col items-start gap-3"
              aria-label="Account navigation"
            >
              <a
                href="/account/orders"
                className="rounded-[6px] text-sm text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Orders
              </a>

              <a
                href="/account"
                className="rounded-[6px] text-sm text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                My Account
              </a>

              <a
                href="/login"
                className="rounded-[6px] text-sm text-slate-300 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Sign In
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <small className="text-xs text-slate-400">
            © 2026 Webzark Marketplace. All rights reserved.
          </small>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            <a
              href="/"
              className="rounded-[6px] underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Privacy
            </a>

            <a
              href="/"
              className="rounded-[6px] underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Terms
            </a>

            <span className="hidden h-3 w-px bg-white/15 sm:block" />

            <span className="text-slate-500">Business Hardware</span>
          </div>
        </div>
      </div>
    </footer>
  );
}