import type { ReactNode } from "react";

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-40 grid place-items-center rounded-[14px] bg-navy/40 p-4" onClick={onClose}><div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-[14px] bg-white p-6" onClick={(event) => event.stopPropagation()}>{children}</div></div>;
}
