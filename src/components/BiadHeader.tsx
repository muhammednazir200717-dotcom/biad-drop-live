import dragonIcon from "@/assets/dragon-icon.png";
import biadLogo from "/images/biad-logo.png";

interface BiadHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const BiadHeader = ({ isDark, onToggleTheme }: BiadHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-[60px] h-[90px] md:h-[120px] transition-colors duration-300">
      <nav className="flex gap-5 md:gap-10 items-center">
        <a href="#shop" className="nav-link">Shop</a>
        <a href="#delivery" className="nav-link">Delivery</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      <div className="flex justify-center items-center logo-entrance">
        <img
          src={biadLogo}
          alt="BIAD Logo"
          className="h-[80px] md:h-[115px] w-auto"
          style={{ filter: isDark ? 'invert(1)' : 'none' }}
        />
      </div>

      <div className="flex justify-end items-center gap-4">
        <button
          onClick={onToggleTheme}
          className="border border-border p-2 flex items-center transition-colors hover:border-foreground"
          title="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="drop-pulse border border-border px-3 py-[7px]">
          <span className="font-body text-[9px] tracking-[4px] uppercase text-foreground">● DROP LIVE</span>
        </div>
      </div>
    </header>
  );
};

export default BiadHeader;
