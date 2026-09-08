import { useState, type ReactNode } from "react";
import { ArrowRight, Banknote, Check, CreditCard, LockKeyhole, MapPin, UserRound, Wallet } from "lucide-react";
import { Button, Card, Input, Label } from "../../components/ui";
import { products } from "../../data/data";
import { useCart } from "../../context/CartContext";

const money = (value: number) => `$${value.toFixed(2)}`;
const ORDER_STORAGE_KEY = "webzark-last-order";
const ORDER_HISTORY_KEY = "webzark-order-history";

export default function Checkout() {
  const cart = useCart();
  const directProduct = products.find((product) => product.id === Number(new URLSearchParams(window.location.search).get("product")));
  const entries = directProduct
    ? [{ product: directProduct, quantity: cart.count(directProduct.id) || 1 }]
    : products.filter((product) => cart.count(product.id)).map((product) => ({ product, quantity: cart.count(product.id) }));
  const subtotal = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  const discount = subtotal >= 300 ? subtotal * 0.05 : 0;
  const shipping = entries.length ? 12 : 0;
  const total = subtotal - discount + shipping;
  const [payment, setPayment] = useState("card");
  const [sameAddress, setSameAddress] = useState(true);
  const [useSavedInfo, setUseSavedInfo] = useState(Boolean(localStorage.getItem("webzark-checkout-profile")));
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const savedInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("webzark-checkout-profile") || "null") as { name?: string; email?: string; address?: string; city?: string; state?: string; pin?: string; country?: string } | null;
    } catch {
      return null;
    }
  })();
  const couponDiscount = appliedCoupon ? subtotal * 0.1 : 0;
  const finalTotal = total - couponDiscount;

  const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!entries.length) return;
    const data = new FormData(event.currentTarget);
    const customer = useSavedInfo && savedInfo ? {
      name: savedInfo.name || "Saved customer",
      email: savedInfo.email || "",
      phone: "",
    } : {
      name: String(data.get("full-name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
    };
    const address = useSavedInfo && savedInfo ? {
      line1: savedInfo.address || "",
      city: savedInfo.city || "",
      state: savedInfo.state || "",
      pin: savedInfo.pin || "",
      country: savedInfo.country || "",
    } : {
      line1: String(data.get("address1") || ""),
      city: String(data.get("city") || ""),
      state: String(data.get("state") || ""),
      pin: String(data.get("pin") || ""),
      country: String(data.get("country") || ""),
    };
    if (!useSavedInfo) {
      localStorage.setItem("webzark-checkout-profile", JSON.stringify({
        name: customer.name,
        email: customer.email,
        address: address.line1,
        city: address.city,
        state: address.state,
        pin: address.pin,
        country: address.country,
      }));
    }
    const order = {
      orderNumber: `WZ-${Date.now().toString().slice(-8)}`,
      customer,
      address,
      payment: {
        method: payment,
        label: payment === "card" ? "Credit/Debit Card" : payment === "upi" ? "UPI" : payment === "bank" ? "Net Banking" : "Wallet",
        lastFour: payment === "card" ? String(data.get("card-number") || "").replace(/\s/g, "").slice(-4) : "",
      },
      items: entries.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        quantity,
      })),
      totals: {
        subtotal,
        discount: discount + couponDiscount,
        shipping,
        total: finalTotal,
      },
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    const history = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || "[]") as unknown[];
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify([order, ...history]));
    cart.clearAll();
    localStorage.removeItem("webzark-cart");
    window.location.href = "/order-success";
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "WEBZARK10") {
      setAppliedCoupon("WEBZARK10");
      setCouponMessage("10% discount applied.");
    } else {
      setAppliedCoupon("");
      setCouponMessage("Enter a valid coupon code.");
    }
  };

  return (
    <main className="min-h-screen bg-page px-3 py-6 text-ink sm:px-4 sm:py-10 md:px-8">
      <div className="mx-auto max-w-[1680px]">
        <nav className="mb-4 text-[11px] text-muted" aria-label="Breadcrumb">
          <a className="font-semibold text-webzark" href="/">Home</a><span className="mx-2">/</span>
          <a className="font-semibold text-webzark" href="/cart">Cart</a><span className="mx-2">/</span>Checkout
        </nav>
        <div className="mb-6 flex items-center justify-between">
          <div><h1 className="font-display text-2xl font-extrabold tracking-[-.04em] text-navy sm:text-3xl">Checkout</h1><p className="text-xs text-muted">Complete your order securely and easily</p></div>
          <div className="hidden items-center gap-2 text-[10px] font-bold text-webzark sm:flex"><LockKeyhole size={18} />Secure checkout</div>
        </div>

        <div className="mb-7 hidden items-start sm:flex">
          {["Customer information", "Shipping information", "Payment method", "Review & place order"].map((step, index) => (
            <div className="relative flex flex-1 flex-col items-center text-center" key={step}>
              {index < 3 && <span className="absolute left-1/2 right-0 top-3 border-t border-blue-200" />}
              <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-webzark text-[10px] font-bold text-white">{index + 1}</span>
              <span className="mt-2 text-[10px] font-semibold text-muted">{step}</span>
            </div>
          ))}
        </div>

        {!entries.length ? (
          <Card className="p-8 text-center"><p className="font-display text-lg font-bold text-navy">Your cart is empty.</p><a className="mt-4 inline-flex rounded-[14px] bg-webzark px-4 py-3 text-sm font-bold text-white" href="/#catalog">Browse hardware</a></Card>
        ) : (
          <form onSubmit={placeOrder}>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(290px,.8fr)]">
              <div className="space-y-4">
                <Card className="p-4 sm:p-5">
                  <SectionTitle number="1" icon={<UserRound size={16} />} title="Customer information" subtitle={useSavedInfo ? "Using your saved checkout information" : "Enter your details to continue"} />
                  {useSavedInfo && savedInfo ? (
                    <div className="mt-5 rounded-[14px] border border-blue-100 bg-blue-50/60 p-4 text-xs text-navy">
                      <p className="font-bold">{savedInfo.name || "Saved customer"}</p>
                      <p className="mt-1 text-muted">{savedInfo.email}</p>
                      <button type="button" className="mt-3 font-bold text-webzark hover:text-webzark-dark" onClick={() => setUseSavedInfo(false)}>Use another address</button>
                    </div>
                  ) : <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Field id="full-name" label="Full name" placeholder="Rohit Saini" required />
                    <Field id="email" label="Email address" type="email" placeholder="rohit@example.com" required />
                    <Field id="phone" label="Phone number" placeholder="+91 98765 43210" required />
                    <Field id="company" label="Company name (optional)" placeholder="Saini Enterprises" />
                    <label className="flex items-center gap-2 text-[11px] text-muted sm:col-span-2"><input className="h-4 w-4 accent-webzark" type="checkbox" defaultChecked /> Save this information for next time</label>
                  </div>}
                </Card>

                <Card className="p-4 sm:p-5">
                  <div className="flex items-center justify-between"><SectionTitle number="2" icon={<MapPin size={16} />} title="Shipping information" subtitle="Enter your delivery address" /><label className="flex items-center gap-2 text-[10px] text-muted"><input className="h-4 w-4 accent-webzark" type="checkbox" checked={sameAddress} onChange={(event) => setSameAddress(event.target.checked)} /> Same as billing address</label></div>
                  {useSavedInfo && savedInfo ? <div className="mt-5 rounded-[14px] border border-blue-100 bg-blue-50/60 p-4 text-xs text-navy"><p className="font-bold">{savedInfo.address}</p><p className="mt-1 text-muted">{savedInfo.city}, {savedInfo.state} {savedInfo.pin}, {savedInfo.country}</p><button type="button" className="mt-3 font-bold text-webzark hover:text-webzark-dark" onClick={() => setUseSavedInfo(false)}>Add another address</button></div> : <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Field id="address1" label="Address line 1" placeholder="123 Industrial Area" required />
                    <Field id="address2" label="Address line 2 (optional)" placeholder="Near Main Road" />
                    <Field id="city" label="City" placeholder="New Delhi" required />
                    <Field id="state" label="State" placeholder="Delhi" required />
                    <Field id="pin" label="PIN code" placeholder="110001" required />
                    <Field id="country" label="Country" placeholder="India" required />
                  </div>}
                  {!sameAddress && <p className="mt-3 text-[10px] text-muted">Billing address fields will be requested after payment details.</p>}
                </Card>

                <Card className="p-4 sm:p-5">
                  <SectionTitle number="3" icon={<CreditCard size={16} />} title="Payment method" subtitle="Choose your preferred payment method" />
                  <div className="mt-5 grid gap-2 sm:grid-cols-4">
                    <PaymentOption value="card" active={payment === "card"} onClick={setPayment} icon={<CreditCard size={18} />} title="Credit/Debit Card" detail="Visa, Mastercard, RuPay" />
                    <PaymentOption value="upi" active={payment === "upi"} onClick={setPayment} icon={<Wallet size={18} />} title="UPI" detail="Google Pay, PhonePe" />
                    <PaymentOption value="bank" active={payment === "bank"} onClick={setPayment} icon={<Banknote size={18} />} title="Net Banking" detail="All major banks" />
                    <PaymentOption value="wallet" active={payment === "wallet"} onClick={setPayment} icon={<Wallet size={18} />} title="Wallet" detail="Paytm, Amazon Pay" />
                  </div>
                  {payment === "card" && <div className="mt-4 grid gap-3 sm:grid-cols-2"><Field id="card-number" label="Card number" placeholder="1234 5678 9012 3456" required /><Field id="card-name" label="Name on card" placeholder="Rohit Saini" required /><Field id="expiry" label="Expiry date" placeholder="MM / YY" required /><Field id="cvv" label="CVV" placeholder="123" required /></div>}
                  <div className="mt-4 flex items-center gap-2 rounded-[14px] bg-blue-50 px-3 py-3 text-[10px] text-muted"><LockKeyhole size={15} className="text-webzark" /> Your payment information is encrypted and secure.</div>
                </Card>
              </div>

              <Card className="h-fit p-4 sm:p-5">
                <div className="flex items-center justify-between"><h2 className="font-display text-lg font-extrabold text-navy">Order summary</h2><a className="text-[10px] font-bold text-webzark" href="/cart">Edit cart</a></div>
                <div className="mt-4 space-y-3 border-b border-border pb-4">
                  {entries.map(({ product, quantity }) => <div className="flex gap-3" key={product.id}><img className="h-12 w-12 rounded-[6px] bg-soft object-cover" src={product.image} alt={product.name} /><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold text-navy">{product.name}</p><p className="text-[10px] text-muted">Qty: {quantity}</p></div><strong className="text-xs text-navy">{money(product.price * quantity)}</strong></div>)}
                </div>
                <div className="border-b border-border py-4">
                  <label className="mb-2 block text-[11px] font-bold text-navy" htmlFor="coupon">Have a promo code?</label>
                  <div className="flex gap-2"><Input id="coupon" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Enter promo code" className="rounded-[14px] py-2 text-xs" /><Button type="button" className="rounded-[14px] px-3 py-2 text-xs" onClick={applyCoupon}>Apply</Button></div>
                  {couponMessage && <p className={`mt-2 text-[10px] ${appliedCoupon ? "text-success" : "text-red-500"}`}>{couponMessage}</p>}
                </div>
                <div className="space-y-2 py-4 text-xs"><div className="flex justify-between"><span className="text-muted">Subtotal ({cart.total} items)</span><strong>{money(subtotal)}</strong></div><div className="flex justify-between"><span className="text-muted">Discount</span><strong className="text-success">-{money(discount + couponDiscount)}</strong></div><div className="flex justify-between"><span className="text-muted">Shipping</span><strong>{money(shipping)}</strong></div></div>
                <div className="flex items-end justify-between border-t border-border py-4"><div><p className="font-bold text-navy">Estimated total</p><p className="text-[10px] text-muted">Inclusive of applicable taxes</p></div><strong className="font-display text-2xl text-navy">{money(finalTotal)}</strong></div>
                <Button className="w-full rounded-[14px]" type="submit"><LockKeyhole size={15} /> Place order <ArrowRight size={15} /></Button>
                <p className="mt-3 text-center text-[10px] text-muted">By placing your order, you agree to our <a className="text-webzark" href="/terms">Terms of Service</a>.</p>
              </Card>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

function SectionTitle({ number, icon, title, subtitle }: { number: string; icon: ReactNode; title: string; subtitle: string }) {
  return <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-webzark text-xs font-bold text-white">{number}</span><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-webzark">{icon}</span><div><h2 className="font-display text-sm font-bold text-navy">{title}</h2><p className="text-[10px] text-muted">{subtitle}</p></div></div>;
}

function Field({ id, label, type = "text", placeholder, required = false }: { id: string; label: string; type?: string; placeholder: string; required?: boolean }) {
  return <div><Label htmlFor={id} className="text-[10px]">{label}{required && <span className="text-red-500"> *</span>}</Label><Input id={id} type={type} placeholder={placeholder} required={required} className="rounded-[14px] py-2 text-xs" /></div>;
}

function PaymentOption({ value, active, onClick, icon, title, detail }: { value: string; active: boolean; onClick: (value: string) => void; icon: ReactNode; title: string; detail: string }) {
  return <button type="button" onClick={() => onClick(value)} className={`rounded-[14px] border p-3 text-left transition ${active ? "border-webzark bg-blue-50 ring-1 ring-webzark" : "border-border hover:border-blue-300"}`}><span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-webzark">{active ? <Check size={15} /> : icon}</span><span className="mt-2 block text-[10px] font-bold text-navy">{title}</span><span className="mt-1 block text-[9px] text-muted">{detail}</span></button>;
}
