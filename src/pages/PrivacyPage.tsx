import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPage = () => {
  const { language } = useLanguage();

  const content = {
    RO: {
      title: "Politica de Confidențialitate",
      lastUpdated: "Ultima actualizare: Decembrie 2025",
      sections: [
        {
          title: "1. Informații pe care le colectăm",
          text: "Colectăm informații pe care ni le furnizați direct, cum ar fi numele, adresa de email, numărul de telefon și alte date necesare pentru rezervarea excursiilor practice.",
        },
        {
          title: "2. Cum utilizăm informațiile",
          text: "Utilizăm informațiile colectate pentru a procesa rezervările, a comunica cu dumneavoastră și a îmbunătăți serviciile noastre. Nu vindem sau transmitem datele dumneavoastră terților.",
        },
        {
          title: "3. Securitatea datelor",
          text: "Implementăm măsuri tehnice și organizaționale adecvate pentru a proteja informațiile dumneavoastră personale împotriva accesului neautorizat, pierderii sau distrugerii.",
        },
        {
          title: "4. Cookie-uri",
          text: "Utilizăm cookie-uri pentru a îmbunătăți experiența dumneavoastră pe site. Puteți configura browserul pentru a refuza cookie-urile, însă acest lucru poate afecta funcționalitatea site-ului.",
        },
        {
          title: "5. Drepturile dumneavoastră",
          text: "Aveți dreptul de a accesa, corecta sau șterge datele dumneavoastră personale. Pentru orice solicitare, contactați-ne la adresa de email indicată.",
        },
        {
          title: "6. Modificări ale politicii",
          text: "Ne rezervăm dreptul de a actualiza această politică. Orice modificări vor fi publicate pe această pagină cu data actualizării.",
        },
      ],
    },
    RU: {
      title: "Политика Конфиденциальности",
      lastUpdated: "Последнее обновление: Декабрь 2025",
      sections: [
        {
          title: "1. Информация, которую мы собираем",
          text: "Мы собираем информацию, которую вы предоставляете напрямую, такую как имя, адрес электронной почты, номер телефона и другие данные, необходимые для бронирования практических экскурсий.",
        },
        {
          title: "2. Как мы используем информацию",
          text: "Мы используем собранную информацию для обработки бронирований, связи с вами и улучшения наших услуг. Мы не продаем и не передаем ваши данные третьим лицам.",
        },
        {
          title: "3. Безопасность данных",
          text: "Мы применяем соответствующие технические и организационные меры для защиты вашей личной информации от несанкционированного доступа, потери или уничтожения.",
        },
        {
          title: "4. Cookies",
          text: "Мы используем cookies для улучшения вашего опыта на сайте. Вы можете настроить браузер для отклонения cookies, но это может повлиять на функциональность сайта.",
        },
        {
          title: "5. Ваши права",
          text: "Вы имеете право на доступ, исправление или удаление ваших персональных данных. По любым запросам обращайтесь к нам по указанному адресу электронной почты.",
        },
        {
          title: "6. Изменения политики",
          text: "Мы оставляем за собой право обновлять эту политику. Любые изменения будут опубликованы на этой странице с указанием даты обновления.",
        },
      ],
    },
  };

  const c = content[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {c.title}
          </h1>
          <p className="text-muted-foreground mb-12 animate-fade-in">
            {c.lastUpdated}
          </p>

          <div className="space-y-8">
            {c.sections.map((section, index) => (
              <section key={index} className="animate-fade-in-up">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
