import type { ReactNode } from "react";

export default function Tooltip({ content, children }: { content: string; children: ReactNode }) {
  return <span className="group relative inline-flex">{children}<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-[14px] bg-navy px-2 py-1 text-xs text-white group-hover:block">{content}</span></span>;
}
