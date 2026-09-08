import type { ReactNode } from "react";

export default function Dropdown({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return <details className="relative"><summary className="list-none">{trigger}</summary><div className="absolute right-0 top-full z-10 mt-2 min-w-40 rounded-[14px] border border-border bg-white p-2 shadow-card">{children}</div></details>;
}
