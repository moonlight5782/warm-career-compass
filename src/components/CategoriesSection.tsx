import { useState } from "react";
import { Monitor, Pencil, Wrench, BarChart3, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies, professions } from "@/data/mockData";
import CompanyCard from "./CompanyCard";

interface Category {
  id: string;
  name: { RO: string; RU: string };
  icon: React.ComponentType<{ className?: string }>;
}

const CategoriesSection = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    { id: "frontend", name: { RO: "Frontend", RU: "Frontend" }, icon: Monitor },
    { id: "designer", name: { RO: "Designer", RU: "Дизайнер" }, icon: Pencil },
    { id: "electrician", name: { RO: "Electrician", RU: "Электрик" }, icon: Wrench },
    { id: "marketing", name: { RO: "Marketing", RU: "Маркетинг" }, icon: BarChart3 },
  ];

  const getFilteredCompanies = (professionId: string) => {
    return companies.filter((company) =>
      company.professions.includes(professionId)
    );
  };

  const getProfessionName = (professionId: string) => {
    const profession = professions.find((p) => p.id === professionId);
    return profession ? profession.name[language] : professionId;
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);
  const filteredCompanies = selectedCategory
    ? getFilteredCompanies(selectedCategory)
    : [];

  return (
    <section className="py-12 lg:py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 animate-fade-in">
          {t.popularCategories}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className={`card-warm flex flex-col items-center py-8 cursor-pointer group ${
                selectedCategory === category.id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="icon-box mb-4 bg-gradient-to-br from-primary/20 to-secondary/40 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name[language]}
              </span>
            </div>
          ))}
        </div>

        {/* Filtered companies list */}
        {selectedCategory && filteredCompanies.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">
                {t.companiesTitle}: {selectedCategoryData?.name[language]}
              </h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="self-start">
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && filteredCompanies.length === 0 && (
          <div className="mt-8 text-center text-muted-foreground animate-fade-in">
            {t.noResults}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
