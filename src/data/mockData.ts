export interface Company {
  id: string;
  name: string;
  city: string;
  initial: string;
  description: {
    RO: string;
    RU: string;
  };
  address: string;
  phone: string;
  professions: string[];
  availableDates: string[];
  unavailableDates: string[];
}

export interface Profession {
  id: string;
  name: {
    RO: string;
    RU: string;
  };
  searchCount: number; // для определения популярности
}

export const professions: Profession[] = [
  { id: "frontend", name: { RO: "Frontend Developer", RU: "Frontend разработчик" }, searchCount: 156 },
  { id: "backend", name: { RO: "Backend Developer", RU: "Backend разработчик" }, searchCount: 142 },
  { id: "designer", name: { RO: "Designer", RU: "Дизайнер" }, searchCount: 198 },
  { id: "electrician", name: { RO: "Electrician", RU: "Электрик" }, searchCount: 234 },
  { id: "marketing", name: { RO: "Marketing Specialist", RU: "Маркетолог" }, searchCount: 167 },
  { id: "accountant", name: { RO: "Contabil", RU: "Бухгалтер" }, searchCount: 189 },
  { id: "manager", name: { RO: "Manager", RU: "Менеджер" }, searchCount: 145 },
  { id: "hr", name: { RO: "HR Specialist", RU: "HR Специалист" }, searchCount: 123 },
  { id: "sales", name: { RO: "Sales Manager", RU: "Менеджер по продажам" }, searchCount: 178 },
  { id: "devops", name: { RO: "DevOps Engineer", RU: "DevOps инженер" }, searchCount: 98 },
  { id: "mechanic", name: { RO: "Mecanic Auto", RU: "Автомеханик" }, searchCount: 212 },
  { id: "cook", name: { RO: "Bucătar", RU: "Повар" }, searchCount: 245 },
  { id: "waiter", name: { RO: "Chelner", RU: "Официант" }, searchCount: 187 },
  { id: "driver", name: { RO: "Șofer", RU: "Водитель" }, searchCount: 267 },
  { id: "nurse", name: { RO: "Asistent Medical", RU: "Медсестра" }, searchCount: 156 },
  { id: "teacher", name: { RO: "Profesor", RU: "Учитель" }, searchCount: 134 },
  { id: "lawyer", name: { RO: "Avocat", RU: "Юрист" }, searchCount: 112 },
  { id: "architect", name: { RO: "Arhitect", RU: "Архитектор" }, searchCount: 89 },
  { id: "welder", name: { RO: "Sudor", RU: "Сварщик" }, searchCount: 176 },
  { id: "plumber", name: { RO: "Instalator", RU: "Сантехник" }, searchCount: 198 },
  { id: "security", name: { RO: "Agent de Pază", RU: "Охранник" }, searchCount: 145 },
  { id: "cleaner", name: { RO: "Personal de Curățenie", RU: "Уборщик" }, searchCount: 167 },
  { id: "pharmacist", name: { RO: "Farmacist", RU: "Фармацевт" }, searchCount: 123 },
  { id: "barista", name: { RO: "Barista", RU: "Бариста" }, searchCount: 134 },
];

export const companies: Company[] = [
  {
    id: "darwin",
    name: "Darwin",
    city: "Chișinău",
    initial: "D",
    description: {
      RO: "Companie IT specializată în dezvoltarea de software și soluții digitale pentru afaceri.",
      RU: "IT-компания, специализирующаяся на разработке программного обеспечения и цифровых решений.",
    },
    address: "str. Alexei Mateevici 75, Chișinău",
    phone: "+373 22 123 456",
    professions: ["frontend", "backend", "designer", "devops"],
    availableDates: ["2025-12-16", "2025-12-18", "2025-12-20", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-17", "2025-12-19", "2025-12-24"],
  },
  {
    id: "enter",
    name: "Enter",
    city: "Chișinău",
    initial: "E",
    description: {
      RO: "Retailer lider în Moldova pentru electronice și electrocasnice.",
      RU: "Ведущий молдавский ритейлер электроники и бытовой техники.",
    },
    address: "bd. Ștefan cel Mare 128, Chișinău",
    phone: "+373 22 234 567",
    professions: ["sales", "marketing", "manager", "accountant"],
    availableDates: ["2025-12-17", "2025-12-19", "2025-12-24", "2025-12-26"],
    unavailableDates: ["2025-12-16", "2025-12-20", "2025-12-25"],
  },
  {
    id: "orange",
    name: "Orange Moldova",
    city: "Bălți",
    initial: "O",
    description: {
      RO: "Operator de telecomunicații care oferă servicii mobile și internet.",
      RU: "Телекоммуникационный оператор мобильной связи и интернета.",
    },
    address: "str. Independenței 35, Bălți",
    phone: "+373 231 345 678",
    professions: ["marketing", "sales", "hr", "manager"],
    availableDates: ["2025-12-16", "2025-12-20", "2025-12-25", "2025-12-30"],
    unavailableDates: ["2025-12-18", "2025-12-22", "2025-12-27"],
  },
  {
    id: "moldcell",
    name: "Moldcell",
    city: "Chișinău",
    initial: "M",
    description: {
      RO: "Operator de telefonie mobilă inovator cu tehnologii 4G/5G.",
      RU: "Инновационный мобильный оператор с технологиями 4G/5G.",
    },
    address: "str. Belgrad 3, Chișinău",
    phone: "+373 22 456 789",
    professions: ["frontend", "backend", "marketing", "hr"],
    availableDates: ["2025-12-18", "2025-12-21", "2025-12-24", "2025-12-28"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-23"],
  },
  {
    id: "maib",
    name: "Maib",
    city: "Chișinău",
    initial: "M",
    description: {
      RO: "Cea mai mare bancă din Moldova cu servicii financiare complete.",
      RU: "Крупнейший банк Молдовы с полным спектром финансовых услуг.",
    },
    address: "bd. Ștefan cel Mare 171, Chișinău",
    phone: "+373 22 567 890",
    professions: ["accountant", "manager", "hr", "marketing", "security"],
    availableDates: ["2025-12-17", "2025-12-19", "2025-12-22", "2025-12-26", "2025-12-29"],
    unavailableDates: ["2025-12-16", "2025-12-20", "2025-12-24"],
  },
  {
    id: "starnet",
    name: "Starnet",
    city: "Chișinău",
    initial: "S",
    description: {
      RO: "Provider de internet și televiziune prin cablu de mare viteză.",
      RU: "Провайдер высокоскоростного интернета и кабельного телевидения.",
    },
    address: "str. Calea Ieșilor 8, Chișinău",
    phone: "+373 22 678 901",
    professions: ["frontend", "backend", "electrician", "sales"],
    availableDates: ["2025-12-16", "2025-12-18", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-17", "2025-12-21", "2025-12-25"],
  },
  {
    id: "maximum",
    name: "Maximum",
    city: "Bălți",
    initial: "M",
    description: {
      RO: "Rețea de supermarketuri cu produse de calitate la prețuri accesibile.",
      RU: "Сеть супермаркетов с качественными товарами по доступным ценам.",
    },
    address: "str. Decebal 77, Bălți",
    phone: "+373 231 789 012",
    professions: ["sales", "manager", "accountant", "driver", "cleaner"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-24", "2025-12-28"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-23"],
  },
  {
    id: "supraten",
    name: "Supraten",
    city: "Chișinău",
    initial: "S",
    description: {
      RO: "Producător lider de materiale de construcție și vopsele.",
      RU: "Ведущий производитель строительных материалов и красок.",
    },
    address: "str. Uzinelor 12, Chișinău",
    phone: "+373 22 890 123",
    professions: ["mechanic", "welder", "driver", "manager", "accountant"],
    availableDates: ["2025-12-16", "2025-12-19", "2025-12-22", "2025-12-26"],
    unavailableDates: ["2025-12-17", "2025-12-20", "2025-12-24"],
  },
  {
    id: "orhei_vit",
    name: "Orhei-Vit",
    city: "Orhei",
    initial: "O",
    description: {
      RO: "Producător de sucuri și băuturi naturale din fructe.",
      RU: "Производитель натуральных соков и напитков из фруктов.",
    },
    address: "str. Vasile Lupu 23, Orhei",
    phone: "+373 235 123 456",
    professions: ["cook", "driver", "mechanic", "accountant", "manager"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-25"],
  },
  {
    id: "vinaria_purcari",
    name: "Vinăria Purcari",
    city: "Ștefan Vodă",
    initial: "V",
    description: {
      RO: "Producător premium de vinuri cu tradiție seculară.",
      RU: "Премиальный производитель вин с вековой традицией.",
    },
    address: "s. Purcari, r. Ștefan Vodă",
    phone: "+373 242 234 567",
    professions: ["cook", "waiter", "driver", "manager", "marketing"],
    availableDates: ["2025-12-18", "2025-12-21", "2025-12-24", "2025-12-28"],
    unavailableDates: ["2025-12-16", "2025-12-20", "2025-12-26"],
  },
  {
    id: "hospital_cahul",
    name: "Spitalul Raional Cahul",
    city: "Cahul",
    initial: "S",
    description: {
      RO: "Instituție medicală publică cu servicii complete de sănătate.",
      RU: "Государственное медицинское учреждение с полным спектром услуг.",
    },
    address: "str. Republicii 45, Cahul",
    phone: "+373 299 345 678",
    professions: ["nurse", "pharmacist", "cleaner", "driver", "security"],
    availableDates: ["2025-12-16", "2025-12-19", "2025-12-22", "2025-12-26"],
    unavailableDates: ["2025-12-17", "2025-12-21", "2025-12-24"],
  },
  {
    id: "cafe_floresti",
    name: "Cafe Central Florești",
    city: "Florești",
    initial: "C",
    description: {
      RO: "Cafenea și restaurant cu bucătărie tradițională moldovenească.",
      RU: "Кафе и ресторан с традиционной молдавской кухней.",
    },
    address: "str. Victoriei 12, Florești",
    phone: "+373 250 456 789",
    professions: ["cook", "waiter", "barista", "cleaner", "manager"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-25"],
  },
  {
    id: "auto_service_ungheni",
    name: "AutoService Pro",
    city: "Ungheni",
    initial: "A",
    description: {
      RO: "Service auto complet cu diagnosticare și reparații.",
      RU: "Полный автосервис с диагностикой и ремонтом.",
    },
    address: "str. Națională 89, Ungheni",
    phone: "+373 236 567 890",
    professions: ["mechanic", "welder", "electrician", "manager", "accountant"],
    availableDates: ["2025-12-18", "2025-12-21", "2025-12-24", "2025-12-28"],
    unavailableDates: ["2025-12-16", "2025-12-20", "2025-12-26"],
  },
  {
    id: "school_soroca",
    name: "Liceul Teoretic Soroca",
    city: "Soroca",
    initial: "L",
    description: {
      RO: "Instituție de învățământ cu tradiții educaționale puternice.",
      RU: "Образовательное учреждение с сильными традициями.",
    },
    address: "str. Independenței 34, Soroca",
    phone: "+373 230 678 901",
    professions: ["teacher", "cleaner", "security", "accountant"],
    availableDates: ["2025-12-16", "2025-12-19", "2025-12-22", "2025-12-26"],
    unavailableDates: ["2025-12-17", "2025-12-21", "2025-12-24"],
  },
  {
    id: "comrat_hotel",
    name: "Hotel Comrat Central",
    city: "Comrat",
    initial: "H",
    description: {
      RO: "Hotel confortabil cu servicii de calitate în inima Găgăuziei.",
      RU: "Комфортабельный отель с качественным сервисом в сердце Гагаузии.",
    },
    address: "str. Lenin 56, Comrat",
    phone: "+373 298 789 012",
    professions: ["waiter", "cook", "cleaner", "security", "manager"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-25"],
  },
  {
    id: "edinet_farm",
    name: "Agro-Farm Edineț",
    city: "Edineț",
    initial: "A",
    description: {
      RO: "Fermă agricolă modernă cu producție ecologică.",
      RU: "Современная сельскохозяйственная ферма с экологической продукцией.",
    },
    address: "str. Independenței 78, Edineț",
    phone: "+373 246 890 123",
    professions: ["driver", "mechanic", "accountant", "manager"],
    availableDates: ["2025-12-18", "2025-12-21", "2025-12-24", "2025-12-28"],
    unavailableDates: ["2025-12-16", "2025-12-20", "2025-12-26"],
  },
  {
    id: "drochia_pharmacy",
    name: "Farmacia Sănătate Drochia",
    city: "Drochia",
    initial: "F",
    description: {
      RO: "Rețea de farmacii cu medicamente și produse de îngrijire.",
      RU: "Сеть аптек с лекарствами и средствами ухода.",
    },
    address: "str. 31 August 23, Drochia",
    phone: "+373 252 901 234",
    professions: ["pharmacist", "sales", "cleaner", "accountant"],
    availableDates: ["2025-12-16", "2025-12-19", "2025-12-22", "2025-12-26"],
    unavailableDates: ["2025-12-17", "2025-12-21", "2025-12-24"],
  },
  {
    id: "hincesti_build",
    name: "Construcții Hîncești",
    city: "Hîncești",
    initial: "C",
    description: {
      RO: "Companie de construcții și renovări profesionale.",
      RU: "Компания профессионального строительства и ремонта.",
    },
    address: "str. M. Eminescu 45, Hîncești",
    phone: "+373 269 012 345",
    professions: ["electrician", "plumber", "welder", "driver", "manager"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-25"],
  },
  {
    id: "criuleni_transport",
    name: "Trans-Criuleni",
    city: "Criuleni",
    initial: "T",
    description: {
      RO: "Servicii de transport și logistică în toată Moldova.",
      RU: "Услуги транспорта и логистики по всей Молдове.",
    },
    address: "str. Chișinăului 67, Criuleni",
    phone: "+373 248 123 456",
    professions: ["driver", "mechanic", "manager", "accountant"],
    availableDates: ["2025-12-18", "2025-12-21", "2025-12-24", "2025-12-28"],
    unavailableDates: ["2025-12-16", "2025-12-20", "2025-12-26"],
  },
  {
    id: "singerei_agro",
    name: "Agro-Sîngerei",
    city: "Sîngerei",
    initial: "A",
    description: {
      RO: "Întreprindere agricolă cu producție de cereale și legume.",
      RU: "Сельскохозяйственное предприятие по производству зерна и овощей.",
    },
    address: "str. Independenței 90, Sîngerei",
    phone: "+373 262 234 567",
    professions: ["driver", "mechanic", "welder", "accountant", "manager"],
    availableDates: ["2025-12-16", "2025-12-19", "2025-12-22", "2025-12-26"],
    unavailableDates: ["2025-12-17", "2025-12-21", "2025-12-24"],
  },
  {
    id: "rezina_wood",
    name: "Lemn-Rezina",
    city: "Rezina",
    initial: "L",
    description: {
      RO: "Fabrică de prelucrare a lemnului și mobilă.",
      RU: "Фабрика по переработке древесины и производству мебели.",
    },
    address: "str. Fabricii 12, Rezina",
    phone: "+373 254 345 678",
    professions: ["mechanic", "driver", "welder", "manager", "accountant"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-23", "2025-12-27"],
    unavailableDates: ["2025-12-16", "2025-12-19", "2025-12-25"],
  },
];

export const cities = [
  "Chișinău",
  "Bălți",
  "Orhei",
  "Cahul",
  "Ungheni",
  "Soroca",
  "Edineț",
  "Comrat",
  "Florești",
  "Drochia",
  "Hîncești",
  "Strășeni",
  "Călărași",
  "Criuleni",
  "Sîngerei",
  "Rezina",
  "Ștefan Vodă",
  "Ialoveni",
  "Anenii Noi",
  "Căușeni",
  "Cimișlia",
  "Leova",
  "Nisporeni",
  "Telenești",
  "Fălești",
  "Glodeni",
  "Rîșcani",
  "Briceni",
  "Ocnița",
  "Dondușeni",
  "Taraclia",
  "Basarabeasca",
  "Șoldănești",
  "Dubăsari",
  "Cantemir",
];

// Функция для получения популярных профессий (по количеству поисков)
export const getPopularProfessions = (limit: number = 8) => {
  return [...professions]
    .sort((a, b) => b.searchCount - a.searchCount)
    .slice(0, limit);
};
