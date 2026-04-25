import { useEffect, useState } from "react";
import { Cake } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  images: string[];
  is_hit: boolean;
  is_new: boolean;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

const PriceSection = () => {
  const ref = useScrollAnimation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, description, price, category, images, is_hit, is_new")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setProducts((data ?? []) as Product[]);
      setLoading(false);
    };
    load();
  }, []);

  // Group by category
  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    const key = p.category?.trim() || "Десерты";
    (acc[key] ||= []).push(p);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <section id="prices" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">
            Меню
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Наши <span className="italic text-gradient-gold">десерты</span>
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed max-w-lg mx-auto">
            Каждый десерт готовится из натуральных ингредиентов с любовью и вниманием к деталям
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Загрузка меню…</div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Меню скоро появится. Свяжитесь со мной для индивидуального заказа.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categories.map(([cat, items]) => (
              <div
                key={cat}
                className="bg-card rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cake className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">{cat}</h3>
                </div>

                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      {item.images[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          loading="lazy"
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-body text-foreground">{item.name}</span>
                            {item.is_hit && (
                              <span className="shrink-0 text-[10px] font-sans font-medium tracking-wider uppercase bg-accent/15 text-accent px-2 py-0.5 rounded-full">
                                хит
                              </span>
                            )}
                            {item.is_new && (
                              <span className="shrink-0 text-[10px] font-sans font-medium tracking-wider uppercase bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                                новинка
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-muted-foreground text-sm mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="font-sans font-semibold text-foreground shrink-0">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-muted-foreground text-sm mt-10 font-body">
          * Цены указаны ориентировочно. Точная стоимость зависит от декора и сложности
        </p>
      </div>
    </section>
  );
};

export default PriceSection;
