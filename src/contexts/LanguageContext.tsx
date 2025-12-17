import { createContext, useContext, useState, ReactNode } from "react";

type Language = "RO" | "RU";

interface Translations {
  // Header
  register: string;
  login: string;
  // Hero
  heroTitle: string;
  searchPlaceholder: string;
  searchButton: string;
  selectCity: string;
  // Categories
  popularCategories: string;
  // Companies
  companiesTitle: string;
  companiesSubtitle: string;
  // Footer
  aboutUs: string;
  companies: string;
  contacts: string;
  privacyPolicy: string;
  // Auth
  loginTitle: string;
  registerTitle: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  orContinueWith: string;
  continueWithGoogle: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  // Company Card
  address: string;
  phone: string;
  otherProfessions: string;
  bookExcursion: string;
  aboutCompany: string;
  // Calendar
  selectDate: string;
  availableDates: string;
  unavailableDates: string;
  book: string;
  cancel: string;
  // Search
  searchResults: string;
  noResults: string;
  // Cities
  cities: {
    [key: string]: string;
  };
}

const translations: Record<Language, Translations> = {
  RO: {
    register: "Înregistrare",
    login: "Logare",
    heroTitle: "Află despre profesia preferată",
    searchPlaceholder: "Frontend, Designer, Electrician...",
    searchButton: "Caută",
    selectCity: "Alege orașul",
    popularCategories: "Categorii populare",
    companiesTitle: "Companii",
    companiesSubtitle: "Companii din Republica Moldova",
    aboutUs: "Despre noi",
    companies: "Companii",
    contacts: "Contacte",
    privacyPolicy: "Politica de confidențialitate",
    loginTitle: "Autentificare",
    registerTitle: "Înregistrare",
    email: "Email",
    password: "Parolă",
    firstName: "Prenume",
    lastName: "Nume",
    orContinueWith: "sau continuă cu",
    continueWithGoogle: "Continuă cu Google",
    dontHaveAccount: "Nu ai cont?",
    alreadyHaveAccount: "Ai deja cont?",
    address: "Adresa",
    phone: "Telefon",
    otherProfessions: "Alte profesii",
    bookExcursion: "Rezervă excursie practică",
    aboutCompany: "Despre companie",
    selectDate: "Selectează data",
    availableDates: "Date disponibile",
    unavailableDates: "Date ocupate",
    book: "Rezervă",
    cancel: "Anulează",
    searchResults: "Rezultate căutare",
    noResults: "Nu s-au găsit rezultate",
    cities: {
      "Chișinău": "Chișinău",
      "Bălți": "Bălți",
      "Orhei": "Orhei",
      "Cahul": "Cahul",
      "Ungheni": "Ungheni",
      "Soroca": "Soroca",
      "Edineț": "Edineț",
      "Comrat": "Comrat",
      "Florești": "Florești",
      "Drochia": "Drochia",
      "Hîncești": "Hîncești",
      "Strășeni": "Strășeni",
      "Călărași": "Călărași",
      "Criuleni": "Criuleni",
      "Sîngerei": "Sîngerei",
      "Rezina": "Rezina",
      "Ștefan Vodă": "Ștefan Vodă",
      "Ialoveni": "Ialoveni",
      "Anenii Noi": "Anenii Noi",
      "Căușeni": "Căușeni",
      "Cimișlia": "Cimișlia",
      "Leova": "Leova",
      "Nisporeni": "Nisporeni",
      "Telenești": "Telenești",
      "Fălești": "Fălești",
      "Glodeni": "Glodeni",
      "Rîșcani": "Rîșcani",
      "Briceni": "Briceni",
      "Ocnița": "Ocnița",
      "Dondușeni": "Dondușeni",
      "Taraclia": "Taraclia",
      "Basarabeasca": "Basarabeasca",
      "Șoldănești": "Șoldănești",
      "Dubăsari": "Dubăsari",
      "Cantemir": "Cantemir",
    },
  },
  RU: {
    register: "Регистрация",
    login: "Вход",
    heroTitle: "Узнай о любимой профессии",
    searchPlaceholder: "Frontend, Дизайнер, Электрик...",
    searchButton: "Найти",
    selectCity: "Выбери город",
    popularCategories: "Популярные категории",
    companiesTitle: "Компании",
    companiesSubtitle: "Компании Республики Молдова",
    aboutUs: "О нас",
    companies: "Компании",
    contacts: "Контакты",
    privacyPolicy: "Политика конфиденциальности",
    loginTitle: "Авторизация",
    registerTitle: "Регистрация",
    email: "Email",
    password: "Пароль",
    firstName: "Имя",
    lastName: "Фамилия",
    orContinueWith: "или продолжить через",
    continueWithGoogle: "Продолжить с Google",
    dontHaveAccount: "Нет аккаунта?",
    alreadyHaveAccount: "Уже есть аккаунт?",
    address: "Адрес",
    phone: "Телефон",
    otherProfessions: "Другие профессии",
    bookExcursion: "Записаться на экскурсию",
    aboutCompany: "О компании",
    selectDate: "Выберите дату",
    availableDates: "Доступные даты",
    unavailableDates: "Занятые даты",
    book: "Записаться",
    cancel: "Отмена",
    searchResults: "Результаты поиска",
    noResults: "Результаты не найдены",
    cities: {
              "Chișinău": "Кишинёв",
              "Bălți": "Бельцы",
              "Orhei": "Орхей",
              "Cahul": "Кагул",
              "Ungheni": "Унгены",
              "Soroca": "Сороки",
              "Edineț": "Единцы", 
              "Comrat": "Комрат",
              "Florești": "Флорешты",
              "Drochia": "Дрокия",
              "Hîncești": "Хынчешты",
              "Ștefan Vodă": "Штефан-Водэ",
              "Rezina": "Резина",
              "Sîngerei": "Сынжерей",
              "Criuleni": "Криуляны",
              "Strășeni": "Стрэшены",
              "Călărași": "Калараш",
              "Căușeni": "Каушаны",
              "Ialoveni": "Яловены",
              "Anenii Noi": "Новые Анены",
              "Cimișlia": "Чимишлия",
              "Leova": "Леова",
              "Nisporeni": "Ниспорены",
              "Telenești": "Теленешты",
              "Fălești": "Фалешты",
              "Glodeni": "Глодяны",
              "Rîșcani": "Рышканы",
              "Briceni": "Бричаны",
              "Ocnița": "Окница",
              "Dondușeni": "Дондюшаны",
              "Taraclia": "Тараклия",
              "Basarabeasca": "Басарабяска",
              "Șoldănești": "Шолданешты",
              "Dubăsari": "Дубосары",
              "Cantemir": "Кантемир"
            },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("RO");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context; 
};
