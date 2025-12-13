import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  availableDates: string[];
  unavailableDates: string[];
}

const BookingCalendar = ({
  isOpen,
  onClose,
  companyName,
  availableDates,
  unavailableDates,
}: BookingCalendarProps) => {
  const { t, language } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // December 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = (firstDay.getDay() + 6) % 7; // Monday = 0

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

  const handleBook = () => {
    if (selectedDate) {
      // Demo - just close
      onClose();
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border shadow-card rounded-2xl max-w-md p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground text-center mb-2">
              {t.bookExcursion}
            </DialogTitle>
            <p className="text-center text-muted-foreground text-sm">{companyName}</p>
          </DialogHeader>

          {/* Month navigation */}
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

          {/* Day names */}
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

          {/* Calendar grid */}
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

          {/* Legend */}
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

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 btn-outline py-3"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleBook}
              disabled={!selectedDate}
              className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.book}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCalendar;
