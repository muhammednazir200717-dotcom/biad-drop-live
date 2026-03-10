import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  product_name: string;
  variant: string | null;
  size: string | null;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
  items?: OrderItem[];
}

const OrderViewer = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data as Order[]);
    setLoading(false);
  };

  const fetchOrderItems = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      return;
    }
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, items: (data as OrderItem[]) || [] } : o)
    );
    setExpandedOrder(orderId);
  };

  const updateStatus = async (orderId: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
  };

  useEffect(() => { fetchOrders(); }, []);

  if (loading) return <p className="font-body text-sm text-muted-foreground">Loading orders...</p>;

  return (
    <div>
      <h2 className="font-heading text-xl tracking-[3px] text-foreground mb-6">ORDERS ({orders.length})</h2>

      {orders.length === 0 && (
        <p className="font-body text-sm text-muted-foreground text-center py-8">No orders yet.</p>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="border border-border bg-card">
            <div
              className="p-4 flex items-center gap-4 cursor-pointer"
              onClick={() => fetchOrderItems(order.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm tracking-[2px] uppercase text-foreground">
                  {order.customer_name}
                </p>
                <p className="font-body text-xs tracking-[1px] text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()} · ₦{order.total.toLocaleString()}
                </p>
              </div>
              <Badge variant={order.status === "pending" ? "secondary" : order.status === "confirmed" ? "default" : "outline"} className="font-body text-[9px] tracking-[2px] uppercase">
                {order.status}
              </Badge>
            </div>

            {expandedOrder === order.id && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="font-body text-xs tracking-[1px] text-muted-foreground space-y-1">
                  {order.customer_email && <p>Email: {order.customer_email}</p>}
                  {order.customer_phone && <p>Phone: {order.customer_phone}</p>}
                  {order.customer_address && <p>Address: {order.customer_address}</p>}
                  {order.notes && <p>Notes: {order.notes}</p>}
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="space-y-1">
                    <p className="font-body text-[10px] tracking-[3px] uppercase text-muted-foreground">Items</p>
                    {order.items.map((item) => (
                      <p key={item.id} className="font-body text-xs tracking-[1px] text-foreground">
                        {item.quantity}x {item.product_name}
                        {item.variant && ` (${item.variant})`}
                        {item.size && ` — ${item.size}`}
                        {" "}· ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {["pending", "confirmed", "shipped", "delivered"].map((s) => (
                    <Button
                      key={s}
                      variant={order.status === s ? "default" : "outline"}
                      onClick={() => updateStatus(order.id, s)}
                      className="font-body text-[9px] tracking-[3px] uppercase rounded-none h-8 px-3"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderViewer;
