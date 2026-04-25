import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type OrderStatus = "new" | "confirmed" | "completed" | "cancelled";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  filling: string | null;
  size: string | null;
  desired_date: string | null;
  comment: string | null;
  total_price: number | null;
  status: OrderStatus;
  created_at: string;
}

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: "new", label: "Новый", color: "bg-primary/15 text-primary" },
  { value: "confirmed", label: "Подтверждён", color: "bg-accent/20 text-accent-foreground" },
  { value: "completed", label: "Выполнен", color: "bg-muted text-muted-foreground" },
  { value: "cancelled", label: "Отменён", color: "bg-destructive/15 text-destructive" },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Не удалось загрузить заказы");
    } else {
      setOrders((data ?? []) as Order[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      toast.error("Не удалось обновить статус");
    } else {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Статус обновлён");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить заказ безвозвратно?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) {
      toast.error("Не удалось удалить заказ");
    } else {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast.success("Заказ удалён");
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Все ({orders.length})
          </Button>
          {statusOptions.map((s) => {
            const count = orders.filter((o) => o.status === s.value).length;
            return (
              <Button
                key={s.value}
                size="sm"
                variant={filter === s.value ? "default" : "outline"}
                onClick={() => setFilter(s.value)}
              >
                {s.label} ({count})
              </Button>
            );
          })}
        </div>
        <Button size="sm" variant="ghost" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Обновить
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Заказов нет</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((o) => {
            const status = statusOptions.find((s) => s.value === o.status);
            return (
              <div key={o.id} className="bg-card rounded-2xl p-5 border space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-semibold text-lg">{o.customer_name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status?.color}`}>
                        {status?.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(o.created_at), "d MMMM yyyy, HH:mm", { locale: ru })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={o.status}
                      onValueChange={(v) => updateStatus(o.id, v as OrderStatus)}
                    >
                      <SelectTrigger className="w-[160px] h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="icon" variant="ghost" onClick={() => remove(o.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><span className="text-muted-foreground">Телефон: </span>{o.customer_phone}</div>
                  {o.customer_email && (
                    <div><span className="text-muted-foreground">Email: </span>{o.customer_email}</div>
                  )}
                  {o.filling && (
                    <div><span className="text-muted-foreground">Начинка: </span>{o.filling}</div>
                  )}
                  {o.size && (
                    <div><span className="text-muted-foreground">Размер: </span>{o.size}</div>
                  )}
                  {o.desired_date && (
                    <div>
                      <span className="text-muted-foreground">Дата: </span>
                      {format(new Date(o.desired_date), "d MMMM yyyy", { locale: ru })}
                    </div>
                  )}
                  {o.total_price != null && (
                    <div><span className="text-muted-foreground">Сумма: </span>{o.total_price} ₽</div>
                  )}
                </div>

                {o.comment && (
                  <div className="text-sm bg-muted/40 rounded-lg p-3">
                    <span className="text-muted-foreground">Пожелания: </span>
                    {o.comment}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
