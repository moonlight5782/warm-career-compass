import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchResults from "@/components/SearchResults";
import CategoriesSection from "@/components/CategoriesSection";
import CompaniesSection from "@/components/CompaniesSection";
import Footer from "@/components/Footer";
import { Company } from "@/data/mockData";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (results: Company[], query: string) => {
    setSearchResults(results);
    setSearchQuery(query);
    setHasSearched(true);
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
