import type { ReactNode } from "react";

export default function CategoryCard({ name, text, image, icon, onClick, delay = 0 }: { name: string; text: string; image: string; icon: ReactNode; onClick: () => void; delay?: number }) {
  return (
    <button data-aos="fade-up" data-aos-delay={delay} onClick={onClick} className="group relative flex aspect-[1.35] items-end overflow-hidden rounded-[14px] bg-navy p-2.5 text-left text-white transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-webzark focus-visible:ring-offset-2 hover:shadow-card sm:p-3">
      <img className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" src={image} alt="" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
      <span className="relative z-10"><strong className="block font-display text-sm font-bold sm:text-base">{name}</strong><small className="text-[10px] text-blue-100 sm:text-xs">{text}</small></span>
      <span className="relative z-10 ml-auto scale-75">{icon}</span>
    </button>
  );
}
