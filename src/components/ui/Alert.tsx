import type { ReactNode } from "react";

export default function Alert({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div role="alert" className={`rounded-[14px] border border-border bg-blue-50 p-4 text-sm text-ink ${className}`}>{children}</div>;
}
