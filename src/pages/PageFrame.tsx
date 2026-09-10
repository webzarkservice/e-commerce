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
          : "min-h-screen bg-page px-4 py-9 text-ink sm:px-6 sm:py-12 md:py-16 lg:px-8 "
      }
    >
      <div
        className={centered ? "mx-auto text-center" : "mx-auto max-w-[1440px]"}
      >
        <RevealOnScroll>
          <h1 className="max-w-3xl font-display text-[2.15rem] font-extrabold leading-[1.03] tracking-[-.04em] text-navy sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:mt-4 sm:text-base sm:leading-7">
              {intro}
            </p>
          )}
        </RevealOnScroll>
        <div className={centered ? "mt-6 text-left" : "mt-8 sm:mt-12"}>{children}</div>
      </div>
    </main>
  );
}
