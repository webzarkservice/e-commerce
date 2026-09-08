import type { ReactNode } from "react";

export default function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-40 flex justify-end rounded-[14px] bg-navy/40" onClick={onClose}><aside className="h-full w-full max-w-md rounded-[14px] bg-white p-6" onClick={(event) => event.stopPropagation()}>{children}</aside></div>;
}
