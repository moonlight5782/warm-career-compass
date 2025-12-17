import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo.png";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const isAdminPage = location.pathname === "/admin";

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

  const handleLogoClick = () => {
    setSearchQuery("");
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {/* Fixed Header с классами из index.css */}
      <header className="fixed-header py-4 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none group"
          >
            <img 
              src={logo} 
              alt="Explossion" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform group-hover:scale-105" 
            />
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              Explossion
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Кнопка смены языка */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium shadow-soft hover:shadow-hover transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {language}
            </button>

            {/* Кнопка админ-панели */}
            {!isAdminPage && (
              <button
                onClick={() => navigate("/admin")}
                className="p-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
                title={language === "RO" ? "Panou Admin" : "Админ-панель"}
              >
                <Shield className="w-5 h-5" />
              </button>
            )}

            {/* Кнопки регистрации и входа с классами из index.css */}
            <button
              onClick={openRegister}
              className="btn-outline"
            >
              {t.register}
            </button>
            <button
              onClick={openLogin}
              className="btn-primary"
            >
              {t.login}
            </button>
          </div>
        </div>
      </header>

      {/* Компенсирующий спейсер с классом из index.css */}
      <div className="header-spacer" />

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