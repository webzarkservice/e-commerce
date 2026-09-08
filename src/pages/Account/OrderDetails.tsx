import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Download,
  MapPin,
  PackageCheck,
  RotateCcw,
  Truck,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../../components/ui";

type Order = {
  orderNumber: string;
  customer: { name: string; email: string; phone: string };
  address: { line1: string; city: string; state: string; pin: string; country: string };
  payment: { label: string; lastFour: string };
  items: { productId: number; name: string; category: string; price: number; image: string; quantity: number }[];
  totals: { subtotal: number; discount: number; shipping: number; total: number };
  placedAt: string;
};

const money = (value: number) => `$${value.toFixed(2)}`;

function readOrder(): Order | null {
  try {
    const latest = JSON.parse(localStorage.getItem("webzark-last-order") || "null") as Order | null;
    if (latest?.items?.length) return latest;
    const history = JSON.parse(localStorage.getItem("webzark-order-history") || "[]") as Order[];
    return history[0] || null;
  } catch {
    return null;
  }
}

export default function OrderDetails() {
  const order = readOrder();

  if (!order) {
    return (
      <main className="min-h-screen bg-page px-4 py-16 text-center text-ink">
        <h1 className="font-display text-2xl font-extrabold text-navy">No recent order found</h1>
        <p className="mt-2 text-sm text-muted">Place an order to view its details here.</p>
        <Button className="mt-6" onClick={() => { window.location.href = "/"; }}>Browse hardware</Button>
      </main>
    );
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const date = new Date(order.placedAt);

  return (
    <main className="min-h-screen bg-page px-3 py-6 text-ink sm:px-5 sm:py-8 md:px-8">
      <div className="mx-auto max-w-[1240px]">
        <nav className="text-[10px] text-muted">
          <a href="/" className="text-webzark">Home</a><span className="mx-2">/</span>
          <a href="/account/orders" className="text-webzark">My Orders</a><span className="mx-2">/</span>
          Order #{order.orderNumber}
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-[-.05em] text-navy sm:text-4xl">Order details</h1>
            <p className="mt-1 text-xs text-muted">View full details of your order, track its status and manage your request.</p>
          </div>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-[10px] font-bold text-webzark hover:bg-blue-50">
            <Download size={13} /> Print invoice
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.25fr_.95fr]">
          <section className="flex items-center justify-between rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xs font-extrabold text-navy">Order #{order.orderNumber}</h2>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700"><Check size={10} className="mr-1 inline" /> Delivered</span>
              </div>
              <p className="mt-1 text-[10px] text-muted">Placed on {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="mt-1 text-[10px] text-muted">{itemCount} items · {money(order.totals.total)} USD</p>
            </div>
            <Truck className="text-webzark" size={22} />
          </section>
          <section className="flex items-center justify-between rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)]">
            <div><h2 className="text-xs font-extrabold text-navy">Need help with this order?</h2><p className="mt-1 text-[10px] text-muted">Get support or raise a request.</p></div>
            <Button variant="secondary" className="border border-webzark bg-white px-3 py-2 text-[10px] text-webzark"><span>Contact support</span></Button>
          </section>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.45fr_.75fr]">
          <div className="space-y-3">
            <section className="rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)] sm:p-5">
              <h2 className="text-xs font-extrabold text-navy">Items in this order</h2>
              <div className="mt-4 divide-y divide-border">
                {order.items.map((item) => (
                  <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" key={item.productId}>
                    <img className="h-14 w-14 shrink-0 rounded-lg bg-soft object-cover" src={item.image} alt={item.name} />
                    <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold text-navy">{item.name}</p><p className="mt-1 text-[10px] text-muted">{item.category}</p><p className="mt-1 text-[9px] text-webzark">Sold by Webzark</p></div>
                    <div className="hidden text-right sm:block"><strong className="text-xs text-navy">{money(item.price * item.quantity)}</strong><p className="mt-1 text-[9px] text-muted">Qty: {item.quantity}</p></div>
                    <Button variant="secondary" className="hidden border border-blue-200 bg-white px-3 py-2 text-[10px] text-webzark sm:inline-flex">Buy again</Button>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-3 md:grid-cols-2">
              <InfoCard icon={<MapPin size={15} />} title="Shipping address">
                <strong>{order.customer.name}</strong>
                <span>{order.address.line1}</span>
                <span>{order.address.city}, {order.address.state} {order.address.pin}</span>
                <span>{order.address.country}</span>
              </InfoCard>
              <InfoCard icon={<CreditCard size={15} />} title="Payment information">
                <strong>{order.payment.label}</strong>
                <span>{order.payment.lastFour ? `Visa ending in ${order.payment.lastFour}` : "Payment confirmed"}</span>
                <span>Payment date: {date.toLocaleDateString()}</span>
                <span className="mt-1 font-bold text-emerald-600">Paid</span>
              </InfoCard>
            </div>
          </div>

          <aside className="space-y-3">
            <section className="rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)]">
              <h2 className="text-xs font-extrabold text-navy">Delivery status</h2>
              <div className="mt-5 space-y-4">
                {["Order placed", "Processing", "Shipped", "Out for delivery", "Delivered"].map((step, index) => (
                  <div className="flex gap-3" key={step}>
                    <div className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">{index < 4 && <span className="absolute left-1/2 top-5 h-5 w-px bg-emerald-300" />}<Check size={11} /></div>
                    <div><p className="text-[10px] font-bold text-navy">{step}</p><p className="mt-0.5 text-[9px] text-muted">{index === 4 ? "Delivered recently" : index === 0 ? date.toLocaleDateString() : "Completed"}</p></div>
                  </div>
                ))}
              </div>
              <Button className="mt-5 w-full text-[10px]">Track on courier site <ArrowRight size={13} /></Button>
              <Button variant="secondary" className="mt-2 w-full border border-webzark bg-white text-[10px] text-webzark">View delivery proof</Button>
            </section>

            <section className="rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)]">
              <h2 className="text-xs font-extrabold text-navy">Order actions</h2>
              <ActionRow icon={<Download size={13} />} label="Download invoice" />
              <ActionRow icon={<RotateCcw size={13} />} label="Request return" />
              <ActionRow icon={<PackageCheck size={13} />} label="Get help" />
              <ActionRow icon={<Truck size={13} />} label="Buy again" />
            </section>
          </aside>
        </div>

        <section className="mt-3 rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)] sm:p-5">
          <h2 className="text-xs font-extrabold text-navy">Payment summary</h2>
          <div className="mt-4 max-w-sm space-y-2 text-[10px] text-muted">
            <div className="flex justify-between"><span>Subtotal</span><strong className="text-navy">{money(order.totals.subtotal)}</strong></div>
            <div className="flex justify-between"><span>Discount</span><strong className="text-emerald-600">-{money(order.totals.discount)}</strong></div>
            <div className="flex justify-between"><span>Shipping</span><strong className="text-emerald-600">{order.totals.shipping ? money(order.totals.shipping) : "Free"}</strong></div>
            <div className="mt-3 flex justify-between rounded-lg bg-blue-50 px-3 py-3 text-sm font-extrabold text-navy"><span>Total paid</span><span>{money(order.totals.total)} <small className="text-[9px] font-normal">USD</small></span></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <section className="rounded-[14px] border border-border bg-white p-4 shadow-[0_8px_24px_rgba(23,43,77,.04)]"><h2 className="flex items-center gap-2 text-xs font-extrabold text-navy"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-50 text-webzark">{icon}</span>{title}</h2><div className="mt-4 space-y-1 text-[10px] leading-4 text-muted">{children}</div></section>;
}

function ActionRow({ icon, label }: { icon: ReactNode; label: string }) {
  return <button type="button" className="flex w-full items-center gap-2 border-b border-border py-3 text-left text-[10px] font-semibold text-navy last:border-0 hover:text-webzark"><span className="text-webzark">{icon}</span>{label}<ChevronRight size={13} className="ml-auto text-muted" /></button>;
}
