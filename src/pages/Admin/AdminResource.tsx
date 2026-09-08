import { Card, EmptyState } from "../../components/ui";
import AdminLayout from "./AdminLayout";

export default function AdminResource({ title, description }: { title: string; description: string }) {
  return (
    <AdminLayout>
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-webzark">Operations</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-.05em] text-navy">{title}</h1>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </header>
      <Card data-aos="fade-up" className="p-6">
        <EmptyState title={`${title} is ready for data`}>Connect this view to the existing service contract when the backend resource is available.</EmptyState>
      </Card>
    </AdminLayout>
  );
}
