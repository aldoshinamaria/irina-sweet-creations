import { Phone, MessageCircle, Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const ref = useScrollAnimation();
  return (
    <section id="contacts" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">
            Контакты
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Давайте создадим <span className="italic text-gradient-gold">ваш</span> десерт
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-12 max-w-xl mx-auto">
            Свяжитесь со мной, чтобы обсудить заказ. Я помогу подобрать идеальный десерт
            для вашего праздника.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-sans font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground rounded-full font-sans font-medium text-sm tracking-wide hover:bg-secondary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
            <a
              href="tel:+7"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground rounded-full font-sans font-medium text-sm tracking-wide hover:bg-secondary transition-colors"
            >
              <Phone className="w-5 h-5" />
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
