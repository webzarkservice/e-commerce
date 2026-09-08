import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Input } from "../../components/ui";

type Order = {
  orderNumber: string;
  customer: { name: string; email: string };
  items: { productId: number; name: string; image: string; quantity: number }[];
  totals: { total: number };
  placedAt: string;
};

const HISTORY_KEY = "webzark-order-history";
const LAST_ORDER_KEY = "webzark-last-order";

function readOrders(): Order[] {
  try {
    const history = JSON.parse(
      localStorage.getItem(HISTORY_KEY) || "[]",
    ) as Order[];
    const latest = JSON.parse(
      localStorage.getItem(LAST_ORDER_KEY) || "null",
    ) as Order | null;
    const orders = Array.isArray(history) ? history : [];
    return latest &&
      !orders.some((order) => order.orderNumber === latest.orderNumber)
      ? [latest, ...orders]
      : orders;
  } catch {
    return [];
  }
}

export default function Orders() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const orders = useMemo(
    () =>
      readOrders().filter((order) => {
        const matchesQuery =
          `${order.orderNumber} ${order.items.map((item) => item.name).join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return (
          matchesQuery && (filter === "All Orders" || filter === "Delivered")
        );
      }),
    [query, filter],
  );

  return (
    <main className="min-h-screen bg-page px-3 py-6 text-ink sm:px-5 sm:py-8 md:px-8">
      <div className="mx-auto max-w-[1240px]">
        <nav className="text-[10px] text-muted">
          <a href="/" className="text-webzark">
            Home
          </a>
          <span className="mx-2">/</span>My Orders
        </nav>
        <div className="mt-4 flex items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-[-.05em] text-navy sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-1 text-xs text-muted">
              Track, view and manage all your orders in one place.
            </p>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-xs font-bold text-navy">Quality products</p>
            <p className="text-xs font-bold text-navy">For a better tomorrow</p>
            <div className="mt-2 h-0.5 w-8 bg-webzark" />
          </div>
        </div>

        <section className="mt-7 overflow-hidden rounded-[14px] border border-border bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-3 pt-3 sm:px-5">
            <div className="flex gap-5 overflow-x-auto">
              {[
                "All Orders",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
              ].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`whitespace-nowrap border-b-2 px-1 pb-3 text-[10px] font-bold ${filter === tab ? "border-webzark text-webzark" : "border-transparent text-muted hover:text-navy"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex w-full gap-2 pb-3 sm:w-auto">
              <div className="relative min-w-0 flex-1 sm:w-48">
                <Search
                  size={14}
                  className="absolute left-3 top-2.5 text-muted"
                />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search orders..."
                  className="h-8 rounded-lg pl-8 py-1 text-[10px]"
                />
              </div>
              <button
                type="button"
                className="flex h-8 items-center gap-2 rounded-lg border border-border px-3 text-[10px] font-bold text-navy"
              >
                <SlidersHorizontal size={13} /> Latest <ChevronDown size={12} />
              </button>
            </div>
          </div>

          <div className="space-y-2 p-3 sm:p-5">
            {orders.length ? (
              orders.map((order) => (
                <OrderRow key={order.orderNumber} order={order} />
              ))
            ) : (
              <div className="py-14 text-center">
                <p className="font-display text-lg font-bold text-navy">
                  No orders found
                </p>
                <p className="mt-2 text-xs text-muted">
                  Completed orders will appear here after checkout.
                </p>
                <Button
                  className="mt-5 text-xs"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Browse hardware
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-[10px] text-muted sm:px-5">
            <span>
              Showing {orders.length} order{orders.length === 1 ? "" : "s"}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded border border-border"
              >
                ‹
              </button>
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded bg-webzark font-bold text-white"
              >
                1
              </button>
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded border border-border"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function OrderRow({ order }: { order: Order }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <article className="grid gap-4 rounded-[14px] border border-border p-3 transition hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(23,43,77,.05)] sm:grid-cols-[1.15fr_1.1fr_.8fr_auto] sm:items-center sm:p-4">
      <div>
        <p className="text-[11px] font-bold text-navy">
          Order #{order.orderNumber}
        </p>
        <p className="mt-1 text-[10px] text-muted">
          Placed on {new Date(order.placedAt).toLocaleDateString()}
        </p>
        <p className="mt-1 text-[10px] text-muted">
          {itemCount} item{itemCount === 1 ? "" : "s"} · $
          {order.totals.total.toFixed(2)} USD
        </p>
        <a
          href="/account/orders/details"
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-webzark"
        >
          View details <ArrowRight size={11} />
        </a>
      </div>
      <div className="flex min-w-0 gap-2 overflow-hidden">
        {order.items.slice(0, 3).map((item) => (
          <img
            key={item.productId}
            className="h-12 w-12 shrink-0 rounded-[10px] bg-soft object-cover"
            src={item.image}
            alt={item.name}
          />
        ))}
        {order.items.length > 3 && (
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-blue-50 text-[10px] font-bold text-webzark">
            +{order.items.length - 3} more
          </span>
        )}
      </div>
      <div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700">
          Delivered
        </span>
        <p className="mt-2 text-[10px] text-muted">Delivered recently</p>
      </div>
      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <strong className="text-sm text-navy">
          ${order.totals.total.toFixed(2)}{" "}
          <small className="text-[9px] font-normal text-muted">USD</small>
        </strong>
        <button
          type="button"
          aria-label="More order actions"
          className="text-muted hover:text-navy"
        >
          <MoreVertical size={16} />
        </button>
        <Button className="w-full min-w-28 text-[10px] sm:w-auto">
          Buy again
        </Button>
      </div>
    </article>
  );
}
