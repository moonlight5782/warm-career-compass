import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { language } = useLanguage();

  const content = {
    RO: {
      title: "Despre Noi",
      subtitle: "Explossion - Platforma ta pentru explorarea profesiilor",
      mission: "Misiunea Noastră",
      missionText:
        "Explossion este o platformă inovatoare care conectează tinerii și adulții curioși cu companii din diverse domenii. Scopul nostru este să oferim oportunități de a explora profesii prin excursii practice, ajutându-vă să luați decizii informate despre cariera voastră.",
      vision: "Viziunea Noastră",
      visionText:
        "Ne dorim să devenim platforma principală din Moldova pentru explorarea profesiilor, oferind acces facil la experiențe practice în diverse industrii.",
      values: "Valorile Noastre",
      valuesList: [
        "Accesibilitate - Facem explorarea profesiilor disponibilă pentru toți",
        "Calitate - Colaborăm doar cu companii verificate",
        "Inovație - Folosim tehnologia pentru a simplifica procesul",
        "Comunitate - Construim punți între generații și industrii",
      ],
    },
    RU: {
      title: "О Нас",
      subtitle: "Explossion - Твоя платформа для изучения профессий",
      mission: "Наша Миссия",
      missionText:
        "Explossion - это инновационная платформа, которая связывает молодежь и любознательных взрослых с компаниями из различных отраслей. Наша цель - предоставить возможности для изучения профессий через практические экскурсии, помогая вам принимать осознанные решения о карьере.",
      vision: "Наше Видение",
      visionText:
        "Мы стремимся стать главной платформой в Молдове для изучения профессий, предоставляя легкий доступ к практическому опыту в различных отраслях.",
      values: "Наши Ценности",
      valuesList: [
        "Доступность - Делаем изучение профессий доступным для всех",
        "Качество - Сотрудничаем только с проверенными компаниями",
        "Инновации - Используем технологии для упрощения процесса",
        "Сообщество - Строим мосты между поколениями и отраслями",
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
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
            {c.subtitle}
          </p>

          <div className="space-y-12">
            <section className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-4">{c.mission}</h2>
              <p className="text-muted-foreground leading-relaxed">{c.missionText}</p>
            </section>

            <section className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-4">{c.vision}</h2>
              <p className="text-muted-foreground leading-relaxed">{c.visionText}</p>
            </section>

            <section className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-4">{c.values}</h2>
              <ul className="space-y-3">
                {c.valuesList.map((value, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {value}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
