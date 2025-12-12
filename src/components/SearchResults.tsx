import { useLanguage } from "@/contexts/LanguageContext";
import { Company } from "@/data/mockData";
import CompanyCard from "./CompanyCard";

interface SearchResultsProps {
  results: Company[];
  searchQuery: string;
  isVisible: boolean;
}

const SearchResults = ({ results, searchQuery, isVisible }: SearchResultsProps) => {
  const { t } = useLanguage();

  if (!isVisible || !searchQuery.trim()) return null;

  return (
    <section className="py-8 px-6 lg:px-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-foreground mb-6">
          {t.searchResults}: "{searchQuery}"
        </h2>

        {results.length > 0 ? (
          <div className="grid gap-4">
            {results.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="card-warm text-center py-12">
            <p className="text-muted-foreground">{t.noResults}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
