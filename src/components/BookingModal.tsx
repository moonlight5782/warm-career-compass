import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, User, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  availableDates: string[];
  unavailableDates: string[];
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "14:00", "15:00", "16:00", "17:00"
];

const BookingModal = ({
  isOpen,
  onClose,
  companyName,
  availableDates,
  unavailableDates,
}: BookingModalProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "time" | "info" | "confirm">("date");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const monthNames = {
    RO: [
      "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
      "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
    ],
    RU: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ],
  };

  const dayNames = {
    RO: ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"],
    RU: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  const texts = {
    RO: {
      selectTime: "Selectează ora",
      enterDetails: "Datele dumneavoastră",
      name: "Numele complet",
      phone: "Număr de telefon",
      confirm: "Confirmare",
      confirmText: "Confirmați rezervarea?",
      date: "Data",
      time: "Ora",
      back: "Înapoi",
      next: "Continuă",
      confirmBook: "Confirmă rezervarea",
      successTitle: "Rezervare confirmată!",
      successDesc: "Veți primi un mesaj de confirmare.",
    },
    RU: {
      selectTime: "Выберите время",
      enterDetails: "Ваши данные",
      name: "Полное имя",
      phone: "Номер телефона",
      confirm: "Подтверждение",
      confirmText: "Подтвердите запись?",
      date: "Дата",
      time: "Время",
      back: "Назад",
      next: "Далее",
      confirmBook: "Подтвердить запись",
      successTitle: "Запись подтверждена!",
      successDesc: "Вы получите сообщение с подтверждением.",
    },
  };

  const tx = texts[language];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = (firstDay.getDay() + 6) % 7;

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDateString = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

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
    setGuestPhone(localDigits);
  };

  const isAvailable = (day: number) => {
    return availableDates.includes(formatDateString(day));
  };

  const isUnavailable = (day: number) => {
    return unavailableDates.includes(formatDateString(day));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    if (isAvailable(day)) {
      setSelectedDate(formatDateString(day));
    }
  };

  const handleConfirmBooking = () => {
    if (guestPhone.length < 8) {
      alert(language === "RO" 
        ? "Vă rugăm să introduceți un număr de telefon valid (minim 8 cifre)" 
        : "Пожалуйста, введите корректный номер телефона (минимум 8 цифр)");
      return;
    }
    
    toast({
      title: tx.successTitle,
      description: tx.successDesc,
    });
    onClose();
  };

  const handleNext = () => {
    if (step === "date" && selectedDate) {
      setStep("time");
    } else if (step === "time" && selectedTime) {
      setStep("info");
    } else if (step === "info" && guestName && guestPhone.length >= 8) {
      setStep("confirm");
    } else if (step === "info" && guestPhone.length < 8) {
      alert(language === "RO" 
        ? "Vă rugăm să introduceți un număr de телефон valid (minim 8 cifre)" 
        : "Пожалуйста, введите корректный номер телефона (минимум 8 цифр)");
    }
  };

  const handleBack = () => {
    if (step === "time") setStep("date");
    else if (step === "info") setStep("time");
    else if (step === "confirm") setStep("info");
  };

  const days = getDaysInMonth(currentMonth);

  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };

  const displayPhone = formatPhone(guestPhone);
  const isPhoneValid = guestPhone.length >= 8;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-card rounded-2xl max-w-md p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground text-center mb-2">
              {step === "date" && t.bookExcursion}
              {step === "time" && tx.selectTime}
              {step === "info" && tx.enterDetails}
              {step === "confirm" && tx.confirm}
            </DialogTitle>
            <p className="text-center text-muted-foreground text-sm">{companyName}</p>
          </DialogHeader>

          {step === "date" && (
            <>
              <div className="flex items-center justify-between mt-6 mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <span className="font-semibold text-foreground">
                  {monthNames[language][currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames[language].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day && (
                      <button
                        onClick={() => handleDateClick(day)}
                        disabled={!isAvailable(day)}
                        className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          selectedDate === formatDateString(day)
                            ? "bg-primary text-primary-foreground"
                            : isAvailable(day)
                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                            : isUnavailable(day)
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 cursor-not-allowed"
                            : "text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30" />
                  <span className="text-muted-foreground">{t.availableDates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30" />
                  <span className="text-muted-foreground">{t.unavailableDates}</span>
                </div>
              </div>
            </>
          )}

          {step === "time" && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{tx.selectTime}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-foreground hover:bg-secondary"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "info" && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User className="w-4 h-4" />
                  {tx.name}
                </label>
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={tx.name}
                  className="input-primary"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Phone className="w-4 h-4" />
                  {tx.phone}
                </label>
                <input
                  type="tel"
                  value={displayPhone}
                  onChange={handlePhoneChange}
                  placeholder="+373 XX XXX XXX"
                  className="input-primary"
                  required
                />
                <p className={`text-xs mt-1 ${isPhoneValid ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {language === "RO" 
                    ? `Format: +373 XXX XXX XX (${guestPhone.length}/8 cifre)`
                    : `Формат: +373 XXX XXX XX (${guestPhone.length}/8 цифр)`}
                </p>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="mt-6 space-y-3">
              <p className="text-center text-foreground font-medium mb-4">
                {tx.confirmText}
              </p>
              <div className="bg-secondary/30 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{tx.date}:</span>
                  <span className="text-foreground font-medium">
                    {selectedDate && formatDisplayDate(selectedDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{tx.time}:</span>
                  <span className="text-foreground font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{tx.name}:</span>
                  <span className="text-foreground font-medium">{guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{tx.phone}:</span>
                  <span className="text-foreground font-medium">{displayPhone}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step !== "date" && (
              <button onClick={handleBack} className="flex-1 btn-outline py-3">
                {tx.back}
              </button>
            )}
            {step === "date" && (
              <button onClick={onClose} className="flex-1 btn-outline py-3">
                {t.cancel}
              </button>
            )}
            {step !== "confirm" && (
              <button
                onClick={handleNext}
                disabled={
                  (step === "date" && !selectedDate) ||
                  (step === "time" && !selectedTime) ||
                  (step === "info" && (!guestName || !isPhoneValid))
                }
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tx.next}
              </button>
            )}
            {step === "confirm" && (
              <button
                onClick={handleConfirmBooking}
                className="flex-1 btn-primary py-3"
              >
                {tx.confirmBook}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;