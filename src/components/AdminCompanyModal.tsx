import { useState } from "react";
import { X, Plus, Trash2, Building2, MapPin, Phone, FileText, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfessions } from "@/contexts/ProfessionsContext";
import { cities, Company } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  city: string;
  address: {
    RO: string;
    RU: string;
  };
  phone: string;
}

interface AdminCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompany: (company: Company) => void;
}

const AdminCompanyModal = ({ isOpen, onClose, onAddCompany }: AdminCompanyModalProps) => {
  const { language, t } = useLanguage();
  const { professions, addProfession } = useProfessions();
  const { toast } = useToast();
  
  const [companyName, setCompanyName] = useState("");
  const [mainCity, setMainCity] = useState("");
  const [descriptionRO, setDescriptionRO] = useState("");
  const [descriptionRU, setDescriptionRU] = useState("");
  const [mainAddressRO, setMainAddressRO] = useState("");
  const [mainAddressRU, setMainAddressRU] = useState("");
  const [mainPhone, setMainPhone] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  
  // Для добавления новой профессии
  const [showNewProfessionForm, setShowNewProfessionForm] = useState(false);
  const [newProfessionRO, setNewProfessionRO] = useState("");
  const [newProfessionRU, setNewProfessionRU] = useState("");

  const resetForm = () => {
    setCompanyName("");
    setMainCity("");
    setDescriptionRO("");
    setDescriptionRU("");
    setMainAddressRO("");
    setMainAddressRU("");
    setMainPhone("");
    setSelectedProfessions([]);
    setBranches([]);
    setShowNewProfessionForm(false);
    setNewProfessionRO("");
    setNewProfessionRU("");
  };

  const addBranch = () => {
    setBranches([...branches, { city: "", address: { RO: "", RU: "" }, phone: "" }]);
  };

  const removeBranch = (index: number) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const updateBranch = (index: number, field: keyof Branch | "addressRO" | "addressRU", value: string) => {
    const updated = [...branches];
    if (field === "addressRO") {
      updated[index].address.RO = value;
    } else if (field === "addressRU") {
      updated[index].address.RU = value;
    } else if (field === "city" || field === "phone") {
      updated[index][field] = value;
    }
    setBranches(updated);
  };

  const toggleProfession = (professionId: string) => {
    setSelectedProfessions(prev => 
      prev.includes(professionId)
        ? prev.filter(p => p !== professionId)
        : [...prev, professionId]
    );
  };

  const handleAddNewProfession = () => {
    if (!newProfessionRO.trim() || !newProfessionRU.trim()) {
      toast({
        title: language === "RO" ? "Eroare" : "Ошибка",
        description: language === "RO" 
          ? "Introduceți numele profesiei în ambele limbi" 
          : "Введите название профессии на обоих языках",
        variant: "destructive"
      });
      return;
    }

    const newId = newProfessionRO.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    const newProfession = {
      id: newId,
      name: {
        RO: newProfessionRO.trim(),
        RU: newProfessionRU.trim(),
      },
      searchCount: 0,
    };

    addProfession(newProfession);
    setSelectedProfessions(prev => [...prev, newId]);
    
    toast({
      title: language === "RO" ? "Succes!" : "Успешно!",
      description: language === "RO" 
        ? `Profesia "${newProfessionRO}" a fost adăugată` 
        : `Профессия "${newProfessionRU}" добавлена`,
    });

    setNewProfessionRO("");
    setNewProfessionRU("");
    setShowNewProfessionForm(false);
  };

  const handleSubmit = () => {
    // Validation
    if (!companyName.trim()) {
      toast({
        title: language === "RO" ? "Eroare" : "Ошибка",
        description: language === "RO" ? "Introduceți numele companiei" : "Введите название компании",
        variant: "destructive"
      });
      return;
    }
    if (!mainCity) {
      toast({
        title: language === "RO" ? "Eroare" : "Ошибка",
        description: language === "RO" ? "Selectați orașul principal" : "Выберите основной город",
        variant: "destructive"
      });
      return;
    }
    if (selectedProfessions.length === 0) {
      toast({
        title: language === "RO" ? "Eroare" : "Ошибка",
        description: language === "RO" ? "Selectați cel puțin o profesie" : "Выберите хотя бы одну профессию",
        variant: "destructive"
      });
      return;
    }

    const newCompany: Company = {
      id: companyName.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now(),
      name: companyName,
      city: mainCity,
      initial: companyName.charAt(0).toUpperCase(),
      description: {
        RO: descriptionRO || "Companie profesională din Moldova.",
        RU: descriptionRU || "Профессиональная компания из Молдовы.",
      },
      address: {
        RO: mainAddressRO || `str. Principal, ${mainCity}`,
        RU: mainAddressRU || `ул. Главная, ${mainCity}`,
      },
      phone: mainPhone || "+373 XX XXX XXX",
      professions: selectedProfessions,
      availableDates: [],
      unavailableDates: [],
      // Сохраняем филиалы как дополнительные данные
      ...(branches.length > 0 && { branches })
    };

    onAddCompany(newCompany);
    
    toast({
      title: language === "RO" ? "Succes!" : "Успешно!",
      description: language === "RO" 
        ? `Compania "${companyName}" a fost adăugată` 
        : `Компания "${companyName}" добавлена`,
    });
    
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-card rounded-2xl max-w-2xl p-0 overflow-hidden pointer-events-auto max-h-[90vh]">
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-2rem)]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground text-center mb-6 flex items-center justify-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              {language === "RO" ? "Adăugare Companie" : "Добавить компанию"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground font-medium">
                <Building2 className="w-4 h-4 text-primary" />
                {language === "RO" ? "Numele companiei *" : "Название компании *"}
              </Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={language === "RO" ? "Ex: Tech Solutions SRL" : "Напр: Tech Solutions SRL"}
                className="bg-background border-border"
              />
            </div>

            {/* Main City */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                {language === "RO" ? "Orașul principal *" : "Основной город *"}
              </Label>
              <select
                value={mainCity}
                onChange={(e) => setMainCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">{language === "RO" ? "Selectați orașul" : "Выберите город"}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{t.cities?.[city] || city}</option>
                ))}
              </select>
            </div>

            {/* Main Address */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                {language === "RO" ? "Adresa principală (RO)" : "Основной адрес (RO)"}
              </Label>
              <Input
                value={mainAddressRO}
                onChange={(e) => setMainAddressRO(e.target.value)}
                placeholder="str. Exemplu 123, Oraș"
                className="bg-background border-border"
              />
              <Input
                value={mainAddressRU}
                onChange={(e) => setMainAddressRU(e.target.value)}
                placeholder="ул. Пример 123, Город"
                className="bg-background border-border mt-2"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground font-medium">
                <Phone className="w-4 h-4 text-primary" />
                {language === "RO" ? "Telefon principal" : "Основной телефон"}
              </Label>
              <Input
                value={mainPhone}
                onChange={(e) => setMainPhone(e.target.value)}
                placeholder="+373 XX XXX XXX"
                className="bg-background border-border"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground font-medium">
                <FileText className="w-4 h-4 text-primary" />
                {language === "RO" ? "Descriere" : "Описание"}
              </Label>
              <Textarea
                value={descriptionRO}
                onChange={(e) => setDescriptionRO(e.target.value)}
                placeholder={language === "RO" ? "Descriere în română..." : "Описание на румынском..."}
                className="bg-background border-border min-h-[80px]"
              />
              <Textarea
                value={descriptionRU}
                onChange={(e) => setDescriptionRU(e.target.value)}
                placeholder={language === "RO" ? "Descriere în rusă..." : "Описание на русском..."}
                className="bg-background border-border min-h-[80px] mt-2"
              />
            </div>

            {/* Professions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-foreground font-medium">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {language === "RO" ? "Profesii disponibile *" : "Доступные профессии *"}
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewProfessionForm(!showNewProfessionForm)}
                  className="flex items-center gap-1 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  {language === "RO" ? "Profesie nouă" : "Новая профессия"}
                </Button>
              </div>

              {/* Form for adding new profession */}
              {showNewProfessionForm && (
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {language === "RO" ? "Adăugați o profesie nouă:" : "Добавить новую профессию:"}
                  </p>
                  <Input
                    value={newProfessionRO}
                    onChange={(e) => setNewProfessionRO(e.target.value)}
                    placeholder={language === "RO" ? "Numele în română" : "Название на румынском"}
                    className="bg-background border-border text-sm"
                  />
                  <Input
                    value={newProfessionRU}
                    onChange={(e) => setNewProfessionRU(e.target.value)}
                    placeholder={language === "RO" ? "Numele în rusă" : "Название на русском"}
                    className="bg-background border-border text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddNewProfession}
                      className="btn-primary text-xs"
                    >
                      {language === "RO" ? "Adaugă" : "Добавить"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowNewProfessionForm(false);
                        setNewProfessionRO("");
                        setNewProfessionRU("");
                      }}
                      className="text-xs"
                    >
                      {language === "RO" ? "Anulează" : "Отмена"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-3 bg-secondary/30 rounded-xl border border-border">
                {professions.map((profession) => (
                  <label
                    key={profession.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedProfessions.includes(profession.id)}
                      onCheckedChange={() => toggleProfession(profession.id)}
                    />
                    <span className="text-sm text-foreground">{profession.name[language]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Branches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
                  {language === "RO" ? "Filiale" : "Филиалы"}
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBranch}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  {language === "RO" ? "Adaugă filială" : "Добавить филиал"}
                </Button>
              </div>

              {branches.map((branch, index) => (
                <div key={index} className="p-4 bg-secondary/30 rounded-xl border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {language === "RO" ? `Filiala ${index + 1}` : `Филиал ${index + 1}`}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBranch(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <select
                    value={branch.city}
                    onChange={(e) => updateBranch(index, "city", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm"
                  >
                    <option value="">{language === "RO" ? "Selectați orașul" : "Выберите город"}</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{t.cities?.[city] || city}</option>
                    ))}
                  </select>
                  
                  <Input
                    value={branch.address.RO}
                    onChange={(e) => updateBranch(index, "addressRO", e.target.value)}
                    placeholder={language === "RO" ? "Adresa (RO)" : "Адрес (RO)"}
                    className="bg-background border-border text-sm"
                  />
                  
                  <Input
                    value={branch.address.RU}
                    onChange={(e) => updateBranch(index, "addressRU", e.target.value)}
                    placeholder={language === "RO" ? "Adresa (RU)" : "Адрес (RU)"}
                    className="bg-background border-border text-sm"
                  />
                  
                  <Input
                    value={branch.phone}
                    onChange={(e) => updateBranch(index, "phone", e.target.value)}
                    placeholder={language === "RO" ? "Telefon filială" : "Телефон филиала"}
                    className="bg-background border-border text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full btn-primary py-3 text-lg font-semibold"
            >
              {language === "RO" ? "Adaugă compania" : "Добавить компанию"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCompanyModal;
