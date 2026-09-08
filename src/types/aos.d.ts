declare module "aos" {
  type AOSOptions = {
    duration?: number;
    easing?: string;
    mirror?: boolean;
    once?: boolean;
    offset?: number;
    disable?: boolean | string | (() => boolean);
  };

  const AOS: {
    init(options?: AOSOptions): void;
    refresh(): void;
  };

  export default AOS;
}
