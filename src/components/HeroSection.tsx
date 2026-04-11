import heroPastries from "@/assets/hero-pastries.jpg";
import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroPastries}
          alt="Домашние десерты от Ирины Земляковой"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/50 to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-up">
            <Heart className="w-5 h-5 text-rose fill-rose" />
            <span className="text-rose font-sans text-sm tracking-widest uppercase">
              Сделано с любовью
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-cream leading-tight mb-6 opacity-0 animate-fade-up animate-delay-100">
            Ирина
            <br />
            <span className="text-gradient-gold italic">Землякова</span>
          </h1>
          
          <p className="text-lg md:text-xl text-cream/90 font-body leading-relaxed mb-8 max-w-lg opacity-0 animate-fade-up animate-delay-200">
            Домашние десерты, приготовленные с душой. Каждый торт — маленькое произведение искусства для вашего праздника.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up animate-delay-300">
            <a
              href="#gallery"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-sans font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Смотреть работы
            </a>
            <a
              href="#contacts"
              className="inline-flex items-center justify-center px-8 py-4 border border-cream/30 text-cream rounded-full font-sans font-medium text-sm tracking-wide hover:bg-cream/10 transition-colors"
            >
              Заказать десерт
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
