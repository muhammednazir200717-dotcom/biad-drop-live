import { Instagram } from "lucide-react";

const socials = [
  { platform: "INSTAGRAM", handle: "@BIAD4SWAG", icon: "instagram" },
  { platform: "TIKTOK", handle: "@BIAD4SWAG", icon: "tiktok" },
  { platform: "TWITTER/X", handle: "@BIAD4SWAG", icon: "twitter" },
  { platform: "YOUTUBE", handle: "@BIAD4SWAG", icon: "youtube" },
];

const BiadFooter = () => {
  return (
    <footer id="contact" className="w-full border-t-2 border-primary bg-card py-16 px-4">
      <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center tracking-wider mb-12">
        FIND US IN THE STREETS
      </h2>

      <div className="flex flex-wrap justify-center gap-12 mb-12">
        {socials.map((s) => (
          <a
            key={s.platform}
            href="#"
            className="flex flex-col items-center gap-2 group transition-all duration-200"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-body">
              {s.platform}
            </span>
            <div className="text-foreground group-hover:text-primary transition-colors">
              <Instagram size={28} />
            </div>
            <span className="font-heading text-lg text-foreground group-hover:text-primary group-hover:scale-105 transition-all">
              {s.handle}
            </span>
          </a>
        ))}
      </div>

      <p className="font-body text-center text-muted-foreground text-sm tracking-wider">
        © BIAD. All Rights Reserved. BIAD4SWAG.
      </p>
    </footer>
  );
};

export default BiadFooter;
