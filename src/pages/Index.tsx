import { useState, useCallback } from "react";
import BiadHeader from "@/components/BiadHeader";
import BiadHero from "@/components/BiadHero";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/components/ProductGrid";
import EightBallCart from "@/components/EightBallCart";
import type { CartItem } from "@/components/EightBallCart";
import BiadFooter from "@/components/BiadFooter";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setShakeTrigger((p) => p + 1);
  }, []);

  const handleRemove = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <BiadHeader />
      <BiadHero />
      <ProductGrid onAddToCart={handleAddToCart} />
      <BiadFooter />
      <EightBallCart items={cart} onRemove={handleRemove} triggerShake={shakeTrigger} />
    </div>
  );
};

export default Index;
