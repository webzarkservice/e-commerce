import type { MouseEvent, ReactNode } from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileNav from "../components/layout/MobileNav";

export default function MainLayout({ children }: { children: ReactNode }) {
  const handleNavigation = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as HTMLElement).closest("a");
    if (!link || link.target || link.hasAttribute("download") || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const url = new URL(link.href);
    if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;

    event.preventDefault();
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return <div onClick={handleNavigation}><Header /><div className="pb-20 sm:pb-0">{children}</div><Footer /><MobileNav /></div>;
}
