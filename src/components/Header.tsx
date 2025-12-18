import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, User, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo.png";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { setSearchQuery } = useSearch();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPage = location.pathname === "/admin";

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
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

  const handleProfileClick = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate("/admin");
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed-header py-3 sm:py-4 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none group"
          >
            <img 
              src={logo} 
              alt="Explossion" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105" 
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              Explossion
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium shadow-soft hover:shadow-hover transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {language}
            </button>

            {/* Admin button - only for admins */}
            {!isAdminPage && isAdmin && (
              <button
                onClick={handleAdminClick}
                className="p-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
                title={language === "RO" ? "Panou Admin" : "Админ-панель"}
              >
                <Shield className="w-5 h-5" />
              </button>
            )}

            {/* Auth buttons or Profile */}
            {user ? (
              <button
                onClick={handleProfileClick}
                className="btn-primary flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                {language === "RO" ? "Cabinet" : "Кабинет"}
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium"
            >
              {language}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {user ? (
                <>
                  <button
                    onClick={handleProfileClick}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {language === "RO" ? "Cabinet" : "Кабинет"}
                  </button>
                  {isAdmin && !isAdminPage && (
                    <button
                      onClick={handleAdminClick}
                      className="w-full btn-outline py-3 flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      {language === "RO" ? "Panou Admin" : "Админ-панель"}
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={openLogin}
                    className="w-full btn-primary py-3"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={openRegister}
                    className="w-full btn-outline py-3"
                  >
                    {t.register}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
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
