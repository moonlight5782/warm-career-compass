import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Save, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  const { language } = useLanguage();
  const { user, profile, signOut, refreshProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const texts = {
    RO: {
      title: "Cabinetul meu",
      firstName: "Prenume",
      lastName: "Nume",
      phone: "Telefon",
      email: "Email",
      save: "Salvează",
      logout: "Ieșire",
      saved: "Salvat!",
      savedDesc: "Datele au fost actualizate cu succes.",
      loginRequired: "Trebuie să fiți autentificat",
    },
    RU: {
      title: "Мой кабинет",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Телефон",
      email: "Email",
      save: "Сохранить",
      logout: "Выход",
      saved: "Сохранено!",
      savedDesc: "Данные успешно обновлены.",
      loginRequired: "Необходимо авторизоваться",
    },
  };

  const t = texts[language];

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    const localDigits = digits.replace(/^373/, "");
    
    if (localDigits.length === 0) return "+373 ";
    if (localDigits.length <= 2) return `+373 ${localDigits}`;
    if (localDigits.length <= 5) return `+373 ${localDigits.slice(0, 2)} ${localDigits.slice(2)}`;
    return `+373 ${localDigits.slice(0, 2)} ${localDigits.slice(2, 5)} ${localDigits.slice(5, 8)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digits = value.replace(/\D/g, "");
    const localDigits = digits.replace(/^373/, "");
    setPhone(localDigits);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      })
      .eq("user_id", user.id);
    
    setIsSaving(false);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t.saved,
        description: t.savedDesc,
      });
      refreshProfile();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">{t.title}</h1>
        
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <User className="w-4 h-4" />
                {t.firstName}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <User className="w-4 h-4" />
                {t.lastName}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="w-4 h-4" />
              {t.email}
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-secondary/50 text-muted-foreground cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Phone className="w-4 h-4" />
              {t.phone}
            </label>
            <input
              type="tel"
              value={formatPhone(phone)}
              onChange={handlePhoneChange}
              placeholder="+373 XX XXX XXX"
              className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t.save}
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 btn-outline py-3 flex items-center justify-center gap-2 text-red-500 border-red-500/30 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              {t.logout}
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
