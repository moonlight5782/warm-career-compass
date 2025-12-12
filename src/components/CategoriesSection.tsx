import { Monitor, Pencil, Wrench, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoriesSection = () => {
  const { t, language } = useLanguage();

  const categories = [
    {
      name: { RO: "Frontend", RU: "Frontend" },
      icon: Monitor,
      color: "from-primary/20 to-secondary/40",
    },
    {
      name: { RO: "Designer", RU: "Дизайнер" },
      icon: Pencil,
      color: "from-primary/20 to-secondary/40",
    },
    {
      name: { RO: "Electrician", RU: "Электрик" },
      icon: Wrench,
      color: "from-primary/20 to-secondary/40",
    },
    {
      name: { RO: "Marketing", RU: "Маркетинг" },
      icon: BarChart3,
      color: "from-primary/20 to-secondary/40",
    },
  ];

  return (
    <section className="py-12 lg:py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 animate-fade-in">
          {t.popularCategories}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name.RO}
              className="card-warm flex flex-col items-center py-8 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`icon-box mb-4 bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name[language]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
