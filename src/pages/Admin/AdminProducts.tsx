import { Card, Table } from "../../components/ui";
import { products } from "../../data/data";
import AdminLayout from "./AdminLayout";

export default function AdminProducts() {
  return (
    <AdminLayout>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">Catalog</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-.05em] text-navy">Products</h1>
          <p className="mt-2 text-sm text-muted">Keep pricing, stock, and merchandising in sync.</p>
        </div>
        <button className="rounded-[14px] bg-webzark px-4 py-3 text-sm font-bold text-white hover:bg-webzark-dark">Add product</button>
      </header>
      <Card className="overflow-x-auto">
        <Table>
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="font-bold text-navy">{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td><span className={product.stock < 10 ? "text-amber-600" : "text-success"}>{product.stock < 10 ? "Low stock" : "Active"}</span></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
}
