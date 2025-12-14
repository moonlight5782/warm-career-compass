import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactsPage = () => {
  const { language } = useLanguage();

  const content = {
    RO: {
      title: "Contacte",
      subtitle: "Suntem aici pentru a vă ajuta",
      email: "Email",
      phone: "Telefon",
      address: "Adresa",
      hours: "Program de lucru",
      hoursValue: "Luni - Vineri: 9:00 - 18:00",
      addressValue: "str. Ștefan cel Mare 180, Chișinău, Moldova",
      formTitle: "Trimite-ne un mesaj",
      name: "Numele tău",
      emailLabel: "Email-ul tău",
      message: "Mesajul tău",
      send: "Trimite mesajul",
    },
    RU: {
      title: "Контакты",
      subtitle: "Мы здесь, чтобы помочь вам",
      email: "Email",
      phone: "Телефон",
      address: "Адрес",
      hours: "Время работы",
      hoursValue: "Понедельник - Пятница: 9:00 - 18:00",
      addressValue: "ул. Штефан чел Маре 180, Кишинёв, Молдова",
      formTitle: "Напишите нам",
      name: "Ваше имя",
      emailLabel: "Ваш email",
      message: "Ваше сообщение",
      send: "Отправить сообщение",
    },
  };

  const c = content[language];

  const contacts = [
    { icon: Mail, label: c.email, value: "contact@explossion.md" },
    { icon: Phone, label: c.phone, value: "+373 22 123 456" },
    { icon: MapPin, label: c.address, value: c.addressValue },
    { icon: Clock, label: c.hours, value: c.hoursValue },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {c.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
            {c.subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in-up">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{contact.label}</p>
                    <p className="text-muted-foreground">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {c.formTitle}
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {c.name}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {c.message}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary py-3">
                    {c.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactsPage;
