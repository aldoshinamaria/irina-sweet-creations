import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Анна М.",
    text: "Ирина сделала потрясающий торт на день рождения дочери! Все гости были в восторге, а именинница не хотела его резать — настолько красивый!",
    rating: 5,
  },
  {
    name: "Екатерина С.",
    text: "Заказывали свадебный торт — это было что-то невероятное. Вкус нежнейший, а декор просто произведение искусства. Спасибо огромное!",
    rating: 5,
  },
  {
    name: "Ольга Д.",
    text: "Макаруны от Ирины — это любовь с первого кусочка. Теперь заказываю регулярно, и каждый раз они идеальны!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">
            Отзывы
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Что говорят <span className="italic text-primary">клиенты</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6 italic">
                «{t.text}»
              </p>
              <span className="text-foreground font-heading font-semibold">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
