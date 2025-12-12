import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cities = [
  "Chișinău",
  "Bălți",
  "Orhei",
  "Cahul",
  "Ungheni",
  "Tiraspol",
  "Comrat",
];

const Header = () => {
  const [selectedCity, setSelectedCity] = useState("Chișinău");
  const [language, setLanguage] = useState<"RO" | "RU">("RO");

  return (
    <header className="w-full py-4 px-6 lg:px-12 animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">Explossion</span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* City selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-secondary/50 transition-colors text-foreground font-medium shadow-soft">
              {selectedCity}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border shadow-card rounded-xl">
              {cities.map((city) => (
                <DropdownMenuItem
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className="cursor-pointer hover:bg-secondary/50 rounded-lg"
                >
                  {city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language toggle */}
          <div className="flex items-center bg-card rounded-xl p-1 shadow-soft">
            <button
              onClick={() => setLanguage("RU")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                language === "RU"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage("RO")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                language === "RO"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              RO
            </button>
          </div>

          {/* Auth buttons */}
          <button className="hidden sm:block btn-outline text-sm py-2 px-4">
            Înregistrare
          </button>
          <button className="btn-primary text-sm py-2 px-5">
            Logare
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
