import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  variant?: string;
  price: number;
  image: string;
  sizes?: string[];
  in_stock?: boolean;
}

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("sort_order", { ascending: true });

      if (data) {
        setProducts(
          data.map((p: any) => ({
            id: p.id,
            name: p.name,
            variant: p.variant || undefined,
            price: p.price,
            image: p.image_url || "",
            sizes: p.sizes || [],
            in_stock: p.in_stock,
          }))
        );
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section id="shop" className="w-full px-4 md:px-10 pb-24 bg-background">
      <p className="font-body font-normal text-[10px] tracking-[8px] text-muted-foreground text-center pt-24 uppercase mb-2">
        CURRENT DROP
      </p>
      <h2 className="font-heading text-[clamp(36px,5vw,58px)] tracking-[4px] text-foreground text-center leading-none pb-[70px]">
        THE COLLECTION
      </h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <p className="font-body text-sm tracking-[4px] text-muted-foreground uppercase">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center py-20">
          <p className="font-body text-sm tracking-[4px] text-muted-foreground uppercase">Coming soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9 max-w-[1280px] mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card border border-border bg-card cursor-pointer overflow-hidden"
            >
              <div className="w-full aspect-square overflow-hidden bg-card flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="font-body text-xs tracking-[3px] text-muted-foreground uppercase">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-[20px_18px_18px]">
                <h3 className="font-body font-semibold text-sm tracking-[2px] uppercase text-foreground mb-[3px]">
                  {product.name}
                </h3>
                {product.variant && (
                  <p className="font-body text-xs tracking-[2px] text-muted-foreground mb-2">
                    {product.variant}
                  </p>
                )}
                <p className="font-body font-normal text-sm tracking-[2px] text-muted-foreground mb-4">
                  ₦{product.price.toLocaleString()}
                </p>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full font-body font-semibold text-[10px] tracking-[4px] uppercase text-foreground bg-transparent border border-border py-[11px] transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
