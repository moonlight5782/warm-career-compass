import { useState, useMemo } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cities, professions, companies, Company } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeroSectionProps {
  onSearch: (results: Company[], query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return professions.filter(
      (p) =>
        p.name.RO.toLowerCase().includes(query) ||
        p.name.RU.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const matchingProfessionIds = professions
      .filter(
        (p) =>
          p.name.RO.toLowerCase().includes(query) ||
          p.name.RU.toLowerCase().includes(query)
      )
      .map((p) => p.id);

    let results = companies.filter((company) =>
      company.professions.some((profId) =>
        matchingProfessionIds.includes(profId)
      )
    );

    // Filter by city if selected
    if (selectedCity && selectedCity !== t.selectCity) {
      results = results.filter((company) => company.city === selectedCity);
    }

    onSearch(results, searchQuery);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (profession: typeof professions[0]) => {
    setSearchQuery(profession.name[language]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-12">
          {t.heroTitle}
        </h1>

        {/* Search bar */}
        <div className="card-warm p-3 lg:p-4 flex flex-col md:flex-row gap-3">
          {/* City selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-foreground font-medium min-w-[160px] justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base">
                  {selectedCity ? t.cities[selectedCity] || selectedCity : t.selectCity}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border shadow-card rounded-xl z-50">
              {cities.map((city) => (
                <DropdownMenuItem
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className="cursor-pointer hover:bg-secondary/50 rounded-lg"
                >
                  {t.cities[city] || city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search input with autocomplete */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-xl bg-secondary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-card z-50 overflow-hidden">
                {suggestions.map((profession) => (
                  <button
                    key={profession.id}
                    onClick={() => handleSuggestionClick(profession)}
                    className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors text-foreground"
                  >
                    {profession.name[language]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="btn-primary flex items-center justify-center gap-2 py-3 px-8"
          >
            <Search className="w-5 h-5" />
            <span>{t.searchButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
