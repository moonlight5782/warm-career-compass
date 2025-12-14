import { useState } from "react";
import { X, MapPin, Phone, Briefcase } from "lucide-react";
import { createPortal } from "react-dom";
import { Company, professions } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import BookingModal from "./BookingModal";

interface Props {
  company: Company;
  anchorRect: DOMRect;
  onClose: () => void;
}

const CompanyExpanded = ({ company, anchorRect, onClose }: Props) => {
  const { t, language } = useLanguage();
  const [showBooking, setShowBooking] = useState(false);

  const getProfessionName = (id: string) => {
    const profession = professions.find((p) => p.id === id);
    return profession ? profession.name[language] : id;
  };

  const style: React.CSSProperties = {
    position: "fixed",
    top: anchorRect.top,
    left: anchorRect.left,
    width: anchorRect.width,
    zIndex: 50,
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Expanded card */}
      <div
        style={style}
        className="bg-card border border-border rounded-xl shadow-card p-5 animate-fade-in z-50"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-foreground">{company.name}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-secondary/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

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
        </div>

        <button
          onClick={() => setShowBooking(true)}
          className="w-full mt-4 btn-primary py-3"
        >
          {t.bookExcursion}
        </button>
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
    </>,
    document.body
  );
};

export default CompanyExpanded;
