import Home from '../pages/Home/Home';
import MainLayout from '../layouts/MainLayout';
import CategoryProducts from "../pages/Products/CategoryProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Search from "../pages/Search/Search";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Account from "../pages/Account/Account";
import Profile from "../pages/Account/Profile";
import Orders from "../pages/Account/Orders";
import OrderDetails from "../pages/Account/OrderDetails";
import AuthLayout from "../components/layout/AuthLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminCustomers from "../pages/Admin/AdminCustomers";
import AdminResource from "../pages/Admin/AdminResource";

export default function Router() {
  const path = window.location.pathname;
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(path);
  const isAccountPage = path.startsWith("/account");
  const isOrderPage = path === "/account/orders" || path === "/account/orders/details";
  const isAdminPage = path.startsWith("/admin");
  const authenticated = localStorage.getItem("webzark-auth") === "true";
  const Page = path === "/admin/products" || path === "/admin/products/new" || path.includes("/edit") ? AdminProducts
    : path === "/admin/orders" ? AdminOrders
    : path === "/admin/customers" ? AdminCustomers
    : path === "/admin/users" ? () => <AdminResource title="Users" description="Review customer access and account status." />
    : path === "/admin/categories" ? () => <AdminResource title="Categories" description="Organize the catalog without changing product data contracts." />
    : path === "/admin/analytics" ? () => <AdminResource title="Analytics" description="Review operational performance once finalized metrics are available." />
    : path === "/admin/import" ? () => <AdminResource title="Bulk import" description="Prepare catalog files for validation and import." />
    : path === "/admin" ? AdminDashboard
    : path === "/products/category" ? CategoryProducts
    : path === "/product" ? ProductDetails
    : path === "/search" ? Search
    : path === "/cart" ? Cart
    : path === "/checkout" ? Checkout
    : path === "/order-success" ? OrderSuccess
    : path === "/login" ? Login
    : path === "/register" ? Register
    : path === "/forgot-password" ? ForgotPassword
    : path === "/account" ? Account
    : path === "/account/profile" ? Profile
    : path === "/account/orders" ? Orders
    : path === "/account/orders/details" ? OrderDetails
    : Home;

  if (isAuthPage) return <AuthLayout><Page /></AuthLayout>;
  if (isAccountPage && !isOrderPage && !authenticated) return <AuthLayout><Login /></AuthLayout>;
  if (isAdminPage) return <Page />;
  return <MainLayout><Page /></MainLayout>;
}
