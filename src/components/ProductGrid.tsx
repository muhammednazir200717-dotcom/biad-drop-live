import blackLongsleeveSet from "@/assets/products/black-longsleeve-set.jpg";
import whiteGreyLongsleeve from "@/assets/products/white-grey-longsleeve.jpg";
import blackTeeShorts from "@/assets/products/black-tee-shorts.jpg";
import greyTeeShorts from "@/assets/products/grey-tee-shorts.jpg";
import graphicTee from "@/assets/products/graphic-tee.jpg";
import maroonPolo from "@/assets/products/maroon-polo.jpg";
import whitePolo from "@/assets/products/white-polo.jpg";
import whiteRedPolo from "@/assets/products/white-red-polo.jpg";
import blackPolo from "@/assets/products/black-polo.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: "1", name: "BIAD Long Sleeve Set — Black", price: 38000, image: blackLongsleeveSet },
  { id: "2", name: "BIAD Long Sleeve — White/Grey", price: 22000, image: whiteGreyLongsleeve },
  { id: "3", name: "BIAD Tee + Shorts — Black", price: 35000, image: blackTeeShorts },
  { id: "4", name: "BIAD Tee + Shorts — Grey", price: 35000, image: greyTeeShorts },
  { id: "5", name: '"Nikes Na Me Na Swag" Graphic Tee', price: 18500, image: graphicTee },
  { id: "6", name: "BIAD Polo — Maroon", price: 19000, image: maroonPolo },
  { id: "7", name: "BIAD Polo — White", price: 19000, image: whitePolo },
  { id: "8", name: "BIAD Polo — White + Red", price: 21000, image: whiteRedPolo },
  { id: "9", name: "BIAD Polo — Black", price: 19000, image: blackPolo },
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  return (
    <section id="shop" className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="font-heading text-5xl md:text-6xl text-foreground text-center mb-12 tracking-wider">
        THE DROP
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card border border-border bg-card p-4 flex flex-col"
          >
            <div className="w-full aspect-[4/5] overflow-hidden mb-4 bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="font-product text-2xl text-foreground mb-1">{product.name}</h3>
            <p className="font-product text-xl text-primary mb-4">
              ₦{product.price.toLocaleString()}
            </p>
            <button
              onClick={() => onAddToCart(product)}
              className="stamp-btn mt-auto"
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
