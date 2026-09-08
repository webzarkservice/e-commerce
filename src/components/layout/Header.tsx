import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { BookOpen, Search, ShoppingCart, UserRound } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";

export default function Header() {
  const [authenticated] = useState(
    () => localStorage.getItem("webzark-auth") === "true",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();
  const path = window.location.pathname;
  const linkClass = (target: string) => {
    const active =
      target === "/account" ? path.startsWith("/account") : path === target;
    return `rounded-[14px] px-3 py-2 transition ${active ? "bg-blue-50 text-webzark" : "hover:text-webzark"}`;
  };
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-[64px] max-w-[1780px] items-center justify-between gap-3 px-3 sm:px-4">
        <a
          className="font-display text-xl font-extrabold tracking-[-.08em] text-navy sm:text-2xl"
          href="/"
        >
          <BrandLogo />
        </a>
        <button
          className="rounded-[10px] bg-soft p-2 text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
        <nav
          className={`${menuOpen ? "flex" : "hidden"} absolute left-3 right-3 top-[68px] flex-col gap-1 rounded-[14px] border border-border bg-white p-3 text-sm font-medium text-muted shadow-card sm:left-4 sm:right-4 md:static md:flex md:flex-row md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-0 md:shadow-none lg:gap-6`}
        >
          <a
            className={`${linkClass("/")} inline-flex items-center gap-1.5`}
            href="/#catalog"
          >
            <BookOpen size={17} strokeWidth={2} aria-hidden="true" />
            Catalog
          </a>
                   <a
            className={`${linkClass("/search")} inline-flex items-center gap-1.5`}
            href="/search"
          >
            <Search size={17} strokeWidth={2} aria-hidden="true" />
            Search
          </a>
          {authenticated ? (
            <a
              className={`${linkClass("/account")} inline-flex items-center gap-1.5`}
              href="/account"
            >
              <UserRound size={17} strokeWidth={2} aria-hidden="true" />
              Account
            </a>
          ) : (
            <a
              className={`${linkClass("/login")} inline-flex items-center gap-1.5`}
              href="/login"
            >
              <UserRound size={17} strokeWidth={2} aria-hidden="true" />
              Sign in
            </a>
          )}
         <a
            className={`${linkClass("/cart")} relative inline-flex items-center gap-1.5`}
            href="/cart"
          >
            <ShoppingCart size={19} strokeWidth={2.2} aria-hidden="true" />
            Cart
            {cart.total > 0 && (
              <span className={`pointer-events-none absolute -right-2 -top-2 min-w-4 rounded-full px-1 text-center text-[10px] font-bold leading-4 ${path === "/cart" ? "bg-webzark text-white" : "bg-navy text-white"}`}>
                {cart.total}
              </span>
            )}
          </a> 

          
        </nav>
      </div>
    </header>
  );
}
