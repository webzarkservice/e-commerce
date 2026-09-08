import type { ReactNode } from "react";

export default function Breadcrumb({ children }: { children: ReactNode }) {
  return <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">{children}</nav>;
}
