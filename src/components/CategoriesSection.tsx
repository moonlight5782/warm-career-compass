import { useState, useMemo } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfessions } from "@/contexts/ProfessionsContext";
import { 
  Monitor, Pencil, Wrench, BarChart3, X, Car, ChefHat, 
  Truck, Stethoscope, Shield, Coffee, Droplets, Calculator
} from "lucide-react";
import { companies } from "@/data/mockData";
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
  const { selectedCity } = useSearch();
  const { professions } = useProfessions();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllProfessions, setShowAllProfessions] = useState(false);

  const allPopularProfessions = useMemo(() => {
    return [...professions].sort((a, b) => b.searchCount - a.searchCount).slice(0, 12);
  }, [professions]);
  
  const visibleProfessions = showAllProfessions 
    ? allPopularProfessions 
    : allPopularProfessions.slice(0, 4);

  const selectedProfession = allPopularProfessions.find((p) => p.id === selectedCategory);
  
  // ИСПРАВЛЕНИЕ: показываем все компании если НЕ выбрана категория
  const displayedCompanies = selectedCategory 
    ? companies
        .filter(c => c.professions.includes(selectedCategory))
        .filter(c => !selectedCity || c.city === selectedCity)
    : companies.filter(c => !selectedCity || c.city === selectedCity); // ← ВСЕ компании если город выбран

  return (
    <section className="py-12 lg:py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 animate-fade-in">
          {t.popularCategories}
        </h2>

        {/* Показываем какой город выбран (если выбран) */}
        {selectedCity && (
          <div className="mb-4 text-sm text-muted-foreground">
            {language === "RO" 
              ? `Filtrare după oraș: ${selectedCity}`
              : `Фильтрация по городу: ${selectedCity}`}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
          {visibleProfessions.map((profession, index) => {
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

        {allPopularProfessions.length > 4 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllProfessions(!showAllProfessions)}
              className="px-6 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-all duration-300 hover:scale-105"
            >
              {showAllProfessions 
                ? (language === "RO" ? "Ascunde" : "Скрыть") 
                : (language === "RO" ? "Mai mult" : "Ещё")}
            </button>
          </div>
        )}

        {/* Блок компаний - показываем ВСЕГДА, но с разным заголовком */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground animate-fade-in">
              {selectedCategory 
                ? `${t.companiesTitle}: ${selectedProfession?.name[language]}`
                : (language === "RO" ? "Companii din Republica Moldova" : "Компании Республики Молдова")}
              {selectedCity && ` • ${selectedCity}`}
            </h3>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
          
          {displayedCompanies.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-4">
                {displayedCompanies.length} {language === "RO" ? "companii găsite" : "компаний найдено"}
                {selectedCity && ` ${language === "RO" ? "în" : "в"} ${selectedCity}`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {displayedCompanies.map((company, index) => (
                  <div 
                    key={company.id} 
                    className="self-start animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CompanyCard company={company} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground animate-fade-in py-8">
              {selectedCity && selectedCategory
                ? `${language === "RO" ? "Nu s-au găsit companii cu profesia" : "Не найдено компаний с профессией"} "${selectedProfession?.name[language]}" ${language === "RO" ? "în" : "в"} ${selectedCity}`
                : selectedCity
                ? `${language === "RO" ? "Nu s-au găsit companii în" : "Не найдено компаний в"} ${selectedCity}`
                : t.noResults}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default CategoriesSection;