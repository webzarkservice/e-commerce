import type { ReactNode } from "react";

export default function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-[14px] px-2 py-1 text-[10px] font-bold ${className}`}>{children}</span>;
}
