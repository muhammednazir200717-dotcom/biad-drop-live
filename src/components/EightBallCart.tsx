import { useState, useEffect, useCallback } from "react";
import type { Product } from "./ProductGrid";
import { X } from "lucide-react";

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
      {/* Floating 8-ball */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        {bubble && (
          <div className="mb-3 bg-primary text-foreground font-heading text-sm px-4 py-2 tracking-wider animate-fade-in max-w-[200px] text-center">
            {bubble}
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full eight-ball-shine flex items-center justify-center text-foreground font-heading text-2xl border-2 border-muted cursor-pointer select-none ${shaking ? "eight-ball-shake" : "eight-ball-float"}`}
          aria-label="Open cart"
        >
          {totalItems > 0 ? totalItems : "8"}
        </button>
      </div>

      {/* Cart drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[200]" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-background/70" />
          <div
            className="absolute top-0 right-0 h-full w-full max-w-md bg-card border-l border-primary p-6 overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-3xl text-foreground tracking-wider">YOUR CART</h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="font-body text-muted-foreground text-lg">Cart empty. Go cop something.</p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 mb-4 border-b border-border pb-4">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover" />
                    <div className="flex-1">
                      <h3 className="font-product text-lg text-foreground">{item.product.name}</h3>
                      <p className="font-body text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-product text-primary">₦{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-muted-foreground hover:text-primary self-start"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-primary pt-4 mt-4">
                  <div className="flex justify-between font-heading text-2xl text-foreground">
                    <span>TOTAL</span>
                    <span className="text-primary">₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EightBallCart;
