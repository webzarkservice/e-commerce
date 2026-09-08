import type { ReactNode } from "react";
import RevealOnScroll from "../components/motion/RevealOnScroll";

export default function PageFrame({
  title,
  intro,
  children,
  centered = false,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <main
      className={
        centered
          ? "bg-transparent p-0 text-ink"
          : "min-h-screen bg-page px-3 py-8 text-ink sm:px-4 sm:py-12 md:px-8 "
      }
    >
      <div
        className={centered ? "mx-auto text-center" : "mx-auto max-w-[1680px]"}
      >
        <RevealOnScroll>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-webzark">
            Webzark Marketplace
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-[-.05em] text-navy sm:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
              {intro}
            </p>
          )}
        </RevealOnScroll>
        <div className={centered ? "mt-6 text-left" : "mt-10"}>{children}</div>
      </div>
    </main>
  );
}
