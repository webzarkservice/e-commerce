import { Card, Table } from "../../components/ui";
import AdminLayout from "./AdminLayout";

const orders = [
  ["#WZ-1048", "Northline Goods", "$648", "Processing"],
  ["#WZ-1047", "Rook Coffee", "$229", "Shipped"],
  ["#WZ-1046", "Morrow Market", "$423", "Delivered"],
  ["#WZ-1045", "Good Supply Co.", "$74", "Delivered"],
];

export default function AdminOrders() {
  return (
    <AdminLayout>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">Operations</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-.05em] text-navy">Orders</h1>
        <p className="mt-2 text-sm text-muted">Review recent purchases and fulfilment status.</p>
      </header>
      <Card className="overflow-x-auto">
        <Table>
          <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>{orders.map(([id, customer, total, status]) => <tr key={id}><td className="font-bold text-navy">{id}</td><td>{customer}</td><td>{total}</td><td><span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-webzark">{status}</span></td></tr>)}</tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
}
