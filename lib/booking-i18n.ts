import type { Locale } from "./i18n";

export const bookingTranslations: Record<Locale, {
  quickIntro: string; name: string; phone: string; email: string; confirmEmail: string; namePlaceholder: string; phonePlaceholder: string; emailPlaceholder: string;
  customerDetails: string; submitBooking: string; sendRequest: string; submitting: string; required: string; invalidPhone: string; invalidEmail: string; emailMismatch: string;
  sendError: string; rateLimited: string; successTitle: string; successBody: string; successNote: string; home: string; whatsapp: string;
}> = {
  en: {
    quickIntro: "Send your contact details securely. We will email you a copy and contact you to confirm the service.", name: "Name", phone: "Phone number", email: "Email", confirmEmail: "Confirm email", namePlaceholder: "Your name", phonePlaceholder: "+357 97 579867", emailPlaceholder: "you@example.com",
    customerDetails: "Your contact details", submitBooking: "Request booking", sendRequest: "Send request", submitting: "Sending…", required: "Complete all required fields.", invalidPhone: "Enter a valid international phone number, for example +357 97 579867.", invalidEmail: "Enter a valid email address.", emailMismatch: "The email addresses do not match.",
    sendError: "We could not send your request. Please try again or contact us on WhatsApp.", rateLimited: "Too many requests were sent. Please wait a few minutes or contact us on WhatsApp.", successTitle: "Thank you.", successBody: "We received your request and sent a confirmation to your email.", successNote: "Our team will contact you to confirm the details. Your booking is not confirmed yet.", home: "Back to home", whatsapp: "Chat on WhatsApp",
  },
  ru: {
    quickIntro: "Безопасно отправьте контактные данные. Мы пришлём копию на email и свяжемся с вами для подтверждения услуги.", name: "Имя", phone: "Номер телефона", email: "Email", confirmEmail: "Подтвердите email", namePlaceholder: "Ваше имя", phonePlaceholder: "+357 97 579867", emailPlaceholder: "you@example.com",
    customerDetails: "Ваши контактные данные", submitBooking: "Запросить бронирование", sendRequest: "Отправить запрос", submitting: "Отправка…", required: "Заполните все обязательные поля.", invalidPhone: "Введите корректный международный номер, например +357 97 579867.", invalidEmail: "Введите корректный email.", emailMismatch: "Адреса email не совпадают.",
    sendError: "Не удалось отправить запрос. Попробуйте ещё раз или напишите нам в WhatsApp.", rateLimited: "Отправлено слишком много запросов. Подождите несколько минут или напишите нам в WhatsApp.", successTitle: "Спасибо.", successBody: "Мы получили ваш запрос и отправили подтверждение на email.", successNote: "Наша команда свяжется с вами для подтверждения деталей. Бронирование пока не подтверждено.", home: "На главную", whatsapp: "Написать в WhatsApp",
  },
  el: {
    quickIntro: "Στείλτε με ασφάλεια τα στοιχεία σας. Θα σας στείλουμε αντίγραφο με email και θα επικοινωνήσουμε για επιβεβαίωση της υπηρεσίας.", name: "Όνομα", phone: "Τηλέφωνο", email: "Email", confirmEmail: "Επιβεβαίωση email", namePlaceholder: "Το όνομά σας", phonePlaceholder: "+357 97 579867", emailPlaceholder: "you@example.com",
    customerDetails: "Τα στοιχεία επικοινωνίας σας", submitBooking: "Αίτημα κράτησης", sendRequest: "Αποστολή αιτήματος", submitting: "Αποστολή…", required: "Συμπληρώστε όλα τα υποχρεωτικά πεδία.", invalidPhone: "Εισαγάγετε έγκυρο διεθνή αριθμό, π.χ. +357 97 579867.", invalidEmail: "Εισαγάγετε έγκυρη διεύθυνση email.", emailMismatch: "Οι διευθύνσεις email δεν ταιριάζουν.",
    sendError: "Δεν μπορέσαμε να στείλουμε το αίτημά σας. Δοκιμάστε ξανά ή επικοινωνήστε μέσω WhatsApp.", rateLimited: "Στάλθηκαν πάρα πολλά αιτήματα. Περιμένετε λίγα λεπτά ή επικοινωνήστε μέσω WhatsApp.", successTitle: "Ευχαριστούμε.", successBody: "Λάβαμε το αίτημά σας και στείλαμε επιβεβαίωση στο email σας.", successNote: "Η ομάδα μας θα επικοινωνήσει για να επιβεβαιώσει τις λεπτομέρειες. Η κράτηση δεν έχει ακόμη επιβεβαιωθεί.", home: "Επιστροφή στην αρχική", whatsapp: "Συνομιλία στο WhatsApp",
  },
  uk: {
    quickIntro: "Безпечно надішліть контактні дані. Ми надішлемо копію на email і зв’яжемося з вами для підтвердження послуги.", name: "Ім’я", phone: "Номер телефону", email: "Email", confirmEmail: "Підтвердіть email", namePlaceholder: "Ваше ім’я", phonePlaceholder: "+357 97 579867", emailPlaceholder: "you@example.com",
    customerDetails: "Ваші контактні дані", submitBooking: "Запросити бронювання", sendRequest: "Надіслати запит", submitting: "Надсилання…", required: "Заповніть усі обов’язкові поля.", invalidPhone: "Введіть коректний міжнародний номер, наприклад +357 97 579867.", invalidEmail: "Введіть коректну email-адресу.", emailMismatch: "Email-адреси не збігаються.",
    sendError: "Не вдалося надіслати запит. Спробуйте ще раз або напишіть нам у WhatsApp.", rateLimited: "Надіслано забагато запитів. Зачекайте кілька хвилин або напишіть нам у WhatsApp.", successTitle: "Дякуємо.", successBody: "Ми отримали ваш запит і надіслали підтвердження на email.", successNote: "Наша команда зв’яжеться з вами для підтвердження деталей. Бронювання ще не підтверджене.", home: "На головну", whatsapp: "Написати у WhatsApp",
  },
};
