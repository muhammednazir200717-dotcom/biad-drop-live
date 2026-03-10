import longsleeveSet from "@/assets/products/longsleeve-set.jpg";
import blackTeeShorts from "@/assets/products/black-tee-shorts-new.jpg";
import whiteTeeShorts from "@/assets/products/white-tee-shorts.jpg";
import graphicTee from "@/assets/products/graphic-tee-new.jpg";
import polosCollection from "@/assets/products/polos-collection.jpg";

export interface Product {
  id: string;
  name: string;
  variant?: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: "1", name: "BIAD Long Sleeve Set", variant: "Black / White", price: 38000, image: longsleeveSet },
  { id: "2", name: "BIAD Tee + Shorts", variant: "Black", price: 35000, image: blackTeeShorts },
  { id: "3", name: "BIAD Tee + Shorts", variant: "White", price: 35000, image: whiteTeeShorts },
  { id: "4", name: "Real Eyes Realize Real Swag", variant: "Graphic Tee", price: 18500, image: graphicTee },
  { id: "5", name: "Eternal x BIAD Polo", variant: "Collection", price: 19000, image: polosCollection },
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  return (
    <section id="shop" className="w-full px-4 md:px-10 pb-24 bg-background">
      <p className="font-body font-normal text-[10px] tracking-[8px] text-muted-foreground text-center pt-24 uppercase mb-2">
        CURRENT DROP
      </p>
      <h2 className="font-heading text-[clamp(36px,5vw,58px)] tracking-[4px] text-foreground text-center leading-none pb-[70px]">
        THE COLLECTION
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9 max-w-[1280px] mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card border border-border bg-card cursor-pointer overflow-hidden"
          >
            <div className="w-full aspect-square overflow-hidden bg-card flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                loading="lazy"
              />
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
    </section>
  );
};

export default ProductGrid;
