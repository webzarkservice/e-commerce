import type { SelectHTMLAttributes } from "react";

export default function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`rounded-[14px] border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-webzark focus:ring-2 focus:ring-blue-100 ${className}`} />;
}
