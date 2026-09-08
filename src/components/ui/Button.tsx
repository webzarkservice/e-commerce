import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-3 rounded-[14px] px-4 py-3 text-sm font-bold transition duration-200 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark ${variant === "primary" ? "bg-webzark text-white hover:bg-webzark-dark" : "bg-soft text-navy hover:bg-slate-200"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
