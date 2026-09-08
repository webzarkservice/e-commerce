import type { ReactNode } from "react";

export default function Accordion({ title, children }: { title: ReactNode; children: ReactNode }) {
  return <details className="rounded-[14px] border border-border bg-white p-3"><summary className="cursor-pointer font-medium text-ink">{title}</summary><div className="pt-3 text-sm text-muted">{children}</div></details>;
}
