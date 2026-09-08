import type { ImgHTMLAttributes, ReactNode } from "react";

export default function Avatar({ children, className = "", ...props }: ImgHTMLAttributes<HTMLImageElement> & { children?: ReactNode }) {
  return props.src ? <img {...props} alt={props.alt ?? ""} className={`h-10 w-10 rounded-[14px] object-cover ${className}`} /> : <span className={`grid h-10 w-10 place-items-center rounded-[14px] bg-soft text-sm font-bold text-navy ${className}`}>{children}</span>;
}
