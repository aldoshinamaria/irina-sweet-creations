import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-chocolate text-cream/60">
      <div className="container mx-auto px-6 text-center">
        <p className="font-sans text-sm flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Ирина Землякова · Сделано с
          <Heart className="w-3.5 h-3.5 fill-rose text-rose" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
