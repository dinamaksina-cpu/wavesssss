import type { Locale } from "./i18n";

type MessageCopy = { greeting: string; intro: string; closing: string };
type WhatsAppBookingCopy = { quickFormIntro: string; readyTitle: string; readyBody: string; manualSendNote: string; continue: string; quick: MessageCopy; quote: MessageCopy };

export const whatsappBookingTranslations: Record<Locale, WhatsAppBookingCopy> = {
  en: {
    quickFormIntro: "Enter your contact details to prepare a WhatsApp request.",
    readyTitle: "Your request is ready.",
    readyBody: "Continue in WhatsApp to send it.",
    manualSendNote: "The message is not sent automatically. Review it in WhatsApp and tap Send.",
    continue: "Continue to WhatsApp",
    quick: { greeting: "Hello Blue Wave Cleaning,", intro: "I would like to request a cleaning.", closing: "Please contact me to confirm the details." },
    quote: { greeting: "Hello Blue Wave Cleaning,", intro: "I would like to request a quote.", closing: "Please contact me to confirm the details and final price." },
  },
  ru: {
    quickFormIntro: "Укажите контактные данные, чтобы подготовить заявку для WhatsApp.",
    readyTitle: "Ваша заявка готова.",
    readyBody: "Перейдите в WhatsApp, чтобы отправить её.",
    manualSendNote: "Сообщение не отправляется автоматически. Проверьте его в WhatsApp и нажмите «Отправить».",
    continue: "Перейти в WhatsApp",
    quick: { greeting: "Здравствуйте, Blue Wave Cleaning!", intro: "Я хочу оставить заявку на уборку.", closing: "Пожалуйста, свяжитесь со мной, чтобы уточнить детали." },
    quote: { greeting: "Здравствуйте, Blue Wave Cleaning!", intro: "Я хочу запросить расчёт стоимости уборки.", closing: "Пожалуйста, свяжитесь со мной, чтобы уточнить детали и окончательную стоимость." },
  },
  el: {
    quickFormIntro: "Συμπληρώστε τα στοιχεία επικοινωνίας σας για να ετοιμάσετε το αίτημα στο WhatsApp.",
    readyTitle: "Το αίτημά σας είναι έτοιμο.",
    readyBody: "Συνεχίστε στο WhatsApp για να το στείλετε.",
    manualSendNote: "Το μήνυμα δεν αποστέλλεται αυτόματα. Ελέγξτε το στο WhatsApp και πατήστε Αποστολή.",
    continue: "Συνέχεια στο WhatsApp",
    quick: { greeting: "Γεια σας, Blue Wave Cleaning!", intro: "Θα ήθελα να ζητήσω μια υπηρεσία καθαρισμού.", closing: "Παρακαλώ επικοινωνήστε μαζί μου για να επιβεβαιώσουμε τις λεπτομέρειες." },
    quote: { greeting: "Γεια σας, Blue Wave Cleaning!", intro: "Θα ήθελα να ζητήσω προσφορά καθαρισμού.", closing: "Παρακαλώ επικοινωνήστε μαζί μου για να επιβεβαιώσουμε τις λεπτομέρειες και την τελική τιμή." },
  },
  uk: {
    quickFormIntro: "Вкажіть контактні дані, щоб підготувати запит для WhatsApp.",
    readyTitle: "Ваш запит готовий.",
    readyBody: "Перейдіть у WhatsApp, щоб надіслати його.",
    manualSendNote: "Повідомлення не надсилається автоматично. Перевірте його у WhatsApp і натисніть «Надіслати».",
    continue: "Перейти у WhatsApp",
    quick: { greeting: "Вітаю, Blue Wave Cleaning!", intro: "Я хочу залишити заявку на прибирання.", closing: "Будь ласка, зв’яжіться зі мною, щоб уточнити деталі." },
    quote: { greeting: "Вітаю, Blue Wave Cleaning!", intro: "Я хочу отримати розрахунок вартості прибирання.", closing: "Будь ласка, зв’яжіться зі мною, щоб уточнити деталі та фінальну вартість." },
  },
};
