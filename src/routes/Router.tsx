import { useEffect, useState } from "react";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Wishlist from "../pages/Wishlist/Wishlist";
import Products from "../pages/Products/Products";
import CategoryProducts from "../pages/Products/CategoryProducts";
import Search from "../pages/Search/Search";
import HowItWorks from "../pages/Information/HowItWorks";
import AffiliateDisclosure from "../pages/Information/AffiliateDisclosure";
import NotFound from "../pages/NotFound";

export default function Router() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPathname);
    return () => window.removeEventListener("popstate", syncPathname);
  }, []);
  const pages = {
    "/": Home,
    "/products": Products,
    "/category": CategoryProducts,
    "/search": Search,
    "/wishlist": Wishlist,
    "/how-it-works": HowItWorks,
    "/affiliate-disclosure": AffiliateDisclosure,
  };
  const Page = pages[pathname as keyof typeof pages] || NotFound;
  return <MainLayout><Page /></MainLayout>;
}
