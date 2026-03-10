import { useState } from "react";
import dragonIcon from "@/assets/dragon-icon.png";
import biadLogo from "/images/biad-logo.png";

interface BiadHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const BiadHeader = ({ isDark, onToggleTheme }: BiadHeaderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border flex md:grid md:grid-cols-[1fr_auto_1fr] items-center px-4 md:px-[60px] h-[70px] md:h-[120px] transition-colors duration-300">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center border border-border hover:border-foreground transition-colors"
          title="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-foreground transition-all ${isNavOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-foreground transition-all ${isNavOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-foreground transition-all ${isNavOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 md:gap-10 items-center">
          <a href="#shop" className="nav-link">Shop</a>
          <a href="#delivery" className="nav-link">Delivery</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Logo - Perfectly centered */}
        <div className="flex-1 flex justify-center items-center logo-entrance">
          <img
            src={biadLogo}
            alt="BIAD Logo"
            className="h-[100px] md:h-[150px] w-auto"
            style={{ filter: isDark ? 'invert(1)' : 'none' }}
          />
        </div>

        {/* Right side controls */}
        <div className="flex justify-end items-center gap-2 md:gap-4">
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/20 hover:border-foreground/50 hover:shadow-lg hover:shadow-foreground/20 hover:scale-105 flex-shrink-0 group p-0 overflow-hidden"
            title="Toggle theme"
          >
            <img src={dragonIcon} alt="Toggle theme" className="w-full h-full object-contain group-hover:scale-110 transition-transform" style={{ filter: isDark ? 'none' : 'invert(1)' }} />
          </button>
          <div className="drop-pulse border border-border px-3 py-[7px] hidden sm:block">
            <span className="font-body text-[9px] tracking-[4px] uppercase text-foreground">● DROP LIVE</span>
          </div>
        </div>
      </header>

      {/* Mobile Side Navigation */}
      {isNavOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsNavOpen(false)}
          ></div>

          {/* Side Nav */}
          <nav className="fixed left-0 top-[70px] h-[calc(100vh-70px)] w-64 bg-background border-r border-border z-40 md:hidden flex flex-col gap-6 p-6 animate-in slide-in-from-left">
            <a
              href="#shop"
              className="text-lg font-semibold text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              Shop
            </a>
            <a
              href="#delivery"
              className="text-lg font-semibold text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              Delivery
            </a>
            <a
              href="#contact"
              className="text-lg font-semibold text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsNavOpen(false)}
            >
              Contact
            </a>
          </nav>
        </>
      )}
    </>
  );
};

export default BiadHeader;
