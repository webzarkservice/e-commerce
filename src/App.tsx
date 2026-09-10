import Router from "./routes/Router";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return <ThemeProvider><WishlistProvider><Router /></WishlistProvider></ThemeProvider>;
}
