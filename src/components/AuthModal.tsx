import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onSwitchMode: () => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const { t, language } = useLanguage();
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "register" && phone.length < 8) {
      toast({
        title: language === "RO" ? "Eroare" : "Ошибка",
        description: language === "RO" 
          ? "Vă rugăm să introduceți un număr de telefon valid (minim 8 cifre)" 
          : "Пожалуйста, введите корректный номер телефона (минимум 8 цифр)",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    if (mode === "register") {
      const { error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        phone: phone
      });
      
      if (error) {
        let errorMessage = error.message;
        if (error.message.includes("already registered")) {
          errorMessage = language === "RO" 
            ? "Acest email este deja înregistrat" 
            : "Этот email уже зарегистрирован";
        }
        toast({
          title: language === "RO" ? "Eroare" : "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === "RO" ? "Succes!" : "Успешно!",
          description: language === "RO" 
            ? "Contul a fost creat cu succes" 
            : "Аккаунт успешно создан",
        });
        clearForm();
        onClose();
      }
    } else {
      const { error } = await signIn(email, password);
      
      if (error) {
        let errorMessage = error.message;
        if (error.message.includes("Invalid login")) {
          errorMessage = language === "RO" 
            ? "Email sau parolă incorectă" 
            : "Неверный email или пароль";
        }
        toast({
          title: language === "RO" ? "Eroare" : "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === "RO" ? "Bine ați venit!" : "Добро пожаловать!",
          description: language === "RO" 
            ? "Autentificare reușită" 
            : "Вход выполнен успешно",
        });
        clearForm();
        onClose();
      }
    }
    
    setIsLoading(false);
  };

  const isPhoneValid = phone.length >= 8;
  const displayPhone = formatPhone(phone);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-card rounded-2xl max-w-md p-0 overflow-hidden pointer-events-auto">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground text-center mb-6">
              {mode === "login" ? t.loginTitle : t.registerTitle}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t.firstName}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    required={mode === "register"}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t.lastName}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    required={mode === "register"}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {language === "RO" ? "Telefon" : "Телефон"}
                </label>
                <input
                  type="tel"
                  value={displayPhone}
                  onChange={handlePhoneChange}
                  placeholder="+373 XX XXX XXX"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  disabled={isLoading}
                />
                <p className={`text-xs mt-1 ${isPhoneValid ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {language === "RO" 
                    ? `Format: +373 XXX XXX XX (${phone.length}/8 cifre)`
                    : `Формат: +373 XXX XXX XX (${phone.length}/8 цифр)`}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? (language === "RO" ? "Se încarcă..." : "Загрузка...")
                : (mode === "login" ? t.login : t.register)
              }
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            {mode === "login" ? t.dontHaveAccount : t.alreadyHaveAccount}{" "}
            <button
              onClick={onSwitchMode}
              className="text-primary font-medium hover:underline"
              disabled={isLoading}
            >
              {mode === "login" ? t.register : t.login}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
