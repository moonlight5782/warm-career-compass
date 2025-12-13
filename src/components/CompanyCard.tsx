<div className="card-warm flex flex-col w-full relative overflow-hidden">
  {/* Header */}
  <div className="flex items-start gap-4 mb-4">
    <div className="company-avatar shrink-0">{company.initial}</div>
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-lg text-foreground">{company.name}</h3>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <MapPin className="w-4 h-4" />
        <span>{getCityName(company.city)}</span>
      </div>
    </div>
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
    >
      {isExpanded ? (
        <ChevronUp className="w-5 h-5 text-muted-foreground" />
      ) : (
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  </div>

  {/* Expanded content */}
  <div
    className={`transition-all duration-300 ease-in-out overflow-hidden ${
      isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div className="space-y-4 mt-2">
      {/* About */}
      <div>
        <h4 className="font-semibold text-foreground text-sm mb-1">{t.aboutCompany}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{company.description[language]}</p>
      </div>
      {/* Address */}
      <div>
        <h4 className="font-semibold text-foreground text-sm mb-1">{t.address}</h4>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{company.address}</span>
        </div>
      </div>
      {/* Phone */}
      <div>
        <h4 className="font-semibold text-foreground text-sm mb-1">{t.phone}</h4>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Phone className="w-4 h-4 text-primary" />
          <a href={`tel:${company.phone}`} className="hover:text-primary transition-colors">{company.phone}</a>
        </div>
      </div>
      {/* Other professions */}
      <div>
        <h4 className="font-semibold text-foreground text-sm mb-2">{t.otherProfessions}</h4>
        <div className="flex flex-wrap gap-2">
          {company.professions.map((profId) => (
            <span key={profId} className="px-3 py-1 rounded-full bg-secondary/50 text-foreground text-xs font-medium">
              {getProfessionName(profId)}
            </span>
          ))}
        </div>
      </div>
      {/* Book button */}
      <button
        onClick={() => setIsCalendarOpen(true)}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-2"
      >
        <Calendar className="w-5 h-5" />
        {t.bookExcursion}
      </button>
    </div>
  </div>
</div>
