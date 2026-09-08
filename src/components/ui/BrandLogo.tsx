type BrandLogoProps = {
  className?: string;
  inverse?: boolean;
};

export default function BrandLogo({ className = "", inverse = false }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap ${className}`}>
      webzark <i className={`font-normal ${inverse ? "text-blue-300" : "text-webzark"}`}>/</i>
      <small className={`ml-1 text-[7px] font-bold tracking-[.18em] ${inverse ? "text-blue-300" : "text-muted"}`}>
        MARKETPLACE
      </small>
    </span>
  );
}
