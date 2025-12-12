import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
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

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Alege orașul");

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12 animate-fade-in-up">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-12">
          Află despre profesia preferată
        </h1>

        {/* Search bar */}
        <div className="card-warm p-3 lg:p-4 flex flex-col md:flex-row gap-3">
          {/* City selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-foreground font-medium min-w-[160px] justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base">{selectedCity}</span>
              </div>
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

          {/* Search input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Frontend, Designer, Electrician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-secondary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Search button */}
          <button className="btn-primary flex items-center justify-center gap-2 py-3 px-8">
            <Search className="w-5 h-5" />
            <span>Caută</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
