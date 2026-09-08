import type { ReactNode } from "react";
import BrandLogo from "../ui/BrandLogo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] bg-page p-3 sm:p-6">
      <section className="mx-auto grid min-h-[calc(100dvh-1.5rem)] max-w-[1080px] overflow-hidden rounded-[14px] border border-border bg-white shadow-card sm:min-h-[calc(100dvh-3rem)] lg:grid-cols-[1fr_.9fr]">
        <div className="flex flex-col justify-center p-5 sm:p-10 lg:p-14">
          <a
            href="/"
            className="mb-8 w-fit font-display text-2xl font-extrabold tracking-[-.08em] text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark"
          >
            <BrandLogo />
          </a>
          {children}
        </div>
        <aside className="relative hidden overflow-hidden bg-[#102846] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=85')",
            }}
          />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-blue-200">
              Trusted by businesses
            </p>
            <h2 className="mt-5 max-w-xs font-display text-4xl font-extrabold leading-[1.05]">
              Better tools. Stronger businesses.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-blue-100">
              Reliable hardware, straightforward pricing, and support that keeps
              work moving.
            </p>
          </div>
          <p className="relative text-xs font-bold text-blue-100">
            Built for business, ready for tomorrow.
          </p>
        </aside>
      </section>
    </main>
  );
}
