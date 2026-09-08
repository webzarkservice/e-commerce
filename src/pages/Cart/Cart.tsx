import { useMemo, useState } from "react";
import { Clock3, LockKeyhole, Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from "lucide-react";
import { Card, Button, EmptyState } from "../../components/ui";
import { products } from "../../data/data";
import { useCart } from "../../context/CartContext";

const money = (value: number) => `$${value.toFixed(2)}`;

export default function Cart() {
  const cart = useCart();
  const entries = products.filter((product) => cart.count(product.id) > 0);
  const entryIds = useMemo(() => entries.map((product) => product.id), [entries]);
  const [selectedIds, setSelectedIds] = useState<number[]>(entryIds);
  const subtotal = entries.reduce((sum, product) => sum + product.price * cart.count(product.id), 0);
  const discount = subtotal >= 300 ? subtotal * 0.05 : 0;
  const total = subtotal - discount;
  const selected = new Set(selectedIds.filter((id) => entryIds.includes(id)));
  const allSelected = entries.length > 0 && selected.size === entries.length;
  const toggleSelected = (id: number) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  const toggleAll = () => setSelectedIds(allSelected ? [] : entryIds);
  const removeSelected = () => {
    selected.forEach((id) => cart.clear(id));
    setSelectedIds([]);
  };

  return (
    <main className="min-h-screen bg-page px-3 py-6 text-ink sm:px-4 sm:py-10 md:px-8">
      <div className="mx-auto max-w-[1680px]">
        <nav className="mb-5 text-[11px] text-muted" aria-label="Breadcrumb">
          <a className="font-semibold text-webzark hover:text-webzark-dark" href="/">Home</a>
          <span className="mx-2">/</span>
          Cart
        </nav>

        <div className="mb-6 flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-[-.04em] text-navy sm:text-3xl">Your cart</h1>
            <p className="mt-1 text-xs text-muted">Review your items and proceed to checkout</p>
          </div>
          <a className="text-xs font-bold text-webzark hover:text-webzark-dark" href="/#catalog">Continue shopping</a>
        </div>

        {entries.length === 0 ? (
          <Card className="p-6 sm:p-10">
            <EmptyState title="Your cart is empty">Add hardware from the catalog to start an order.</EmptyState>
            <a className="mx-auto mt-5 inline-flex rounded-[14px] bg-webzark px-4 py-3 text-sm font-bold text-white hover:bg-webzark-dark" href="/#catalog">
              Browse hardware
            </a>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(290px,.8fr)]">
              <Card className="overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-xs font-semibold text-navy sm:px-5">
                  <input className="h-4 w-4 accent-webzark" type="checkbox" checked={allSelected} onChange={toggleAll} aria-label={`Select all ${cart.total} items`} />
                  Select All ({cart.total} items)
                  {selected.size > 0 && <button className="ml-auto text-[10px] font-bold text-red-500 hover:text-red-700" onClick={removeSelected}>Remove selected</button>}
                </div>
                <div className="divide-y divide-border">
                  {entries.map((product) => {
                    const quantity = cart.count(product.id);
                    return (
                      <article className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-5" key={product.id}>
                        <div className="flex min-w-0 gap-3">
                          <input className="mt-2 h-4 w-4 shrink-0 accent-webzark" type="checkbox" checked={selected.has(product.id)} onChange={() => toggleSelected(product.id)} aria-label={`Select ${product.name}`} />
                          <img className="h-20 w-20 shrink-0 rounded-[14px] bg-soft object-cover sm:h-24 sm:w-24" src={product.image} alt={product.name} />
                          <div className="min-w-0 flex-1">
                            <h2 className="font-display text-sm font-bold leading-5 text-navy">{product.name}</h2>
                            <p className="mt-1 text-[11px] text-muted">{product.category} | Business hardware</p>
                            <p className="mt-1 text-[11px] font-semibold text-success">{product.stock > 0 ? "In stock" : "Out of stock"}</p>
                            <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-muted">
                              <button className="inline-flex items-center gap-1 hover:text-webzark" onClick={() => cart.clear(product.id)}><X size={12} /> Remove</button>
                              <span className="inline-flex items-center gap-1"><LockKeyhole size={12} /> Save for later</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 pl-7 sm:justify-end sm:pl-0">
                          <strong className="font-display text-sm text-navy">{money(product.price * quantity)}</strong>
                          <div className="flex items-center overflow-hidden rounded-[14px] border border-border">
                            <button className="p-2 text-muted hover:bg-soft hover:text-navy" aria-label={`Decrease ${product.name}`} onClick={() => cart.remove(product.id)}><Minus size={13} /></button>
                            <span className="min-w-8 border-x border-border px-2 py-1 text-center text-xs font-bold text-navy">{quantity}</span>
                            <button className="p-2 text-muted hover:bg-soft hover:text-navy" aria-label={`Increase ${product.name}`} onClick={() => cart.add(product.id)}><Plus size={13} /></button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </Card>

              <Card className="h-fit p-5 sm:p-6">
                <h2 className="font-display text-lg font-extrabold text-navy">Order summary</h2>
                <div className="mt-5 space-y-3 border-b border-border pb-5 text-xs">
                  <div className="flex justify-between"><span className="text-muted">Subtotal ({cart.total} items)</span><strong className="text-navy">{money(subtotal)}</strong></div>
                  <div className="flex justify-between"><span className="text-muted">Discount</span><strong className="text-success">-{money(discount)}</strong></div>
                  <div className="flex justify-between"><span className="text-muted">Shipping</span><span className="text-right text-muted">Calculated at checkout</span></div>
                </div>
                <div className="flex items-end justify-between py-5">
                  <div><p className="text-sm font-bold text-navy">Estimated total</p><p className="mt-1 text-[10px] text-muted">Inclusive of applicable taxes</p></div>
                  <strong className="font-display text-2xl text-navy">{money(total)}</strong>
                </div>
                <Button className="w-full rounded-[14px]" onClick={() => { window.location.href = "/checkout"; }}>
                  <ShoppingBag size={15} /> Proceed to Checkout
                </Button>
                <p className="mt-4 flex items-center justify-center gap-1 text-[10px] text-muted"><LockKeyhole size={12} /> Secure checkout with encrypted payments</p>
              </Card>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Card className="flex items-center gap-3 bg-blue-50/70 p-4"><Truck className="text-webzark" size={20} /><div><p className="text-xs font-bold text-navy">Free shipping</p><p className="text-[10px] text-muted">On orders over $500</p></div></Card>
              <Card className="flex items-center gap-3 bg-blue-50/70 p-4"><ShieldCheck className="text-webzark" size={20} /><div><p className="text-xs font-bold text-navy">Secure payments</p><p className="text-[10px] text-muted">Your data is protected</p></div></Card>
              <Card className="flex items-center gap-3 bg-blue-50/70 p-4"><Clock3 className="text-webzark" size={20} /><div><p className="text-xs font-bold text-navy">Easy returns</p><p className="text-[10px] text-muted">30-day return policy</p></div></Card>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
