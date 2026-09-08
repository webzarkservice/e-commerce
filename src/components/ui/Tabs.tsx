import type { ReactNode } from "react";

export default function Tabs({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[14px] ${className}`}>{children}</div>;
}
