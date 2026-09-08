import {
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Truck,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../../components/ui";

const money = (value: number) => `$${value.toFixed(2)}`;
const ORDER_STORAGE_KEY = "webzark-last-order";

type StoredOrder = {
  orderNumber: string;
  customer: { name: string; email: string; phone: string };
  address: { line1: string; city: string; state: string; pin: string; country: string };
  payment: { method: string; label: string; lastFour: string };
  items: { productId: number; name: string; category: string; price: number; image: string; quantity: number }[];
  totals: { subtotal: number; discount: number; shipping: number; total: number };
  placedAt: string;
};

function readOrder(): StoredOrder | null {
  try {
    const value = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "null") as StoredOrder | null;
    return value?.items?.length ? value : null;
  } catch {
    return null;
  }
}

export default function OrderSuccess() {
  const order = readOrder();
  if (!order) {
    return (
      <main className="min-h-screen bg-page px-4 py-16 text-center text-ink">
        <h1 className="font-display text-2xl font-extrabold text-navy">No recent order found</h1>
        <p className="mt-2 text-sm text-muted">Return to checkout to place an order.</p>
        <Button className="mt-6" onClick={() => { window.location.href = "/checkout"; }}>Go to checkout</Button>
      </main>
    );
  }
  const { customer, address, payment, items, totals } = order;

  return (
    <main className="min-h-screen bg-page px-3 py-10 text-ink sm:px-5 sm:py-14 md:px-8">
      <div className="mx-auto max-w-[1680px]">
        <section className="text-center" data-aos="fade-up">
          <div className="relative mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-[0_0_0_10px_rgba(16,185,129,.08)]">
            <CheckCircle2 size={38} strokeWidth={2.2} />
            <span className="absolute -inset-8 -z-10 bg-[radial-gradient(circle,rgba(16,185,129,.14),transparent_68%)]" />
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-.05em] text-navy sm:text-4xl">
            Order placed successfully
          </h1>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted sm:text-sm">
            Thanks for shopping with Webzark. Your order is confirmed and is now being processed.
          </p>
          <div className="mx-auto mt-6 flex max-w-[560px] items-center justify-between gap-3 rounded-[14px] border border-blue-100 bg-white px-4 py-3 text-[10px] text-muted shadow-[0_8px_24px_rgba(23,43,77,.04)]">
            <span className="flex min-w-0 items-center gap-2 text-left">
              <Mail size={14} className="shrink-0 text-webzark" />
              <span className="truncate">
                A confirmation email has been sent to <strong className="text-navy">{customer.email}</strong>
              </span>
            </span>
            <button type="button" className="shrink-0 font-bold text-webzark hover:text-webzark-dark">
              Resend email
            </button>
          </div>
        </section>

        <section className="mt-7 overflow-hidden rounded-[14px] border border-border bg-white shadow-card" data-aos="fade-up">
          <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,.85fr)]">
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-base font-extrabold text-navy sm:text-lg">Order details</h2>
                  <p className="mt-1 text-[10px] text-muted">Here&apos;s a summary of your purchase.</p>
                </div>
                <div className="text-right text-[10px] text-muted">
                  <strong className="block text-navy">Order #{order.orderNumber}</strong>
                  <span>Placed {new Date(order.placedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-5 divide-y divide-border border-y border-border">
                {items.map(({ productId, name, category, image, price, quantity }) => (
                  <div className="flex items-center gap-3 py-3" key={productId}>
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-soft">
                      <img className="h-full w-full object-cover" src={image} alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-bold text-navy">{name}</p>
                      <p className="mt-0.5 text-[10px] text-muted">{category}</p>
                    </div>
                    <span className="hidden text-[10px] text-muted sm:block">Qty: {quantity}</span>
                    <strong className="text-xs text-navy">{money(price * quantity)}</strong>
                  </div>
                ))}
              </div>

              <div className="ml-auto mt-5 max-w-[280px] space-y-2 text-[10px] text-muted">
                <div className="flex justify-between"><span>Subtotal</span><strong className="text-navy">{money(totals.subtotal)}</strong></div>
                <div className="flex justify-between"><span>Discount</span><strong className="text-success">-{money(totals.discount)}</strong></div>
                <div className="flex justify-between"><span>Shipping</span><strong className="text-success">{totals.shipping ? money(totals.shipping) : "Free"}</strong></div>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm font-extrabold text-navy">
                  <span>Total paid</span>
                  <span>{money(totals.total)}</span>
                </div>
              </div>
            </div>

            <aside className="border-t border-border bg-slate-50/60 p-4 sm:p-5 md:p-6 lg:border-l lg:border-t-0">
              <div className="space-y-5 text-[10px]">
                <StatusItem icon={<PackageCheck size={15} />} label="Order status" value="Processing" tone="blue" />
                <StatusItem icon={<Truck size={15} />} label="Estimated delivery" value="3-5 business days" detail="You&apos;ll receive a tracking link before your order ships." />
                <StatusItem icon={<MapPin size={15} />} label="Shipping address" value={customer.name} detail={`${address.line1}, ${address.city}, ${address.state} ${address.pin}, ${address.country}`} />
                <StatusItem icon={<CreditCard size={15} />} label="Payment method" value="Paid" detail={`${payment.label}${payment.lastFour ? ` •••• ${payment.lastFour}` : ""}`} tone="green" />
              </div>
              <div className="mt-6 grid gap-2">
                <Button className="w-full text-xs" onClick={() => { window.location.href = "/account/orders"; }}>
                  Track your order <ArrowRight size={14} />
                </Button>
                <Button variant="secondary" className="w-full bg-white text-xs" onClick={() => { window.location.href = "/"; }}>
                  Continue shopping
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8" data-aos="fade-up">
          <div className="text-center">
            <h2 className="font-display text-lg font-extrabold text-navy">Need help?</h2>
            <p className="mt-1 text-[10px] text-muted">We&apos;re here for you. Get in touch with our support team anytime.</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SupportCard icon={<MessageCircle size={16} />} title="Live chat" detail="Chat with our support team" action="Start chat" />
            <SupportCard icon={<Mail size={16} />} title="Email support" detail="support@webzark.com" action="Send email" />
            <SupportCard icon={<Phone size={16} />} title="Call us" detail="+91 1800 123 4567" action="Call now" />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusItem({
  icon,
  label,
  value,
  detail,
  tone = "blue",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail?: string;
  tone?: "blue" | "green";
}) {
  return (
    <div className="flex gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-webzark">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-muted">{label}</span>
          <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${tone === "green" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-webzark"}`}>
            {tone === "green" ? <Check size={10} className="mr-1 inline" /> : null}{value}
          </span>
        </div>
        {tone !== "green" && <strong className="mt-1 block text-navy">{value}</strong>}
        {detail && <p className="mt-1 max-w-[190px] leading-4 text-muted">{detail}</p>}
      </div>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  detail,
  action,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  action: string;
}) {
  return (
    <div className="rounded-[14px] border border-border bg-white p-3 shadow-[0_8px_24px_rgba(23,43,77,.04)]">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-webzark">{icon}</span>
        <div>
          <h3 className="text-[11px] font-bold text-navy">{title}</h3>
          <p className="mt-1 text-[10px] text-muted">{detail}</p>
          <button type="button" className="mt-2 text-[10px] font-bold text-webzark hover:text-webzark-dark">{action} <ArrowRight size={11} className="ml-0.5 inline" /></button>
        </div>
      </div>
    </div>
  );
}
