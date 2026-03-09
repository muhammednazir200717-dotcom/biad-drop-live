import { useState, useCallback, useEffect } from "react";
import BiadHeader from "@/components/BiadHeader";
import Ticker from "@/components/Ticker";
import BiadHero from "@/components/BiadHero";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/components/ProductGrid";
import DeliverySection from "@/components/DeliverySection";
import ContactSection from "@/components/ContactSection";
import EightBallCart from "@/components/EightBallCart";
import type { CartItem } from "@/components/EightBallCart";
import BiadFooter from "@/components/BiadFooter";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

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
      <BiadHeader isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
      <Ticker />
      <BiadHero />
      <ProductGrid onAddToCart={handleAddToCart} />
      <DeliverySection />
      <ContactSection />
      <BiadFooter />
      <EightBallCart items={cart} onRemove={handleRemove} triggerShake={shakeTrigger} />
    </div>
  );
};

export default Index;
