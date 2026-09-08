import type { ReactNode } from "react";

const links = [
  ["/admin", "Overview"],
  ["/admin/products", "Products"],
  ["/admin/orders", "Orders"],
  ["/admin/customers", "Customers"],
  ["/admin/users", "Users"],
  ["/admin/categories", "Categories"],
  ["/admin/analytics", "Analytics"],
  ["/admin/import", "Bulk import"],
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const path = window.location.pathname;
  return (
    <main className="min-h-screen bg-page text-ink">
      <div className="mx-auto grid max-w-[1780px] gap-5 px-3 py-4 sm:px-4 md:gap-8 md:px-8 md:py-8">
        <aside className="h-fit rounded-[14px] border border-border bg-navy p-4 text-white md:sticky md:top-6 md:p-5">
          <a href="/" className="font-display text-xl font-extrabold tracking-[-.08em]">
            webzark <i className="font-normal text-blue-300">/</i>
          </a>
          <p className="mt-1 text-[10px] uppercase tracking-[.14em] text-blue-200">Marketplace admin</p>
          <nav className="mt-5 flex gap-1 overflow-x-auto pb-1 md:mt-8 md:grid md:overflow-visible" aria-label="Admin navigation">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`shrink-0 rounded-[14px] px-3 py-2 text-sm transition ${path === href ? "bg-white text-navy" : "text-blue-100 hover:bg-white/10 hover:text-white"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <a href="/#catalog" className="mt-5 block border-t border-white/15 pt-4 text-xs text-blue-200 hover:text-white md:mt-8">
            View storefront
          </a>
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
