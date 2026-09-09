import BrandLogo from "../ui/BrandLogo";
import { useWishlist } from "../../context/WishlistContext";

export default function Header() {
  const wishlist = useWishlist();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-[64px] max-w-[1780px] items-center justify-between gap-3 px-3 sm:px-4">
        <a className="font-display text-xl font-extrabold tracking-[-.08em] text-navy sm:text-2xl" href="/">
          <BrandLogo />
        </a>
        <nav className="flex items-center gap-2">
          <a className="rounded-[14px] px-3 py-2 text-xs font-bold text-navy transition hover:bg-blue-50 hover:text-webzark dark:text-slate-100 dark:hover:bg-slate-800" href="/wishlist">
            Wishlist{wishlist.count ? ` (${wishlist.count})` : ""}
          </a>
          <a className="rounded-[14px] bg-webzark px-4 py-2 text-xs font-bold text-white transition hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark" href="/products">
            Browse products
          </a>
        </nav>
      </div>
    </header>
  );
}
