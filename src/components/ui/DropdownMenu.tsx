import type { ButtonHTMLAttributes, ReactNode } from "react";

export default function DropdownMenu({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return <button {...props} className={`block w-full rounded-[14px] px-3 py-2 text-left text-sm text-ink hover:bg-soft ${className}`}>{children}</button>;
}
