import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthModal from "./AuthModal";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  return (
    <>
      <header className="w-full py-4 px-6 lg:px-12 animate-fade-in">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - clickable to home */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">Explossion</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Language toggle */}
            <div className="flex items-center bg-card rounded-xl p-1 shadow-soft">
              <button
                onClick={() => setLanguage("RU")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  language === "RU"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("RO")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  language === "RO"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RO
              </button>
            </div>

            {/* Auth buttons */}
            <button
              onClick={openRegister}
              className="btn-outline text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4"
            >
              {t.register}
            </button>
            <button
              onClick={openLogin}
              className="btn-primary text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-5"
            >
              {t.login}
            </button>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchAuthMode}
      />
    </>
  );
};

export default Header;
