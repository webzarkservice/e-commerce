import type { InputHTMLAttributes } from "react";

export default function Checkbox({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="checkbox" className={`h-4 w-4 rounded-[14px] border-border text-webzark focus:ring-webzark ${className}`} />;
}
