import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/data/mockData";

const CompaniesSection = () => {
  const { t } = useLanguage();

  // Show first 5 companies
  const displayCompanies = companies.slice(0, 5);

  return (
    <section className="py-12 lg:py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 animate-fade-in">
          {t.companiesTitle}
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in">
          {t.companiesSubtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {displayCompanies.map((company, index) => (
            <div
              key={company.id}
              className="card-warm flex items-center gap-4 cursor-pointer group py-5 px-5"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="company-avatar group-hover:scale-110 transition-transform duration-300">
                {company.initial}
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {company.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{company.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
