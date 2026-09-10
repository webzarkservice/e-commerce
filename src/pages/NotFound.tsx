import { Card } from "../components/ui";
import PageFrame from "./PageFrame";

export default function NotFound() {
  return <PageFrame title="That page is not available" intro="Use the catalog to find and compare business hardware."><Card className="max-w-xl p-7"><a className="inline-flex rounded-[10px] bg-webzark px-4 py-3 text-sm font-bold text-white shadow-button hover:bg-webzark-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2" href="/products">Browse products</a></Card></PageFrame>;
}
