import type { Locale } from "./i18n";

export const bookingTranslations: Record<Locale, {
  quickIntro: string; name: string; phone: string; email: string; confirmEmail: string; namePlaceholder: string; phonePlaceholder: string; emailPlaceholder: string;
  customerDetails: string; submitBooking: string; sendRequest: string; submitting: string; required: string; invalidPhone: string; invalidEmail: string; emailMismatch: string;
  sendError: string; rateLimited: string; successTitle: string; successBody: string; successNote: string; home: string; whatsapp: string;
}> = {
  en: {
    quickIntro: "Enter your contact details to prepare your request in WhatsApp.", name: "Name", phone: "Phone number", email: "Email", confirmEmail: "Confirm email", namePlaceholder: "Your name", phonePlaceholder: "+357 97 579867 / +44 7911 123456", emailPlaceholder: "you@example.com",
    customerDetails: "Your contact details", submitBooking: "Continue to WhatsApp", sendRequest: "Continue to WhatsApp", submitting: "Sending…", required: "Complete all required fields.", invalidPhone: "Enter a valid phone number with country code, for example +357 97 579867 or +44 7911 123456.", invalidEmail: "Enter a valid email address.", emailMismatch: "The email addresses do not match.",
    sendError: "We could not send your request. Please try again or contact us on WhatsApp.", rateLimited: "Too many requests were sent. Please wait a few minutes or contact us on WhatsApp.", successTitle: "Thank you.", successBody: "Your request is ready to continue in WhatsApp.", successNote: "Our team will contact you to confirm the details. Your booking is not confirmed yet.", home: "Back to home", whatsapp: "Chat on WhatsApp",
  },
  ru: {
    quickIntro: "Укажите контактные данные, чтобы подготовить заявку в WhatsApp.", name: "Имя", phone: "Номер телефона", email: "Email", confirmEmail: "Подтвердите email", namePlaceholder: "Ваше имя", phonePlaceholder: "+357 97 579867 / +44 7911 123456", emailPlaceholder: "you@example.com",
    customerDetails: "Ваши контактные данные", submitBooking: "Перейти в WhatsApp", sendRequest: "Перейти в WhatsApp", submitting: "Отправка…", required: "Заполните все обязательные поля.", invalidPhone: "Введите корректный номер с кодом страны, например +357 97 579867 или +44 7911 123456.", invalidEmail: "Введите корректный email.", emailMismatch: "Адреса email не совпадают.",
    sendError: "Не удалось отправить запрос. Попробуйте ещё раз или напишите нам в WhatsApp.", rateLimited: "Отправлено слишком много запросов. Подождите несколько минут или напишите нам в WhatsApp.", successTitle: "Спасибо.", successBody: "Ваша заявка готова для продолжения в WhatsApp.", successNote: "Наша команда свяжется с вами для подтверждения деталей. Бронирование пока не подтверждено.", home: "На главную", whatsapp: "Написать в WhatsApp",
  },
  el: {
    quickIntro: "Συμπληρώστε τα στοιχεία επικοινωνίας σας για να προετοιμάσετε το αίτημα στο WhatsApp.", name: "Όνομα", phone: "Τηλέφωνο", email: "Email", confirmEmail: "Επιβεβαίωση email", namePlaceholder: "Το όνομά σας", phonePlaceholder: "+357 97 579867 / +44 7911 123456", emailPlaceholder: "you@example.com",
    customerDetails: "Τα στοιχεία επικοινωνίας σας", submitBooking: "Συνέχεια στο WhatsApp", sendRequest: "Συνέχεια στο WhatsApp", submitting: "Αποστολή…", required: "Συμπληρώστε όλα τα υποχρεωτικά πεδία.", invalidPhone: "Εισαγάγετε έγκυρο αριθμό με κωδικό χώρας, π.χ. +357 97 579867 ή +44 7911 123456.", invalidEmail: "Εισαγάγετε έγκυρη διεύθυνση email.", emailMismatch: "Οι διευθύνσεις email δεν ταιριάζουν.",
    sendError: "Δεν μπορέσαμε να στείλουμε το αίτημά σας. Δοκιμάστε ξανά ή επικοινωνήστε μέσω WhatsApp.", rateLimited: "Στάλθηκαν πάρα πολλά αιτήματα. Περιμένετε λίγα λεπτά ή επικοινωνήστε μέσω WhatsApp.", successTitle: "Ευχαριστούμε.", successBody: "Το αίτημά σας είναι έτοιμο για συνέχεια στο WhatsApp.", successNote: "Η ομάδα μας θα επικοινωνήσει για να επιβεβαιώσει τις λεπτομέρειες. Η κράτηση δεν έχει ακόμη επιβεβαιωθεί.", home: "Επιστροφή στην αρχική", whatsapp: "Συνομιλία στο WhatsApp",
  },
  uk: {
    quickIntro: "Вкажіть контактні дані, щоб підготувати заявку у WhatsApp.", name: "Ім’я", phone: "Номер телефону", email: "Email", confirmEmail: "Підтвердіть email", namePlaceholder: "Ваше ім’я", phonePlaceholder: "+357 97 579867 / +44 7911 123456", emailPlaceholder: "you@example.com",
    customerDetails: "Ваші контактні дані", submitBooking: "Перейти у WhatsApp", sendRequest: "Перейти у WhatsApp", submitting: "Надсилання…", required: "Заповніть усі обов’язкові поля.", invalidPhone: "Введіть коректний номер з кодом країни, наприклад +357 97 579867 або +44 7911 123456.", invalidEmail: "Введіть коректну email-адресу.", emailMismatch: "Email-адреси не збігаються.",
    sendError: "Не вдалося надіслати запит. Спробуйте ще раз або напишіть нам у WhatsApp.", rateLimited: "Надіслано забагато запитів. Зачекайте кілька хвилин або напишіть нам у WhatsApp.", successTitle: "Дякуємо.", successBody: "Ваш запит готовий для продовження у WhatsApp.", successNote: "Наша команда зв’яжеться з вами для підтвердження деталей. Бронювання ще не підтверджене.", home: "На головну", whatsapp: "Написати у WhatsApp",
  },
};
