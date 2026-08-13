import type { Locale } from "@/lib/i18n";
import type { ServiceSlug } from "@/data/services";

export type SeoEntry = { title: string; description: string };

export const homeSeo: Record<Locale, SeoEntry> = {
  en: {
    title: "Cleaning Cyprus | Paphos & Limassol",
    description: "Professional cleaning in Cyprus for homes, offices, Airbnb and holiday rentals. Blue Wave Cleaning serves Paphos, Limassol and surrounding areas.",
  },
  uk: {
    title: "Клінінг Кіпр | Пафос і Лімасол",
    description: "Професійний клінінг на Кіпрі: прибирання квартир, будинків, офісів та Airbnb у Пафосі, Лімасолі й околицях. Blue Wave Cleaning.",
  },
  ru: {
    title: "Клининг Кипр | Пафос и Лимассол",
    description: "Профессиональный клининг на Кипре: уборка квартир, домов, офисов и Airbnb в Пафосе, Лимассоле и ближайших районах. Blue Wave Cleaning.",
  },
  el: {
    title: "Καθαρισμός Κύπρος | Πάφος & Λεμεσός",
    description: "Επαγγελματικός καθαρισμός στην Κύπρο για σπίτια, γραφεία και Airbnb. Blue Wave Cleaning σε Πάφο, Λεμεσό και γύρω περιοχές.",
  },
};

export const sectionSeo: Record<string, Record<Locale, SeoEntry>> = {
  services: {
    en: { title: "Cleaning Services Cyprus | Paphos & Limassol", description: "Home cleaning, office cleaning, Airbnb turnover, deep cleaning, move-in/out and specialty cleaning across Paphos, Limassol and surrounding areas in Cyprus." },
    uk: { title: "Послуги клінінгу Кіпр | Пафос і Лімасол", description: "Прибирання дому, офісів, Airbnb, генеральне прибирання, переїзди та спеціалізований клінінг у Пафосі, Лімасолі й околицях." },
    ru: { title: "Услуги клининга Кипр | Пафос и Лимассол", description: "Уборка домов, офисов, Airbnb, генеральная уборка, уборка при переезде и специальные услуги в Пафосе, Лимассоле и окрестностях." },
    el: { title: "Υπηρεσίες Καθαρισμού Κύπρος | Πάφος & Λεμεσός", description: "Καθαρισμός σπιτιών, γραφείων, Airbnb, βαθύς καθαρισμός, μετακομίσεις και ειδικές υπηρεσίες σε Πάφο, Λεμεσό και γύρω περιοχές." },
  },
  prices: {
    en: { title: "Cleaning Prices Cyprus | Blue Wave Cleaning", description: "View starting prices for home, office, Airbnb, deep, carpet, sofa, window and specialty cleaning in Paphos and Limassol, Cyprus." },
    uk: { title: "Ціни на клінінг Кіпр | Blue Wave Cleaning", description: "Стартові ціни на прибирання дому, офісів, Airbnb, генеральне прибирання, килими, дивани та вікна у Пафосі й Лімасолі." },
    ru: { title: "Цены на клининг Кипр | Blue Wave Cleaning", description: "Стартовые цены на уборку домов, офисов, Airbnb, генеральную уборку, ковры, диваны и окна в Пафосе и Лимассоле." },
    el: { title: "Τιμές Καθαρισμού Κύπρος | Blue Wave Cleaning", description: "Αρχικές τιμές για καθαρισμό κατοικιών, γραφείων, Airbnb, βαθύ καθαρισμό, χαλιά, καναπέδες και παράθυρα σε Πάφο και Λεμεσό." },
  },
  contact: {
    en: { title: "Cleaning Company Paphos & Limassol | Contact", description: "Contact Blue Wave Cleaning for professional cleaning in Paphos, Limassol and surrounding areas, Cyprus. Call, email or message us on WhatsApp." },
    uk: { title: "Клінінг Пафос і Лімасол | Контакти", description: "Зв’яжіться з Blue Wave Cleaning для професійного прибирання у Пафосі, Лімасолі та околицях. Телефон, email або WhatsApp." },
    ru: { title: "Клининг Пафос и Лимассол | Контакты", description: "Свяжитесь с Blue Wave Cleaning для профессиональной уборки в Пафосе, Лимассоле и ближайших районах. Телефон, email или WhatsApp." },
    el: { title: "Καθαρισμός Πάφος & Λεμεσός | Επικοινωνία", description: "Επικοινωνήστε με τη Blue Wave Cleaning για επαγγελματικό καθαρισμό σε Πάφο, Λεμεσό και γύρω περιοχές μέσω τηλεφώνου, email ή WhatsApp." },
  },
  booking: {
    en: { title: "Book Cleaning Cyprus | Paphos & Limassol", description: "Request professional cleaning in Paphos or Limassol. Book home, office, Airbnb, deep or specialty cleaning with Blue Wave Cleaning." },
    uk: { title: "Замовити клінінг Кіпр | Пафос і Лімасол", description: "Залиште заявку на професійне прибирання у Пафосі або Лімасолі: дім, офіс, Airbnb, генеральне чи спеціалізоване прибирання." },
    ru: { title: "Заказать клининг Кипр | Пафос и Лимассол", description: "Оставьте заявку на профессиональную уборку в Пафосе или Лимассоле: дом, офис, Airbnb, генеральная или специализированная уборка." },
    el: { title: "Κράτηση Καθαρισμού Κύπρος | Πάφος & Λεμεσός", description: "Ζητήστε επαγγελματικό καθαρισμό σε Πάφο ή Λεμεσό για σπίτι, γραφείο, Airbnb, βαθύ ή εξειδικευμένο καθαρισμό." },
  },
};

const serviceLabels: Record<ServiceSlug, Record<Locale, string>> = {
  "home-cleaning": { en: "Home Cleaning Cyprus", uk: "Прибирання дому Кіпр", ru: "Уборка дома Кипр", el: "Καθαρισμός Σπιτιού Κύπρος" },
  "deep-cleaning": { en: "Deep Cleaning Cyprus", uk: "Генеральне прибирання Кіпр", ru: "Генеральная уборка Кипр", el: "Βαθύς Καθαρισμός Κύπρος" },
  "office-cleaning": { en: "Office Cleaning Cyprus", uk: "Прибирання офісів Кіпр", ru: "Уборка офисов Кипр", el: "Καθαρισμός Γραφείων Κύπρος" },
  "airbnb-cleaning": { en: "Airbnb Cleaning Cyprus", uk: "Прибирання Airbnb Кіпр", ru: "Уборка Airbnb Кипр", el: "Καθαρισμός Airbnb Κύπρος" },
  "move-in-out-cleaning": { en: "Move In / Move Out Cleaning Cyprus", uk: "Прибирання при переїзді Кіпр", ru: "Уборка при переезде Кипр", el: "Καθαρισμός Μετακόμισης Κύπρος" },
  "post-renovation-cleaning": { en: "Post-Renovation Cleaning Cyprus", uk: "Прибирання після ремонту Кіпр", ru: "Уборка после ремонта Кипр", el: "Καθαρισμός Μετά την Ανακαίνιση Κύπρος" },
  "carpet-cleaning": { en: "Carpet Cleaning Cyprus", uk: "Хімчистка килимів Кіпр", ru: "Химчистка ковров Кипр", el: "Καθαρισμός Χαλιών Κύπρος" },
  "upholstery-cleaning": { en: "Sofa & Upholstery Cleaning Cyprus", uk: "Хімчистка диванів Кіпр", ru: "Химчистка диванов Кипр", el: "Καθαρισμός Καναπέδων Κύπρος" },
  "window-cleaning": { en: "Window Cleaning Cyprus", uk: "Миття вікон Кіпр", ru: "Мойка окон Кипр", el: "Καθαρισμός Παραθύρων Κύπρος" },
};

export function getServiceSeo(locale: Locale, slug: ServiceSlug): SeoEntry {
  const label = serviceLabels[slug][locale];
  const places = locale === "en" ? "Paphos & Limassol" : locale === "uk" ? "Пафос і Лімасол" : locale === "ru" ? "Пафос и Лимассол" : "Πάφος & Λεμεσός";
  const descriptions: Record<Locale, string> = {
    en: `${label} in Paphos, Limassol and surrounding areas. Professional local service from Blue Wave Cleaning with clear starting prices and easy WhatsApp booking.`,
    uk: `${label} у Пафосі, Лімасолі та околицях. Професійний локальний сервіс Blue Wave Cleaning, зрозумілі стартові ціни та зручне бронювання через WhatsApp.`,
    ru: `${label} в Пафосе, Лимассоле и ближайших районах. Профессиональный локальный сервис Blue Wave Cleaning, понятные стартовые цены и удобная заявка через WhatsApp.`,
    el: `${label} σε Πάφο, Λεμεσό και γύρω περιοχές. Επαγγελματική τοπική υπηρεσία Blue Wave Cleaning με σαφείς αρχικές τιμές και εύκολη κράτηση μέσω WhatsApp.`,
  };
  return { title: `${label} | ${places}`, description: descriptions[locale] };
}
