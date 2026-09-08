import { Card } from "../../components/ui";
import { products } from "../../data/data";
import AdminLayout from "./AdminLayout";

const metrics = [
  ["Gross sales", "$12,480", "+8.4% this month"],
  ["Orders", "86", "14 awaiting fulfilment"],
  ["Customers", "64", "6 new this week"],
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">Overview</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-.05em] text-navy">Good morning, team.</h1>
        <p className="mt-2 text-sm text-muted">A practical view of your marketplace operations.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map(([label, value, note]) => (
          <Card key={label} className="p-5">
            <p className="text-xs text-muted">{label}</p>
            <strong className="mt-3 block font-display text-3xl text-navy">{value}</strong>
            <span className="mt-2 block text-xs text-success">{note}</span>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Inventory snapshot</h2>
            <a className="text-xs font-bold text-webzark" href="/admin/products">Manage products</a>
          </div>
          <div className="mt-5 grid gap-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0">
                <span className="font-medium text-navy">{product.name}</span>
                <span className={product.stock < 10 ? "font-bold text-amber-600" : "text-muted"}>{product.stock} in stock</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-blue-50 p-6">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">Next action</p>
          <h2 className="mt-3 font-display text-xl font-bold text-navy">Review low-stock items</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Three products are below ten units. Check replenishment before the next order run.</p>
          <a className="mt-5 inline-flex rounded-[14px] bg-webzark px-4 py-3 text-sm font-bold text-white hover:bg-webzark-dark" href="/admin/products">Open inventory</a>
        </Card>
      </div>
    </AdminLayout>
  );
}
