import { useState } from "react";
import { MapPin, ChevronDown, Phone, Briefcase } from "lucide-react";
import { Company, professions } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import BookingModal from "./BookingModal";

interface Props {
  company: Company;
}

const CompanyCard = ({ company }: Props) => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const getProfessionName = (id: string) => {
    const profession = professions.find((p) => p.id === id);
    return profession ? profession.name[language] : id;
  };

  return (
    <>
      <div className="card-warm p-4 bg-card border border-border rounded-xl shadow-soft overflow-hidden">
        {/* Header - always visible */}
        <div
          className="flex items-start justify-between gap-4 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">{company.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              {t.cities[company.city] || company.city}
            </div>
          </div>

          <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Expandable content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {t.cities[company.city] || company.city}, {company.address}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>{company.phone}</span>
              </div>

              <div className="flex items-start gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4 text-primary mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {company.professions.map((profId) => (
                    <span
                      key={profId}
                      className="px-2 py-0.5 bg-secondary/50 rounded-md text-xs"
                    >
                      {getProfessionName(profId)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold text-foreground mb-1">
                  {t.aboutCompany}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {company.description[language]}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBooking(true);
                }}
                className="w-full mt-2 btn-primary py-3"
              >
                {t.bookExcursion}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          companyName={company.name}
          availableDates={company.availableDates}
          unavailableDates={company.unavailableDates}
        />
      )}
    </>
  );
};

export default CompanyCard;
