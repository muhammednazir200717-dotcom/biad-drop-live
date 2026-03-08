import biadLogo from "/images/biad-logo.png";

const BiadHeader = () => {
  return (
    <header className="w-full bg-background border-b-2 border-primary px-6 py-4 flex items-center justify-between relative z-50">
      <nav className="flex gap-8">
        <a href="#shop" className="nav-link">Shop</a>
        <a href="#delivery" className="nav-link">Delivery</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src={biadLogo}
          alt="BIAD Logo"
          className="h-16 md:h-20 logo-entrance"
          style={{ filter: "invert(1)" }}
        />
      </div>

      <div className="drop-pulse border border-primary px-3 py-1">
        <span className="font-heading text-primary tracking-widest text-sm">DROP LIVE</span>
      </div>
    </header>
  );
};

export default BiadHeader;
