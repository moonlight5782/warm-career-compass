import { useLanguage } from "@/contexts/LanguageContext";
import { Company } from "@/data/mockData";
import CompanyCard from "./CompanyCard";

interface SearchResultsProps {
  results: Company[];
  searchQuery: string;
  isVisible: boolean;
}

const SearchResults = ({ results, searchQuery, isVisible }: SearchResultsProps) => {
  const { t, language } = useLanguage();

  if (!isVisible || !searchQuery.trim()) return null;

  return (
    <section className="py-8 px-6 lg:px-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {t.searchResults}: "{searchQuery}"
        </h2>
        
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((company, index) => (
              <div 
                key={company.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === "RO" 
                ? `Nu s-au găsit rezultate pentru "${searchQuery}"`
                : `Результаты не найдены для "${searchQuery}"`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;