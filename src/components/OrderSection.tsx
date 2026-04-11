import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const fillings = [
  { value: "chocolate", label: "Шоколадная", emoji: "🍫" },
  { value: "vanilla", label: "Ванильная", emoji: "🍦" },
  { value: "berry", label: "Ягодная", emoji: "🍓" },
  { value: "caramel", label: "Карамельная", emoji: "🍮" },
  { value: "nutty", label: "Ореховая", emoji: "🥜" },
  { value: "cream-cheese", label: "Крем-чиз", emoji: "🧀" },
];

const sizes = [
  { value: "small", label: "Маленький", description: "1–2 кг · 6–8 порций", price: "от 2 500 ₽" },
  { value: "medium", label: "Средний", description: "2–3 кг · 10–15 порций", price: "от 4 000 ₽" },
  { value: "large", label: "Большой", description: "3–5 кг · 20–30 порций", price: "от 6 000 ₽" },
];

const OrderSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filling, setFilling] = useState("");
  const [size, setSize] = useState("");
  const [date, setDate] = useState<Date>();
  const [wishes, setWishes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !filling || !size || !date) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsSubmitting(true);

    const selectedFilling = fillings.find((f) => f.value === filling);
    const selectedSize = sizes.find((s) => s.value === size);
    const formattedDate = format(date, "d MMMM yyyy", { locale: ru });

    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать десерт 🎂\n\nИмя: ${name.trim()}\nТелефон: ${phone.trim()}\nНачинка: ${selectedFilling?.label}\nРазмер: ${selectedSize?.label} (${selectedSize?.description})\nДата: ${formattedDate}\n${wishes.trim() ? `Пожелания: ${wishes.trim()}` : ""}`
    );

    window.open(`https://wa.me/?text=${message}`, "_blank");

    toast.success("Заявка отправлена! Я свяжусь с вами в ближайшее время 💛");
    setIsSubmitting(false);
  };

  return (
    <section id="order" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-sans text-sm tracking-widest uppercase mb-4 block">
              Заказать
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Оформить <span className="italic text-gradient-gold">заказ</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed max-w-md mx-auto">
              Заполните форму, и я свяжусь с вами для уточнения деталей
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 md:p-10 shadow-sm space-y-8"
          >
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-sans text-sm text-foreground">
                  Ваше имя *
                </Label>
                <Input
                  id="name"
                  placeholder="Ирина"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-border bg-background"
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-sans text-sm text-foreground">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border-border bg-background"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Filling */}
            <div className="space-y-3">
              <Label className="font-sans text-sm text-foreground">Начинка *</Label>
              <Select value={filling} onValueChange={setFilling}>
                <SelectTrigger className="rounded-xl border-border bg-background">
                  <SelectValue placeholder="Выберите начинку" />
                </SelectTrigger>
                <SelectContent>
                  {fillings.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.emoji} {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size */}
            <div className="space-y-3">
              <Label className="font-sans text-sm text-foreground">Размер *</Label>
              <RadioGroup value={size} onValueChange={setSize} className="grid gap-3">
                {sizes.map((s) => (
                  <label
                    key={s.value}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                      size === s.value
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/40"
                    )}
                  >
                    <RadioGroupItem value={s.value} id={s.value} />
                    <div className="flex-1">
                      <span className="font-sans font-medium text-foreground">{s.label}</span>
                      <span className="text-muted-foreground text-sm ml-2">{s.description}</span>
                    </div>
                    <span className="font-sans text-sm font-medium text-primary">{s.price}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label className="font-sans text-sm text-foreground">Дата получения *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-xl border-border bg-background",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Wishes */}
            <div className="space-y-2">
              <Label htmlFor="wishes" className="font-sans text-sm text-foreground">
                Пожелания
              </Label>
              <Textarea
                id="wishes"
                placeholder="Декор, надпись на торте, аллергии..."
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                className="rounded-xl border-border bg-background min-h-[100px] resize-none"
                maxLength={500}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full py-6 text-base font-sans font-medium tracking-wide"
            >
              <Send className="w-5 h-5 mr-2" />
              Отправить заказ
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
