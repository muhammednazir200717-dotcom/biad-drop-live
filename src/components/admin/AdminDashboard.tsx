import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import ProductManager from "./ProductManager";
import OrderViewer from "./OrderViewer";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 md:px-10 py-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl tracking-[4px] text-foreground">BIAD ADMIN</h1>
        <Button variant="ghost" onClick={onLogout} className="font-body text-[10px] tracking-[4px] uppercase">
          <LogOut size={16} className="mr-2" /> Logout
        </Button>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-8">
        <Tabs defaultValue="products">
          <TabsList className="font-body tracking-[2px] uppercase text-xs mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrderViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
