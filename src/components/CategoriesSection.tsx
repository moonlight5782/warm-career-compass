import { useState } from "react";
import { 
  Monitor, Pencil, Wrench, BarChart3, X, Car, ChefHat, 
  Truck, Stethoscope, Shield, Coffee, Droplets, Calculator
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies, getPopularProfessions } from "@/data/mockData";
import CompanyCard from "./CompanyCard";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Monitor,
  backend: Monitor,
  designer: Pencil,
  electrician: Wrench,
  marketing: BarChart3,
  accountant: Calculator,
  mechanic: Car,
  cook: ChefHat,
  driver: Truck,
  nurse: Stethoscope,
  plumber: Droplets,
  security: Shield,
  barista: Coffee,
  welder: Wrench,
};

const CategoriesSection = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Получаем топ-8 популярных профессий
  const popularProfessions = getPopularProfessions(8);

  const getFilteredCompanies = (professionId: string) => {
    return companies.filter((company) =>
      company.professions.includes(professionId)
    );
  };

  const selectedProfession = popularProfessions.find((p) => p.id === selectedCategory);
  const filteredCompanies = selectedCategory
    ? getFilteredCompanies(selectedCategory)
    : [];

  return (
    <section className="py-12 lg:py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 animate-fade-in">
          {t.popularCategories}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
          {popularProfessions.map((profession, index) => {
            const IconComponent = iconMap[profession.id] || Monitor;
            return (
              <div
                key={profession.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === profession.id ? null : profession.id
                  )
                }
                className={`card-warm flex flex-col items-center py-6 sm:py-8 cursor-pointer group animate-fade-in transition-all duration-300 hover:shadow-lg ${
                  selectedCategory === profession.id
                    ? "ring-2 ring-primary scale-[1.02]"
                    : "hover:scale-[1.02]"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="icon-box mb-3 sm:mb-4 bg-gradient-to-br from-primary/20 to-secondary/40 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <span className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-center px-2">
                  {profession.name[language]}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {profession.searchCount} {language === "RO" ? "căutări" : "запросов"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Filtered companies list */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            selectedCategory && filteredCompanies.length > 0
              ? "max-h-[2000px] opacity-100 mt-8"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">
                {t.companiesTitle}: {selectedProfession?.name[language]}
              </h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {filteredCompanies.map((company, index) => (
                <div 
                  key={company.id} 
                  className="self-start animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>
          </div>
        </div>

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
