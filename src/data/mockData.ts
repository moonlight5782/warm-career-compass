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
  professions: string[];
  availableDates: string[]; // ISO date strings
}

export interface Profession {
  id: string;
  name: {
    RO: string;
    RU: string;
  };
}

export const professions: Profession[] = [
  { id: "frontend", name: { RO: "Frontend Developer", RU: "Frontend разработчик" } },
  { id: "backend", name: { RO: "Backend Developer", RU: "Backend разработчик" } },
  { id: "designer", name: { RO: "Designer", RU: "Дизайнер" } },
  { id: "electrician", name: { RO: "Electrician", RU: "Электрик" } },
  { id: "marketing", name: { RO: "Marketing Specialist", RU: "Маркетолог" } },
  { id: "accountant", name: { RO: "Contabil", RU: "Бухгалтер" } },
  { id: "manager", name: { RO: "Manager", RU: "Менеджер" } },
  { id: "hr", name: { RO: "HR Specialist", RU: "HR Специалист" } },
  { id: "sales", name: { RO: "Sales Manager", RU: "Менеджер по продажам" } },
  { id: "devops", name: { RO: "DevOps Engineer", RU: "DevOps инженер" } },
];

export const companies: Company[] = [
  {
    id: "darwin",
    name: "Darwin",
    city: "Chișinău",
    initial: "D",
    description: {
      RO: "Companie IT specializată în dezvoltarea de software și soluții digitale pentru afaceri. Oferim servicii de dezvoltare web, mobile și consultanță tehnologică.",
      RU: "IT-компания, специализирующаяся на разработке программного обеспечения и цифровых решений для бизнеса. Предлагаем услуги веб и мобильной разработки.",
    },
    address: "str. Alexei Mateevici 75, Chișinău",
    professions: ["frontend", "backend", "designer", "devops"],
    availableDates: ["2025-12-16", "2025-12-18", "2025-12-20", "2025-12-23", "2025-12-27"],
  },
  {
    id: "enter",
    name: "Enter",
    city: "Chișinău",
    initial: "E",
    description: {
      RO: "Retailer lider în Moldova pentru electronice și electrocasnice. Peste 50 de magazine în toată țara cu cele mai bune prețuri și servicii.",
      RU: "Ведущий молдавский ритейлер электроники и бытовой техники. Более 50 магазинов по всей стране с лучшими ценами и сервисом.",
    },
    address: "bd. Ștefan cel Mare 128, Chișinău",
    professions: ["sales", "marketing", "manager", "accountant"],
    availableDates: ["2025-12-17", "2025-12-19", "2025-12-24", "2025-12-26"],
  },
  {
    id: "orange",
    name: "Orange",
    city: "Bălți",
    initial: "O",
    description: {
      RO: "Operator de telecomunicații care oferă servicii mobile, internet fix și televiziune. Lider pe piața moldovenească a comunicațiilor.",
      RU: "Телекоммуникационный оператор, предоставляющий мобильную связь, фиксированный интернет и телевидение. Лидер молдавского рынка связи.",
    },
    address: "str. Independenței 35, Bălți",
    professions: ["marketing", "sales", "hr", "manager"],
    availableDates: ["2025-12-16", "2025-12-20", "2025-12-25", "2025-12-30"],
  },
  {
    id: "moldcell",
    name: "Moldcell",
    city: "Chișinău",
    initial: "M",
    description: {
      RO: "Operator de telefonie mobilă inovator, oferind cele mai noi tehnologii 4G/5G și servicii digitale pentru consumatori și afaceri.",
      RU: "Инновационный мобильный оператор, предлагающий новейшие технологии 4G/5G и цифровые услуги для потребителей и бизнеса.",
    },
    address: "str. Belgrad 3, Chișinău",
    professions: ["frontend", "backend", "marketing", "hr"],
    availableDates: ["2025-12-18", "2025-12-21", "2025-12-24", "2025-12-28"],
  },
  {
    id: "maib",
    name: "Maib",
    city: "Chișinău",
    initial: "M",
    description: {
      RO: "Cea mai mare bancă din Moldova, oferind servicii financiare complete pentru persoane fizice și juridice. Inovație și siguranță în banking.",
      RU: "Крупнейший банк Молдовы, предлагающий полный спектр финансовых услуг для физических и юридических лиц. Инновации и безопасность в банкинге.",
    },
    address: "bd. Ștefan cel Mare 171, Chișinău",
    professions: ["accountant", "manager", "hr", "marketing"],
    availableDates: ["2025-12-17", "2025-12-19", "2025-12-22", "2025-12-26", "2025-12-29"],
  },
  {
    id: "starnet",
    name: "Starnet",
    city: "Chișinău",
    initial: "S",
    description: {
      RO: "Provider de internet și televiziune prin cablu. Oferim conexiuni de mare viteză și conținut TV de calitate.",
      RU: "Провайдер интернета и кабельного телевидения. Предлагаем высокоскоростные подключения и качественный ТВ контент.",
    },
    address: "str. Calea Ieșilor 8, Chișinău",
    professions: ["frontend", "backend", "electrician", "sales"],
    availableDates: ["2025-12-16", "2025-12-18", "2025-12-23", "2025-12-27"],
  },
  {
    id: "maximum",
    name: "Maximum",
    city: "Bălți",
    initial: "M",
    description: {
      RO: "Rețea de supermarketuri cu produse alimentare și non-alimentare de calitate la prețuri accesibile.",
      RU: "Сеть супермаркетов с качественными продовольственными и непродовольственными товарами по доступным ценам.",
    },
    address: "str. Decebal 77, Bălți",
    professions: ["sales", "manager", "accountant"],
    availableDates: ["2025-12-17", "2025-12-20", "2025-12-24", "2025-12-28"],
  },
];

export const cities = [
  "Chișinău",
  "Bălți",
  "Orhei",
  "Cahul",
  "Ungheni",
  "Tiraspol",
  "Comrat",
];
