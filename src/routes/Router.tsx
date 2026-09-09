import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Wishlist from "../pages/Wishlist/Wishlist";
import Products from "../pages/Products/Products";

export default function Router() {
  const Page = window.location.pathname === "/wishlist"
    ? Wishlist
    : window.location.pathname === "/products"
      ? Products
      : Home;
  return <MainLayout><Page /></MainLayout>;
}
