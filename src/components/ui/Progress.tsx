export default function Progress({ value = 0, className = "" }: { value?: number; className?: string }) {
  return <div className={`h-2 overflow-hidden rounded-[14px] bg-soft ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-[14px] bg-webzark transition-[width] duration-200" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}
