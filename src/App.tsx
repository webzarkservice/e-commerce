import Router from "./routes/Router";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return <WishlistProvider><Router /></WishlistProvider>;
}
