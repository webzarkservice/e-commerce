import type { ReactNode } from "react";

export default function RevealOnScroll({ children, className = "", animation = "fade-up" }: { children: ReactNode; className?: string; animation?: string }) {
  return <div className={className} data-aos={animation}>{children}</div>;
}
