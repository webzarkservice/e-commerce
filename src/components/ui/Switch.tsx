import type { InputHTMLAttributes } from "react";

export default function Switch({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="checkbox" role="switch" className={`h-5 w-9 rounded-full border-border text-webzark focus:ring-webzark ${className}`} />;
}
