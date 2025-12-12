const companies = [
  { name: "Darwin", city: "Chișinău", initial: "D", color: "bg-primary" },
  { name: "Enter", city: "Chișinău", initial: "E", color: "bg-accent" },
  { name: "Orange", city: "Bălți", initial: "O", color: "bg-primary" },
  { name: "Moldcell", city: "Chișinău", initial: "M", color: "bg-accent" },
  { name: "Maib", city: "Chișinău", initial: "M", color: "bg-primary" },
];

const CompaniesSection = () => {
  return (
    <section className="py-12 lg:py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Companii
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in">
          Companii din Republica Moldova
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="card-warm flex items-center gap-4 cursor-pointer group py-5 px-5"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className={`company-avatar ${company.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {company.initial}
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {company.name}
                </h3>
                <p className="text-sm text-muted-foreground">{company.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
