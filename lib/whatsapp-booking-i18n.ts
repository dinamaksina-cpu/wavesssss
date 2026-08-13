import type { Locale } from "./i18n";

type MessageCopy = { greeting: string; intro: string; closing: string };
type WhatsAppBookingCopy = { quickFormIntro: string; readyTitle: string; readyBody: string; manualSendNote: string; continue: string; quick: MessageCopy; quote: MessageCopy };

export const whatsappBookingTranslations: Record<Locale, WhatsAppBookingCopy> = {
  en: {
    quickFormIntro: "Enter your contact details. WhatsApp will open with your request ready to review and send.",
    readyTitle: "Your request is ready.", readyBody: "Review it in WhatsApp and tap Send.", manualSendNote: "The message is not sent automatically.", continue: "Continue to WhatsApp",
    quick: { greeting: "Hello Blue Wave Cleaning,", intro: "I would like to request a cleaning service.", closing: "Please contact me to confirm the details." },
    quote: { greeting: "Hello Blue Wave Cleaning,", intro: "I would like to request a cleaning quote.", closing: "Please contact me to confirm the details and final price." },
  },
  ru: {
    quickFormIntro: "Укажите контактные данные. WhatsApp откроется с готовой заявкой — проверьте её и нажмите «Отправить».",
    readyTitle: "Ваша заявка готова.", readyBody: "Проверьте её в WhatsApp и нажмите «Отправить».", manualSendNote: "Сообщение не отправляется автоматически.", continue: "Перейти в WhatsApp",
    quick: { greeting: "Здравствуйте, Blue Wave Cleaning!", intro: "Я хочу оставить заявку на уборку.", closing: "Пожалуйста, свяжитесь со мной, чтобы уточнить детали." },
    quote: { greeting: "Здравствуйте, Blue Wave Cleaning!", intro: "Я хочу получить расчёт стоимости уборки.", closing: "Пожалуйста, свяжитесь со мной, чтобы уточнить детали и итоговую стоимость." },
  },
  el: {
    quickFormIntro: "Συμπληρώστε τα στοιχεία επικοινωνίας σας. Το WhatsApp θα ανοίξει με έτοιμο το αίτημα για έλεγχο και αποστολή.",
    readyTitle: "Το αίτημά σας είναι έτοιμο.", readyBody: "Ελέγξτε το στο WhatsApp και πατήστε Αποστολή.", manualSendNote: "Το μήνυμα δεν αποστέλλεται αυτόματα.", continue: "Συνέχεια στο WhatsApp",
    quick: { greeting: "Γεια σας, Blue Wave Cleaning!", intro: "Θα ήθελα να ζητήσω υπηρεσία καθαρισμού.", closing: "Παρακαλώ επικοινωνήστε μαζί μου για να επιβεβαιώσουμε τις λεπτομέρειες." },
    quote: { greeting: "Γεια σας, Blue Wave Cleaning!", intro: "Θα ήθελα να ζητήσω προσφορά καθαρισμού.", closing: "Παρακαλώ επικοινωνήστε μαζί μου για να επιβεβαιώσουμε τις λεπτομέρειες και την τελική τιμή." },
  },
  uk: {
    quickFormIntro: "Вкажіть контактні дані. WhatsApp відкриється з готовою заявкою — перевірте її та натисніть «Надіслати».",
    readyTitle: "Ваш запит готовий.", readyBody: "Перевірте його у WhatsApp і натисніть «Надіслати».", manualSendNote: "Повідомлення не надсилається автоматично.", continue: "Перейти у WhatsApp",
    quick: { greeting: "Вітаю, Blue Wave Cleaning!", intro: "Я хочу залишити заявку на прибирання.", closing: "Будь ласка, зв’яжіться зі мною, щоб уточнити деталі." },
    quote: { greeting: "Вітаю, Blue Wave Cleaning!", intro: "Я хочу отримати розрахунок вартості прибирання.", closing: "Будь ласка, зв’яжіться зі мною, щоб уточнити деталі та остаточну вартість." },
  },
};
