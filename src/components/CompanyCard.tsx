import { useRef, useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Company } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import CompanyExpanded from "./CompanyExpanded";

interface Props {
  company: Company;
}

const CompanyCard = ({ company }: Props) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const toggle = () => {
    if (!cardRef.current) return;
    setRect(cardRef.current.getBoundingClientRect());
    setOpen((v) => !v);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="card-warm p-4 bg-white border rounded-lg shadow"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">{company.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {t.cities[company.city] || company.city}
            </div>
          </div>

          <button
            onClick={toggle}
            className="p-2 rounded hover:bg-secondary/50"
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      {open && rect && (
        <CompanyExpanded
          company={company}
          anchorRect={rect}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default CompanyCard;
