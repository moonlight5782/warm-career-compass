import { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, X, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { useProfessions } from "@/contexts/ProfessionsContext";
import { cities } from "@/data/mockData";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const { t, language } = useLanguage();
  const { selectedCity, setSelectedCity, searchQuery, setSearchQuery } = useSearch();
  const { professions } = useProfessions();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const cityTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (!localSearchQuery.trim()) return [];
    const query = localSearchQuery.toLowerCase();
    
    return professions
      .filter((p) =>
        p.name.RO.toLowerCase().includes(query) ||
        p.name.RU.toLowerCase().includes(query)
      )
      .map(p => ({
        id: p.id,
        name: p.name[language],
        original: p
      }))
      .slice(0, 8);
  }, [localSearchQuery, language]);

  const handleSearch = () => {
    if (!localSearchQuery.trim()) {
      setSearchQuery("");
      onSearch("");
      return;
    }
    setSearchQuery(localSearchQuery);
    onSearch(localSearchQuery);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const query = suggestion.original.name[language];
    setLocalSearchQuery(query);
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
        const selected = suggestions[selectedSuggestionIndex];
        const query = selected.original.name[language];
        setLocalSearchQuery(query);
        setSearchQuery(query);
        onSearch(query);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      setShowCityDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1);
    
    if (!value.trim()) {
      setSearchQuery("");
      onSearch("");
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  // Обработка клика вне элементов
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Для подсказок поиска
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }

      // Для выпадающего списка городов
      if (
        cityDropdownRef.current && 
        !cityDropdownRef.current.contains(event.target as Node) &&
        cityTriggerRef.current && 
        !cityTriggerRef.current.contains(event.target as Node)
      ) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
          {t.heroTitle || "Găsiți profesioniști calificați"}
        </h1>

        <div className="card-warm p-4 lg:p-5 rounded-2xl flex flex-col md:flex-row gap-4 shadow-card">
          {/* City selector */}
          <div className="relative" ref={cityDropdownRef}>
            <button
              ref={cityTriggerRef}
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="city-selector-trigger w-full md:w-auto flex items-center justify-between gap-2 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base font-medium">
                  {selectedCity ? t.cities?.[selectedCity] || selectedCity : t.selectCity || "Alege orașul"}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-200 ${
                showCityDropdown ? "rotate-180" : ""
              }`} />
            </button>
            
            {/* City dropdown с ограниченной высотой и скроллом */}
            {showCityDropdown && (
              <div 
                className="absolute top-full left-0 right-0 md:left-auto md:w-full mt-2 bg-background border border-border rounded-xl shadow-card z-50 min-w-[200px] overflow-hidden"
                style={{ maxHeight: '336px' }} // Ограничиваем высоту
              >
                <div 
                  className="overflow-y-auto city-dropdown-limited" 
                  style={{ maxHeight: '336px' }}
                >
                  <button
                    onClick={() => handleCitySelect("")}
                    className="w-full px-4 py-3 text-left hover:bg-primary/10 hover:text-primary text-foreground transition-colors sticky top-0 bg-background z-10 border-b border-border/50"
                  >
                    {language === "RO" ? "Toate orașele" : "Все города"}
                  </button>
                  {cities.map((city, index) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full px-4 py-3 text-left hover:bg-primary/10 hover:text-primary text-foreground transition-colors ${
                        selectedCity === city ? "bg-primary/10 text-primary font-semibold" : ""
                      }`}
                    >
                      {t.cities?.[city] || city}
                    </button>
                  ))}
                </div>
                
                {/* Отступ снизу для списка */}
                <div className="h-10" />
                
                {/* Индикатор скролла показываем только если городов больше 6 */}
                {cities.length > 6 && (
                  <div className="absolute bottom-0 left-0 right-0 py-2 bg-gradient-to-t from-background via-background/95 to-transparent text-center pointer-events-none">
                    <div className="text-xs text-muted-foreground px-2 py-1 bg-background/90 rounded-full inline-flex items-center gap-1 shadow-sm">
                      <span className="opacity-70">↑↓</span>
                      <span>{language === "RO" ? "mai multe orașe" : "ещё города"}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search input with autocomplete */}
          <div className="flex-1 relative" ref={suggestionsRef}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder={t.searchPlaceholder || "Caută profesioniști..."}
                value={localSearchQuery}
                onChange={handleInputChange}
                onFocus={() => localSearchQuery.trim() && setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                className="search-input w-full"
              />
              
              {localSearchQuery && (
                <button
                  onClick={() => {
                    setLocalSearchQuery("");
                    setSearchQuery("");
                    onSearch("");
                    setShowSuggestions(false);
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="search-clear-btn"
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions-container">
                <div className="overflow-y-auto max-h-64">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`search-suggestion-item ${
                        index === selectedSuggestionIndex ? "active" : ""
                      }`}
                    >
                      <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-base">{suggestion.name}</span>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground bg-secondary/30">
                  ↑↓ {language === "RO" ? "pentru navigare" : "для навигации"} • 
                  Enter {language === "RO" ? "pentru selectare" : "для выбора"}
                </div>
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="btn-primary flex items-center justify-center gap-2 py-3 px-6 md:px-8 min-w-[120px]"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">{t.searchButton || "Caută"}</span>
          </button>
        </div>
  

        {/* Navigation hint */}
        <div className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
          <span className="px-2 py-1 bg-secondary/50 rounded">↑ ↓</span>
          <span>{language === "RO" ? "pentru navigare" : "для навигации"}</span>
          <span className="mx-2">•</span>
          <span className="px-2 py-1 bg-secondary/50 rounded">Enter</span>
          <span>{language === "RO" ? "pentru selectare" : "для выбора"}</span>
        </div>

        {/* Decorative dots */}
        <div className="mt-10 flex justify-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-primary/60 transition-all duration-300 hover:scale-125"></div>
          <div className="w-2 h-2 rounded-full bg-primary/60 transition-all duration-300 hover:scale-125" style={{transitionDelay: '0.1s'}}></div>
          <div className="w-2 h-2 rounded-full bg-primary/60 transition-all duration-300 hover:scale-125" style={{transitionDelay: '0.2s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;