export default function Spinner({ className = "" }: { className?: string }) {
  return <span aria-label="Loading" className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-soft border-t-webzark ${className}`} />;
}
