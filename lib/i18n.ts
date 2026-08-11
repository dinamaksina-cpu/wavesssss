import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import el from "@/locales/el.json";
import uk from "@/locales/uk.json";
import { experienceTranslations } from "./experience-i18n";

export const locales = ["en", "ru", "el", "uk"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

const localizedBase = { ru, el, uk } as const;
const localizedDictionaries = Object.fromEntries((["ru", "el", "uk"] as const).map(locale => {
  const base = localizedBase[locale];
  const extra = experienceTranslations[locale];
  return [locale, {
    ...base,
    about: { ...base.about, imageAlt: extra.aboutImageAlt },
    forms: extra.forms,
    pricing: { ...base.pricing, units: { ...base.pricing.units, property: extra.pricingOptions.property }, or: extra.pricingOptions.or, optionDescriptions: { individualWindows: extra.pricingOptions.individualWindows, fullWindows: extra.pricingOptions.fullWindows, fullCarpet: extra.pricingOptions.fullCarpet } },
    gallery: { ...extra.gallery, categories: extra.galleryLabels.categories, alt: extra.galleryLabels.alt },
    social: { follow: extra.socialFollow },
    footer: { ...base.footer, surrounding: extra.surrounding, credit: extra.credit }
  }];
})) as unknown as Record<Exclude<Locale, "en">, Dictionary>;

const dictionaries: Record<Locale, Dictionary> = { en, ...localizedDictionaries };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const languageNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  el: "Ελληνικά",
  uk: "Українська",
};
