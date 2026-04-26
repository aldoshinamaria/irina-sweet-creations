import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Package, ShoppingBag } from "lucide-react";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import { toast } from "sonner";

const Admin = () => {
  const { session, isAdmin, loading, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate("/auth");
    } else if (!isAdmin) {
      toast.error("Нет доступа. Требуется роль admin.");
      setChecked(true);
    } else {
      setChecked(true);
    }
  }, [session, isAdmin, loading, navigate]);

  if (loading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-heading text-2xl font-bold">Нет доступа</h1>
          <p className="text-muted-foreground text-sm">
            У аккаунта <strong>{user?.email}</strong> нет прав администратора.
            Свяжитесь с владельцем сайта, чтобы запросить доступ.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>На сайт</Button>
            <Button onClick={signOut}>Выйти</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold text-foreground">
            Админ-панель
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              На сайт
            </Button>
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate("/"); }}>
              <LogOut className="w-4 h-4 mr-1" /> Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" /> Заказы
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" /> Товары
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
