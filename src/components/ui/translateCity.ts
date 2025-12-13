// Города Республики Молдова
const cityTranslations: Record<string, string> = {
  "Chisinau": "Кишинёв",
  "Balti": "Бельцы",
  "Cahul": "Кахул",
  "Comrat": "Комрат",
  "Orhei": "Орхей",
  "Soroca": "Сорока",
  "Ungheni": "Унгены",
  "Edinet": "Единец",
  "Tiraspol": "Тирасполь",
  "Bender": "Бендеры",
};

export function translateCity(city: string): string {
  return cityTranslations[city] || city;
}
