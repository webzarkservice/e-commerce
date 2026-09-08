import { Card, Table } from "../../components/ui";
import AdminLayout from "./AdminLayout";

const customers = [
  ["Northline Goods", "ops@northline.example", "12 orders", "$2,840"],
  ["Rook Coffee", "hello@rook.example", "8 orders", "$1,420"],
  ["Morrow Market", "buying@morrow.example", "5 orders", "$912"],
  ["Good Supply Co.", "team@goodsupply.example", "3 orders", "$386"],
];

export default function AdminCustomers() {
  return (
    <AdminLayout>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">Relationships</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-.05em] text-navy">Customers</h1>
        <p className="mt-2 text-sm text-muted">A simple view of the businesses you support.</p>
      </header>
      <Card className="overflow-x-auto">
        <Table>
          <thead><tr><th>Business</th><th>Contact</th><th>Orders</th><th>Lifetime value</th></tr></thead>
          <tbody>{customers.map(([name, email, count, value]) => <tr key={email}><td className="font-bold text-navy">{name}</td><td>{email}</td><td>{count}</td><td>{value}</td></tr>)}</tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
}
