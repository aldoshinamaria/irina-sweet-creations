import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "Обо мне" },
  { href: "#gallery", label: "Галерея" },
  { href: "#contacts", label: "Контакты" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-chocolate/80 backdrop-blur-md">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-cream font-heading text-xl font-bold">
          Ирина <span className="text-gradient-gold italic">Землякова</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-cream/80 hover:text-cream font-sans text-sm tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream"
          aria-label="Меню"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-chocolate/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream/80 hover:text-cream font-sans text-sm tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
