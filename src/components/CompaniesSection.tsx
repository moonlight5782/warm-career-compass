import { useLanguage } from "@/contexts/LanguageContext";
import { companies } from "@/data/mockData";
import CompanyCard from "./CompanyCard";

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start">
          {displayCompanies.map((company) => (
            <div key={company.id} className="self-start">
              <CompanyCard company={company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
