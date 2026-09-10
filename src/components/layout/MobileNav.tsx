import { CircleHelp, Heart, Home, LayoutGrid } from "lucide-react";

const links = [
  ["/", "Home", Home],
  ["/products", "Browse", LayoutGrid],
  ["/wishlist", "Saved", Heart],
  ["/how-it-works", "Guide", CircleHelp],
] as const;

export default function MobileNav() {
  const pathname = window.location.pathname;
  return (
    <nav className="mobile-bottom-nav sm:hidden" aria-label="Mobile navigation">
      {links.map(([href, label, Icon]) => {
        const active = pathname === href;
        return <a key={href} href={href} aria-current={active ? "page" : undefined} className={`mobile-bottom-nav-link ${active ? "text-webzark" : "text-muted"}`}><Icon size={20} strokeWidth={active ? 2.3 : 1.8} aria-hidden="true" /><span>{label}</span></a>;
      })}
    </nav>
  );
}
