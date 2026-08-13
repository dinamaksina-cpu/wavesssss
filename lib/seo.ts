import type { Locale } from "@/lib/i18n";

export const seoHome: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Blue Wave Cleaning | Professional Cleaning in Paphos & Limassol",
    description: "Professional home, office, Airbnb, deep and specialized cleaning in Paphos, Limassol and surrounding areas, Cyprus. Book Blue Wave Cleaning online or via WhatsApp.",
    ogLocale: "en_CY",
  },
  uk: {
    title: "Blue Wave Cleaning | Прибирання в Пафосі та Лімасолі",
    description: "Професійне прибирання будинків, офісів, Airbnb та туристичної нерухомості в Пафосі, Лімасолі й околицях на Кіпрі. Заявка онлайн або через WhatsApp.",
    ogLocale: "uk_UA",
  },
  ru: {
    title: "Blue Wave Cleaning | Уборка в Пафосе и Лимассоле",
    description: "Профессиональная уборка домов, офисов, Airbnb и туристической недвижимости в Пафосе, Лимассоле и окрестностях на Кипре. Заявка онлайн или через WhatsApp.",
    ogLocale: "ru_RU",
  },
  el: {
    title: "Blue Wave Cleaning | Καθαρισμός σε Πάφο & Λεμεσό",
    description: "Επαγγελματικός καθαρισμός κατοικιών, γραφείων, Airbnb και τουριστικών καταλυμάτων στην Πάφο, τη Λεμεσό και τις γύρω περιοχές της Κύπρου.",
    ogLocale: "el_CY",
  },
};

export function brandedTitle(title: string) {
  return title.includes("Blue Wave Cleaning") ? title : `${title} | Blue Wave Cleaning`;
}
