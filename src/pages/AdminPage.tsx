import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Building2, Shield, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminCompanyModal from "@/components/AdminCompanyModal";
import CompanyCard from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { companies as initialCompanies, Company } from "@/data/mockData";

const AdminPage = () => {
  const { language } = useLanguage();
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleAddCompany = (newCompany: Company) => {
    setCompanies([newCompany, ...companies]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {language === "RO" ? "Acces interzis" : "Доступ запрещен"}
            </h1>
            <p className="text-muted-foreground">
              {language === "RO" 
                ? "Această pagină este disponibilă doar pentru administratori" 
                : "Эта страница доступна только администраторам"}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "RO" ? "Panou Administrativ" : "Панель администратора"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {language === "RO" 
                  ? "Gestionarea companiilor pe platformă" 
                  : "Управление компаниями на платформе"}
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 py-3 px-6"
          >
            <Plus className="w-5 h-5" />
            {language === "RO" ? "Adaugă companie" : "Добавить компанию"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-warm p-5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{companies.length}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "RO" ? "Companii totale" : "Всего компаний"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card-warm p-5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(companies.map(c => c.city)).size}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "RO" ? "Orașe acoperite" : "Охвачено городов"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card-warm p-5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(companies.flatMap(c => c.professions)).size}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "RO" ? "Profesii disponibile" : "Доступных профессий"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            {language === "RO" ? "Lista companiilor" : "Список компаний"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      
      <AdminCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCompany={handleAddCompany}
      />
    </div>
  );
};

export default AdminPage;
