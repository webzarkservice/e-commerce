function App() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8fb] px-6 py-12 text-slate-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d9e4d7] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#e7e9dc] blur-3xl" />
      <section className="welcome-card relative w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur sm:p-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#71836d] font-bold text-white">T</span>
            Tailwind<span className="text-[#71836d]">/</span>React
          </div>
          <span className="rounded-full border border-[#cbd8c8] bg-[#f0f4ed] px-3 py-1.5 text-xs font-medium text-[#52634f]">
            Ready to build
          </span>
        </div>
        <div className="mt-20 max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#71836d]">
            React + TypeScript
          </p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-slate-900 sm:text-7xl">
            Tailwind CSS is working.
          </h1>

        </div>

      </section>
    </main>
  );
}

export default App;
