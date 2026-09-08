import { useEffect } from "react";
import AOS from "aos";
import Router from "./routes/Router";
import { CartProvider } from "./context/CartContext";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      mirror: false,
      once: true,
      offset: 80,
      disable: () =>
        (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
        window.innerWidth < 768,
    });
  }, []);

  return <CartProvider><Router /></CartProvider>;
}
