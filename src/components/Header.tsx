import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo.png";

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

  const toggleLanguage = () => {
    setLanguage(language === "RU" ? "RO" : "RU");
  };

  return (
    <>
      <header className="w-full py-4 px-4 sm:px-6 lg:px-12 animate-fade-in">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - clickable to home */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Explossion" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="text-xl sm:text-2xl font-bold text-foreground hidden sm:inline">Explossion</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language toggle - single button */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 bg-card rounded-lg text-sm font-medium shadow-soft hover:bg-secondary/50 transition-colors text-foreground"
            >
              {language === "RU" ? "RU/RO" : "RO/RU"}
            </button>

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
