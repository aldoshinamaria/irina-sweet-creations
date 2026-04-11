import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const items = [
  { src: gallery1, alt: "Шоколадные конфеты и тарт", label: "Конфеты & Тарты" },
  { src: gallery2, alt: "Свадебный торт с розами", label: "Свадебные торты" },
  { src: gallery3, alt: "Французские макаруны", label: "Макаруны" },
  { src: gallery4, alt: "Капкейки с ягодами", label: "Капкейки" },
  { src: gallery5, alt: "Ягодный чизкейк", label: "Чизкейки" },
  { src: gallery6, alt: "Профитроли с шоколадом", label: "Профитроли" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">
            Галерея
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Мои <span className="italic text-gradient-gold">сладкие</span> работы
          </h2>
          <p className="text-muted-foreground font-body">
            Каждый десерт — это маленькая история вкуса
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="group relative rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-cream font-heading text-lg font-semibold">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
