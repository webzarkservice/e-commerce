import Button from "./Button";

export default function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) {
  return <nav aria-label="Pagination" className="flex items-center gap-2">{Array.from({ length: pages }, (_, index) => index + 1).map((item) => <Button key={item} variant={item === page ? "primary" : "secondary"} className="px-3 py-2" onClick={() => onChange(item)}>{item}</Button>)}</nav>;
}
