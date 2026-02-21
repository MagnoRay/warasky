import { useEffect, useState } from "react";
import styles from "./HeroSlider.module.css";
import { Building2, Users, ShieldCheck, ArrowRight } from "lucide-react";

const slides = [
  {
    title: "Gestión empresarial sin fricción",
    description:
      "Automatiza pagos, productos y transporte en una sola plataforma segura.",
    icon: Building2,
  },
  {
    title: "Pensado para B2B y B2C",
    description:
      "Escala desde pequeños clientes hasta grandes operaciones sin cambiar de sistema.",
    icon: Users,
  },
  {
    title: "Cumplimiento y control total",
    description:
      "Diseñado para el contexto peruano, trazabilidad y control en tiempo real.",
    icon: ShieldCheck,
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = slides[index].icon;

  return (
    <section className="w-full flex justify-center items-center py-24 px-6">
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <CurrentIcon size={36} />
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
          {slides[index].title}
        </h1>

        <p className="text-slate-600 max-w-2xl text-lg">
          {slides[index].description}
        </p>

        {/* CTA */}
        <button className={styles.primaryButton}>
          Empezar ahora
          <ArrowRight size={18} />
        </button>

        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-violet-500 w-5" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}