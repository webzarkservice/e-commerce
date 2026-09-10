import { CircleHelp, Heart, Home, LayoutGrid } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

const links = [
  ["/", "Home", Home],
  ["/products", "Browse", LayoutGrid],
  ["/wishlist", "Saved", Heart],
  ["/how-it-works", "Guide", CircleHelp],
] as const;

export default function MobileNav() {
  const pathname = window.location.pathname;
  const wishlist = useWishlist();
  return (
    <nav className="mobile-bottom-nav sm:hidden" aria-label="Mobile navigation">
      {links.map(([href, label, Icon]) => {
        const active = pathname === href;
        return <a key={href} href={href} aria-current={active ? "page" : undefined} className={`mobile-bottom-nav-link ${active ? "text-webzark" : "text-muted"}`}>
          <span className="relative">
            <Icon size={20} strokeWidth={active ? 2.3 : 1.8} aria-hidden="true" />
            {href === "/wishlist" && wishlist.count > 0 && (
              <span
                className="absolute -right-2 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-webzark px-1 text-[9px] font-extrabold leading-none text-white shadow-sm"
                aria-hidden="true"
              >
                {wishlist.count > 99 ? "99+" : wishlist.count}
              </span>
            )}
          </span>
          <span>{label}</span>
        </a>;
      })}
    </nav>
  );
}
