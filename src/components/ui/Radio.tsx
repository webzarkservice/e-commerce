import type { InputHTMLAttributes } from "react";

export default function Radio({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="radio" className={`h-4 w-4 rounded-full border-border text-webzark focus:ring-webzark ${className}`} />;
}
