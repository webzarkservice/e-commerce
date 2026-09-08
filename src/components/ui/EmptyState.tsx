import type { ReactNode } from "react";

export default function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="rounded-[14px] border border-dashed border-border bg-white p-8 text-center"><h2 className="font-display font-bold text-navy">{title}</h2>{children && <div className="mt-2 text-sm text-muted">{children}</div>}</div>;
}
