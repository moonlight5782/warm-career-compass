const Footer = () => {
  const links = [
    { label: "Despre noi", href: "#" },
    { label: "Companii", href: "#" },
    { label: "Contacte", href: "#" },
    { label: "Politica de confidențialitate", href: "#" },
  ];

  return (
    <footer className="py-8 px-6 lg:px-12 mt-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-foreground font-semibold">Explossion</span>
          <span className="text-muted-foreground">© 2025</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
