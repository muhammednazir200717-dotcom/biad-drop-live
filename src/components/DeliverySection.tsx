const deliveryData = [
  { num: "03", label: "DAYS", sub: "Lagos Delivery" },
  { num: "07", label: "DAYS", sub: "Nationwide" },
  { num: "14", label: "DAYS", sub: "International" },
];

const DeliverySection = () => {
  return (
    <section id="delivery" className="py-20 px-10 bg-card text-center transition-colors duration-300">
      <p className="font-body font-normal text-[10px] tracking-[8px] text-muted-foreground uppercase mb-2">
        GETTING YOUR DRIP
      </p>
      <h2 className="font-heading text-[clamp(36px,5vw,58px)] tracking-[4px] text-foreground leading-none pb-[70px]">
        DELIVERY
      </h2>
      <div className="max-w-[700px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
        {deliveryData.map((d) => (
          <div key={d.sub} className="border border-border p-7 bg-background">
            <div className="font-heading text-[42px] text-foreground">{d.num}</div>
            <div className="font-heading text-[17px] tracking-[3px] text-foreground mb-2">{d.label}</div>
            <div className="font-body text-[13px] tracking-[2px] text-muted-foreground">{d.sub}</div>
          </div>
        ))}
      </div>
      <p className="mt-7 font-body text-[15px] tracking-[2px] text-muted-foreground">
        Free delivery on orders over ₦50,000
      </p>
    </section>
  );
};

export default DeliverySection;
