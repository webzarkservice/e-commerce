import type { TextareaHTMLAttributes } from "react";

export default function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`min-h-24 w-full rounded-[14px] border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-webzark focus:ring-2 focus:ring-blue-100 ${className}`} />;
}
