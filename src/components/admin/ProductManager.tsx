import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  variant: string | null;
  price: number;
  sizes: string[];
  in_stock: boolean;
  image_url: string | null;
  sort_order: number;
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let image_url: string | null = null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("product-images")
        .upload(path, imageFile);

      if (uploadErr) {
        toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      image_url = urlData.publicUrl;
    }

    const { error } = await supabase.from("products").insert({
      name: name.trim(),
      variant: variant.trim() || null,
      price: parseInt(price),
      sizes: sizes ? sizes.split(",").map((s) => s.trim()) : [],
      image_url,
      sort_order: products.length,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product added" });
      setName(""); setVariant(""); setPrice(""); setSizes(""); setImageFile(null);
      setShowForm(false);
      fetchProducts();
    }
    setSaving(false);
  };

  const toggleStock = async (id: string, current: boolean) => {
    await supabase.from("products").update({ in_stock: !current }).eq("id", id);
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, in_stock: !current } : p));
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted" });
  };

  if (loading) return <p className="font-body text-sm text-muted-foreground">Loading products...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl tracking-[3px] text-foreground">PRODUCTS ({products.length})</h2>
        <Button onClick={() => setShowForm(!showForm)} className="font-body text-[10px] tracking-[4px] uppercase rounded-none">
          <Plus size={14} className="mr-1" /> Add Product
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAddProduct} className="border border-border bg-card p-5 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required className="font-body text-sm tracking-[1px] border-border" />
            <Input placeholder="Variant (optional)" value={variant} onChange={(e) => setVariant(e.target.value)} className="font-body text-sm tracking-[1px] border-border" />
            <Input placeholder="Price (e.g. 35000)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="font-body text-sm tracking-[1px] border-border" />
            <Input placeholder="Sizes (comma separated: S,M,L,XL)" value={sizes} onChange={(e) => setSizes(e.target.value)} className="font-body text-sm tracking-[1px] border-border" />
          </div>
          <div>
            <label className="font-body text-xs tracking-[2px] text-muted-foreground uppercase mb-1 block">Product Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="font-body text-sm text-foreground" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="font-body text-[10px] tracking-[4px] uppercase rounded-none">
              {saving ? "Saving..." : "Save Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="font-body text-[10px] tracking-[4px] uppercase rounded-none">
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="border border-border bg-card p-4 flex items-center gap-4">
            {product.image_url && (
              <img src={product.image_url} alt={product.name} className="w-14 h-14 object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm tracking-[2px] uppercase text-foreground truncate">
                {product.name}
                {product.variant && <span className="text-muted-foreground ml-2">— {product.variant}</span>}
              </p>
              <p className="font-body text-xs tracking-[2px] text-muted-foreground">
                ₦{product.price.toLocaleString()}
                {product.sizes.length > 0 && ` · ${product.sizes.join(", ")}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-body text-[10px] tracking-[2px] uppercase text-muted-foreground">
                  {product.in_stock ? "In Stock" : "Out"}
                </span>
                <Switch checked={product.in_stock} onCheckedChange={() => toggleStock(product.id, product.in_stock)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="font-body text-sm text-muted-foreground text-center py-8">No products yet. Add your first one!</p>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
