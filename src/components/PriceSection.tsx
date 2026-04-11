import { Cake, Cookie, IceCreamCone, CakeSlice } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  {
    icon: Cake,
    title: "Торты",
    items: [
      { name: "Медовик классический", weight: "1.5 кг", price: "2 800 ₽", popular: true },
      { name: "Наполеон", weight: "1.5 кг", price: "3 000 ₽", popular: false },
      { name: "Красный бархат", weight: "2 кг", price: "3 500 ₽", popular: true },
      { name: "Шоколадный мусс", weight: "2 кг", price: "3 800 ₽", popular: false },
      { name: "Чизкейк Нью-Йорк", weight: "1.5 кг", price: "3 200 ₽", popular: true },
    ],
  },
  {
    icon: CakeSlice,
    title: "Порционные десерты",
    items: [
      { name: "Тирамису", weight: "порция", price: "450 ₽", popular: true },
      { name: "Панна-котта", weight: "порция", price: "350 ₽", popular: false },
      { name: "Эклеры (набор 6 шт)", weight: "~400 г", price: "900 ₽", popular: true },
      { name: "Трайфлы", weight: "порция", price: "400 ₽", popular: false },
    ],
  },
  {
    icon: Cookie,
    title: "Выпечка",
    items: [
      { name: "Макарóны (набор 12 шт)", weight: "~250 г", price: "1 200 ₽", popular: true },
      { name: "Печенье ассорти", weight: "500 г", price: "800 ₽", popular: false },
      { name: "Кексы (набор 6 шт)", weight: "~500 г", price: "1 000 ₽", popular: false },
    ],
  },
  {
    icon: IceCreamCone,
    title: "Сезонное",
    items: [
      { name: "Куличи пасхальные", weight: "500 г", price: "700 ₽", popular: false },
      { name: "Имбирные пряники (набор)", weight: "~300 г", price: "900 ₽", popular: true },
      { name: "Зефир домашний", weight: "300 г", price: "650 ₽", popular: false },
    ],
  },
];

const PriceSection = () => {
  return (
    <section id="prices" className="py-24 bg-background">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-card rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {cat.title}
                </h3>
              </div>

              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-body text-foreground truncate">{item.name}</span>
                      {item.popular && (
                        <span className="shrink-0 text-[10px] font-sans font-medium tracking-wider uppercase bg-accent/15 text-accent px-2 py-0.5 rounded-full">
                          хит
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-muted-foreground text-sm">{item.weight}</span>
                      <span className="font-sans font-semibold text-foreground">{item.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10 font-body">
          * Цены указаны ориентировочно. Точная стоимость зависит от декора и сложности
        </p>
      </div>
    </section>
  );
};

export default PriceSection;
