import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchResults from "@/components/SearchResults";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import { Company, companies, professions } from "@/data/mockData";
import { translateCity } from "@/components/ui/translateCity";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { language } = useLanguage();
  const { selectedCity, searchQuery, setSearchQuery } = useSearch();

  // Исправленный useEffect для динамического поиска
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      console.log("=== ПОИСК ===");
      console.log("Запрос:", query);
      console.log("Выбранный город:", selectedCity || "Все города");
      
      const filtered = companies.filter((company) => {
        if (selectedCity && company.city !== selectedCity) {
          return false;
        }
        
        if (company.name.toLowerCase().includes(query)) {
          return true;
        }
        
        const cityTranslated = translateCity(company.city);
        if (cityTranslated.toLowerCase().includes(query)) {
          return true;
        }
        
        return company.professions.some(professionId => {
          const profession = professions.find(p => p.id === professionId);
          if (!profession) return false;
          
          return profession.name.RO.toLowerCase().includes(query) || 
                 profession.name.RU.toLowerCase().includes(query);
        });
      });
      
      console.log("Результаты:", filtered.length, "компаний");
      setSearchResults(filtered);
      setHasSearched(true);
    } else {
      // ВАЖНО: сбрасываем при пустом запросе
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchQuery, selectedCity, language]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Header фиксированный */}
      <main className="flex-1"> {/* Убрали pt-0, так как есть header-spacer */}
        <HeroSection onSearch={handleSearch} />
        <SearchResults
          results={searchResults}
          searchQuery={searchQuery}
          isVisible={hasSearched}
        />
        {!hasSearched && <CategoriesSection />}
      </main>
      <Footer />
    </div>
  );
};


export default Index;