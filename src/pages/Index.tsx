import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchResults from "@/components/SearchResults";
import CategoriesSection from "@/components/CategoriesSection";
import CompaniesSection from "@/components/CompaniesSection";
import Footer from "@/components/Footer";
import { Company, companies } from "@/data/mockData";
import { translateCity } from "@/ui/translateCity";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // динамическая фильтрация по запросу
  useEffect(() => {
    if (searchQuery) {
      const filtered = companies.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        translateCity(c.city).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setHasSearched(true);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchQuery]);

  // обработчик поиска из HeroSection
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection onSearch={handleSearch} />
        <SearchResults
          results={searchResults}
          searchQuery={searchQuery}
          isVisible={hasSearched}
        />
        {!hasSearched && (
          <>
            <CategoriesSection />
            <CompaniesSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
