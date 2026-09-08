import type { ButtonHTMLAttributes, ReactNode } from "react";

export default function IconButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return <button {...props} className={`inline-grid place-items-center rounded-[14px] p-2 transition hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark ${className}`}>{children}</button>;
}
