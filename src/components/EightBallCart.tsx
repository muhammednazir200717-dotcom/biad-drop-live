import { useState, useEffect, useCallback } from "react";
import type { Product } from "./ProductGrid";

const MAGIC_RESPONSES = [
  "HEAT ACQUIRED.",
  "BIG DRIP.",
  "BIAD CERTIFIED.",
  "STAY REAL.",
  "OUTFIT SECURED.",
  "YOU ALREADY KNOW.",
  "REAL ONES ONLY.",
];

export interface CartItem {
  product: Product;
  quantity: number;
}

interface EightBallCartProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  triggerShake: number;
}

const EightBallSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="bMain" cx="38%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#3a3a3a"/>
        <stop offset="35%" stopColor="#141414"/>
        <stop offset="80%" stopColor="#050505"/>
        <stop offset="100%" stopColor="#000"/>
      </radialGradient>
      <radialGradient id="wCircle" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fff"/>
        <stop offset="60%" stopColor="#f0f0f0"/>
        <stop offset="100%" stopColor="#d8d8d8"/>
      </radialGradient>
      <radialGradient id="bShine1" cx="28%" cy="22%" r="40%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.85)"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
      </radialGradient>
      <radialGradient id="bRim" cx="85%" cy="75%" r="40%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.12)"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
      </radialGradient>
      <filter id="bDrop"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="rgba(0,0,0,0.6)"/></filter>
    </defs>
    <ellipse cx="60" cy="113" rx="33" ry="6" fill="rgba(0,0,0,0.22)"/>
    <circle cx="60" cy="58" r="52" fill="url(#bMain)" filter="url(#bDrop)"/>
    <circle cx="60" cy="58" r="52" fill="url(#bRim)"/>
    <circle cx="60" cy="60" r="24" fill="url(#wCircle)" opacity="0.97"/>
    <circle cx="60" cy="60" r="24" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
    <ellipse cx="44" cy="36" rx="17" ry="11" fill="url(#bShine1)"/>
    <ellipse cx="77" cy="30" rx="5" ry="3.5" fill="rgba(255,255,255,0.28)" transform="rotate(-15 77 30)"/>
  </svg>
);

const EightBallCart = ({ items, onRemove, triggerShake }: EightBallCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const doShake = useCallback(() => {
    setShaking(true);
    const msg = MAGIC_RESPONSES[Math.floor(Math.random() * MAGIC_RESPONSES.length)];
    setBubble(msg);
    setTimeout(() => setShaking(false), 500);
    setTimeout(() => setBubble(null), 2500);
  }, []);

  useEffect(() => {
    if (triggerShake > 0) doShake();
  }, [triggerShake, doShake]);

  return (
    <>
      {/* Magic bubble */}
      <div
        className={`fixed bottom-[128px] right-9 bg-background border border-border text-foreground font-body font-semibold text-xs tracking-[3px] px-[18px] py-[10px] uppercase whitespace-nowrap pointer-events-none z-[1000] transition-all duration-300 ${
          bubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
        }`}
      >
        {bubble}
      </div>

      {/* Floating 8-ball */}
      <div
        className={`fixed bottom-9 right-9 w-20 h-20 rounded-full z-[1000] cursor-pointer ${
          shaking ? "eight-ball-shake" : "eight-ball-float"
        } hover:!animate-none hover:scale-110`}
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
      >
        <EightBallSVG />
        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[19px] text-[#111] pointer-events-none z-[2] font-black">
          {totalItems}
        </div>
      </div>

      {/* Cart overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart drawer */}
      <div
        className={`fixed top-0 h-full w-[400px] max-w-full bg-background border-l border-border z-[300] flex flex-col transition-[right] duration-400 ease-[cubic-bezier(.4,0,.2,1)] ${
          isOpen ? "right-0" : "-right-[420px]"
        }`}
      >
        <div className="flex justify-between items-center px-7 pt-7 pb-5 border-b border-border">
          <h2 className="font-heading text-[28px] tracking-[4px] text-foreground">YOUR DRIP</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="border border-border text-foreground w-9 h-9 flex items-center justify-center text-base transition-all hover:bg-foreground hover:text-background"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5">
          {items.length === 0 ? (
            <div className="text-center py-[60px] font-body text-sm tracking-[3px] text-muted-foreground uppercase">
              YOUR CART IS EMPTY<br />
              <span className="text-xs">ADD SOME HEAT</span>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-[14px] items-center py-4 border-b border-border">
                <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-body font-semibold text-[13px] tracking-[2px] text-foreground uppercase mb-[3px]">
                    {item.product.name}
                  </div>
                  <div className="font-body text-[13px] text-muted-foreground tracking-[1px]">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                  <div className="font-body text-[11px] text-muted-foreground tracking-[2px] mt-[3px]">
                    QTY: {item.quantity}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="ml-auto border border-border text-muted-foreground w-7 h-7 flex items-center justify-center text-xs flex-shrink-0 transition-all hover:border-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-7 pb-7 pt-5 border-t border-border">
          <div className="flex justify-between mb-5">
            <span className="font-body text-xs tracking-[4px] text-muted-foreground uppercase">TOTAL</span>
            <span className="font-heading text-2xl text-foreground tracking-[2px]">₦{totalPrice.toLocaleString()}</span>
          </div>
          <button className="w-full font-body font-semibold text-xs tracking-[5px] uppercase text-background bg-foreground border-none py-4 transition-opacity hover:opacity-70">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default EightBallCart;
