const BiadHero = () => {
  return (
    <section className="w-full min-h-[88vh] flex flex-col items-center justify-center text-center py-[60px] px-5 relative bg-background overflow-hidden">
      {/* Ghost text behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-heading text-[40vw] text-foreground opacity-[0.03] leading-none tracking-tighter">
          BIAD
        </span>
      </div>

      <h1 className="font-heading text-[clamp(60px,13vw,155px)] leading-[0.9] tracking-tight text-foreground animate-rise-delay-1">
        BIAD.NG
      </h1>
      <p className="font-body font-normal text-xs tracking-[10px] text-muted-foreground uppercase mt-6 mb-[50px] animate-rise-delay-2">
        Authenticity &nbsp;·&nbsp; Culture &nbsp;·&nbsp; Movement
      </p>
      <a
        href="#shop"
        className="font-body font-semibold text-[11px] tracking-[6px] uppercase bg-foreground text-background border border-foreground px-[50px] py-[15px] inline-block transition-all duration-300 hover:bg-transparent hover:text-foreground animate-rise-delay-3"
      >
        SHOP THE DROP
      </a>
    </section>
  );
};

export default BiadHero;
