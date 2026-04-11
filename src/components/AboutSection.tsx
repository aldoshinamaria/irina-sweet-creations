import { Heart, Cake, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Heart,
    title: "С любовью",
    description: "Каждый десерт — это частичка моей души и заботы о вас",
  },
  {
    icon: Cake,
    title: "Домашнее качество",
    description: "Только натуральные ингредиенты без консервантов",
  },
  {
    icon: Star,
    title: "Индивидуальный подход",
    description: "Каждый заказ уникален и создан специально для вас",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">
            Обо мне
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Кондитер, который <span className="italic text-primary">любит</span> своё дело
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Привет! Меня зовут Ирина Землякова. Я — домашний кондитер, и моя кухня — это место, 
            где рождаются самые вкусные и красивые десерты. Готовлю с любовью для ваших 
            самых важных моментов.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
