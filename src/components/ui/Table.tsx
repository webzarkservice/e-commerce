import type { TableHTMLAttributes } from "react";

export default function Table({ className = "", ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <div className="overflow-auto rounded-[14px] border border-border"><table {...props} className={`w-full text-left text-sm ${className}`} /></div>;
}
