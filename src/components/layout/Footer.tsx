export default function Footer() {
  return (
    <footer className="border-t border-border bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 pb-20 pt-7 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7 lg:px-8">
        <span>© 2026 Webzark Marketplace</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a className="inline-flex min-h-11 items-center hover:text-webzark sm:min-h-0" href="/how-it-works">How it works</a>
          <a className="inline-flex min-h-11 items-center hover:text-webzark sm:min-h-0" href="/affiliate-disclosure">Affiliate disclosure</a>
        </div>
      </div>
    </footer>
  );
}
