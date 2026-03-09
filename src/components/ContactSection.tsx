const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-10 bg-background text-center">
      <p className="font-body font-normal text-[10px] tracking-[8px] text-muted-foreground uppercase mb-2">
        GET AT US
      </p>
      <h2 className="font-heading text-[clamp(36px,5vw,58px)] tracking-[4px] text-foreground leading-none pb-[70px]">
        CONTACT
      </h2>
      <p className="font-body text-[16px] tracking-[3px] text-muted-foreground mb-7 uppercase">
        Hit us up for orders, collabs & general drip enquiries
      </p>
      <a
        href="mailto:hello@biad.ng"
        className="font-heading text-[28px] tracking-[4px] text-foreground border-b border-foreground pb-1 transition-opacity duration-200 hover:opacity-50"
      >
        HELLO@BIAD.NG
      </a>
    </section>
  );
};

export default ContactSection;
