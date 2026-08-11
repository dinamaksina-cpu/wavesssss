import { parsePhoneNumberFromString } from "libphonenumber-js";

export const bookingLocales = ["en", "ru", "el", "uk"] as const;
export type BookingLocale = (typeof bookingLocales)[number];
export type BookingKind = "quick" | "quote";

export type QuoteDetails = {
  service: string;
  city: string;
  propertyType: string;
  rooms?: string;
  bathrooms?: string;
  area?: string;
};

export type BookingSubmission = {
  kind: BookingKind;
  locale: BookingLocale;
  name: string;
  phone: string;
  email: string;
  confirmEmail: string;
  website?: string;
  idempotencyKey: string;
  quote?: QuoteDetails;
};

export type ValidBookingSubmission = Omit<BookingSubmission, "phone" | "email" | "confirmEmail"> & {
  phone: string;
  email: string;
  confirmEmail: string;
};

export type BookingValidationError = "required" | "invalidPhone" | "invalidEmail" | "emailMismatch" | "invalidQuote" | "invalidRequest";

export function normalizeEmail(value: string) {
  const trimmed = value.trim();
  const at = trimmed.lastIndexOf("@");
  if (at <= 0 || at === trimmed.length - 1) return trimmed;
  return `${trimmed.slice(0, at)}@${trimmed.slice(at + 1).toLowerCase()}`;
}

export function normalizePhone(value: string) {
  const phone = parsePhoneNumberFromString(value.trim(), "CY");
  return phone?.isValid() ? phone.number : null;
}

const emailPattern = /^[^\s@]{1,64}@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const clean = (value: unknown, max = 200) => typeof value === "string" ? value.trim().slice(0, max) : "";

export function validateBookingSubmission(input: unknown): { ok: true; data: ValidBookingSubmission } | { ok: false; error: BookingValidationError } {
  if (!input || typeof input !== "object") return { ok: false, error: "invalidRequest" };
  const raw = input as Record<string, unknown>;
  const kind = raw.kind === "quick" || raw.kind === "quote" ? raw.kind : null;
  const locale = bookingLocales.includes(raw.locale as BookingLocale) ? raw.locale as BookingLocale : null;
  const name = clean(raw.name, 100);
  const phone = normalizePhone(clean(raw.phone, 40));
  const email = normalizeEmail(clean(raw.email, 254));
  const confirmEmail = normalizeEmail(clean(raw.confirmEmail, 254));
  const website = clean(raw.website, 200);
  const idempotencyKey = clean(raw.idempotencyKey, 100);

  if (!kind || !locale || !idempotencyKey) return { ok: false, error: "invalidRequest" };
  if (name.length < 2 || !raw.phone || !email || !confirmEmail) return { ok: false, error: "required" };
  if (!phone) return { ok: false, error: "invalidPhone" };
  if (!emailPattern.test(email)) return { ok: false, error: "invalidEmail" };
  if (email !== confirmEmail) return { ok: false, error: "emailMismatch" };

  let quote: QuoteDetails | undefined;
  if (kind === "quote") {
    const rawQuote = raw.quote && typeof raw.quote === "object" ? raw.quote as Record<string, unknown> : {};
    quote = {
      service: clean(rawQuote.service), city: clean(rawQuote.city), propertyType: clean(rawQuote.propertyType),
      rooms: clean(rawQuote.rooms, 20), bathrooms: clean(rawQuote.bathrooms, 20), area: clean(rawQuote.area, 20),
    };
    if (!quote.service || !quote.city || !quote.propertyType) return { ok: false, error: "invalidQuote" };
  }

  return { ok: true, data: { kind, locale, name, phone, email, confirmEmail, website, idempotencyKey, quote } };
}
