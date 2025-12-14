import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { label: t.aboutUs, href: "/about" },
    { label: t.companies, href: "/companies" },
    { label: t.contacts, href: "/contacts" },
    { label: t.privacyPolicy, href: "/privacy" },
  ];

  return (
    <footer className="py-8 px-6 lg:px-12 mt-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-foreground font-semibold">Explossion</span>
          <span className="text-muted-foreground">© 2025</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
