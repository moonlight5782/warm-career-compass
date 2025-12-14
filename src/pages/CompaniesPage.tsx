import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies, cities, professions } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, Filter, ChevronDown } from "lucide-react";

const CompaniesPage = () => {
  const { t, language } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedProfession, setSelectedProfession] = useState<string>("");

  const filteredCompanies = companies.filter((company) => {
    const cityMatch = !selectedCity || company.city === selectedCity;
    const professionMatch =
      !selectedProfession || company.professions.includes(selectedProfession);
    return cityMatch && professionMatch;
  });

  const texts = {
    RO: {
      title: "Toate Companiile",
      subtitle: "Explorează companiile disponibile pentru excursii practice",
      allCities: "Toate orașele",
      allProfessions: "Toate profesiile",
      found: "companii găsite",
    },
    RU: {
      title: "Все Компании",
      subtitle: "Изучите компании, доступные для практических экскурсий",
      allCities: "Все города",
      allProfessions: "Все профессии",
      found: "компаний найдено",
    },
  };

  const tx = texts[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {tx.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            {tx.subtitle}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary/50 transition-colors text-foreground font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>
                    {selectedCity ? t.cities[selectedCity] || selectedCity : tx.allCities}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border shadow-card rounded-xl z-50">
                <DropdownMenuItem
                  onClick={() => setSelectedCity("")}
                  className="cursor-pointer hover:bg-secondary/50 rounded-lg"
                >
                  {tx.allCities}
                </DropdownMenuItem>
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

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary/50 transition-colors text-foreground font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span>
                    {selectedProfession
                      ? professions.find((p) => p.id === selectedProfession)?.name[language]
                      : tx.allProfessions}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border shadow-card rounded-xl z-50 max-h-[300px] overflow-y-auto">
                <DropdownMenuItem
                  onClick={() => setSelectedProfession("")}
                  className="cursor-pointer hover:bg-secondary/50 rounded-lg"
                >
                  {tx.allProfessions}
                </DropdownMenuItem>
                {professions.map((profession) => (
                  <DropdownMenuItem
                    key={profession.id}
                    onClick={() => setSelectedProfession(profession.id)}
                    className="cursor-pointer hover:bg-secondary/50 rounded-lg"
                  >
                    {profession.name[language]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-muted-foreground mb-6">
            {filteredCompanies.length} {tx.found}
          </p>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="self-start">
                <CompanyCard company={company} />
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {t.noResults}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompaniesPage;
