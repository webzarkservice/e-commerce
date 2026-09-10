import { Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useWishlist } from "../../context/WishlistContext";
import BrandLogo from "../ui/BrandLogo";

export default function Header() {
  const wishlist = useWishlist();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex min-h-[64px] max-w-[1440px] items-center justify-between gap-2 px-4 sm:min-h-[68px] sm:px-6 lg:px-8">
        <a
          className="font-display text-xl font-extrabold tracking-[-.04em] text-navy sm:text-2xl"
          href="/"
        >
          <BrandLogo />
        </a>
        <nav
          className="flex items-center gap-1 sm:gap-2"
          aria-label="Main navigation"
        >
                    <button
            type="button"
            onClick={toggleTheme}
            className="grid h-11 w-11 place-items-center rounded-[10px] text-navy transition hover:bg-blue-50 hover:text-webzark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
          <a
            className="hidden rounded-[10px] px-3 py-2 text-xs font-bold text-navy transition hover:bg-blue-50 hover:text-webzark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            href="/how-it-works"
          >
            How it works
          </a>

          <a
            className="hidden rounded-[10px] px-3 py-2 text-xs font-bold text-navy transition hover:bg-blue-50 hover:text-webzark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            href="/wishlist"
            aria-label={`Wishlist${wishlist.count ? `, ${wishlist.count} saved products` : ""}`}
          >
            <Heart size={15} aria-hidden="true" />
            <span className="ml-1">
              Wishlist{wishlist.count ? ` (${wishlist.count})` : ""}
            </span>
          </a>
          <a
            className="hidden rounded-[10px] bg-webzark px-4 py-2 text-xs font-bold text-white shadow-button transition hover:-translate-y-px hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 sm:inline-flex"
            href="/products"
          >
            Browse products
          </a>
        </nav>
      </div>
    </header>
  );
}
