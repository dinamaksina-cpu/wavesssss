"use client";

import { FormEvent, useState } from "react";
import { Calculator, MessageCircle, Send } from "lucide-react";
import { bookingTranslations } from "@/lib/booking-i18n";
import { whatsappBookingTranslations } from "@/lib/whatsapp-booking-i18n";
import { validateBookingSubmission, type BookingSubmission } from "@/lib/booking-validation";
import type { Dictionary, Locale } from "@/lib/i18n";

type Contact = { name: string; phone: string; email: string; website: string };
const emptyContact: Contact = { name: "", phone: "", email: "", website: "" };
const whatsappBookingBaseUrl = "https://wa.me/35797579867";

function key() { return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
function whatsappUrl(message: string) { return `${whatsappBookingBaseUrl}?text=${encodeURIComponent(message)}`; }
function continueToWhatsApp(message: string) { window.open(whatsappUrl(message), "_blank", "noopener,noreferrer"); }

export function BookingForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return <div className="booking-experience"><QuickBooking dict={dict} locale={locale} /><QuoteCalculator dict={dict} locale={locale} /></div>;
}

function QuickBooking({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const base = dict.forms.quick; const t = bookingTranslations[locale]; const handoff = whatsappBookingTranslations[locale];
  const [contact, setContact] = useState<Contact>(emptyContact); const [error, setError] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    const payload: BookingSubmission = { kind: "quick", locale, ...contact, confirmEmail: contact.email, idempotencyKey: key() };
    const validation = validateBookingSubmission(payload);
    if (!validation.ok) return setError(errorText(validation.error, t));
    setError("");
    const clean = validation.data;
    const message = [handoff.quick.greeting, "", handoff.quick.intro, "", `${t.name}: ${clean.name}`, `${t.phone}: ${clean.phone}`, `${t.email}: ${clean.email}`, "", handoff.quick.closing].join("\n");
    continueToWhatsApp(message);
  }
  return <form className="booking-card quick-booking" onSubmit={submit} noValidate>
    <div className="booking-card-icon"><MessageCircle aria-hidden="true" /></div><h2>{base.title}</h2><p>{handoff.quickFormIntro}</p>
    <ContactFields contact={contact} setContact={setContact} t={t} />
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button booking-submit" type="submit"><Send size={18} />{t.submitBooking}</button>
  </form>;
}

function QuoteCalculator({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.forms.quote; const flow = bookingTranslations[locale]; const handoff = whatsappBookingTranslations[locale];
  const [form, setForm] = useState({ service: "", city: "", propertyType: "", rooms: "", bathrooms: "", area: "" });
  const [contact, setContact] = useState<Contact>(emptyContact); const [error, setError] = useState(""); const [summary, setSummary] = useState(false);
  const update = (field: keyof typeof form, value: string) => { setForm({ ...form, [field]: value }); setSummary(false); };
  function calculate(event: FormEvent) { event.preventDefault(); if (!form.service || !form.city || !form.propertyType) return setError(t.required); setError(""); setSummary(true); }
  const messageRows = [[t.service, form.service], [t.city, form.city], [t.propertyType, form.propertyType], [t.rooms, form.rooms || "—"], [t.bathrooms, form.bathrooms || "—"], [t.area, form.area ? `${form.area} m²` : "—"]];
  const rows = messageRows.filter(([, value]) => value !== "—");
  function send() {
    const payload: BookingSubmission = { kind: "quote", locale, ...contact, confirmEmail: contact.email, idempotencyKey: key(), quote: form };
    const validation = validateBookingSubmission(payload);
    if (!validation.ok) return setError(errorText(validation.error, flow));
    setError("");
    const clean = validation.data;
    const message = [handoff.quote.greeting, "", handoff.quote.intro, "", `${flow.name}: ${clean.name}`, `${flow.phone}: ${clean.phone}`, `${flow.email}: ${clean.email}`, ...rows.map(([label, value]) => `${label}: ${value}`), "", handoff.quote.closing].join("\n");
    continueToWhatsApp(message);
  }
  return <form className="booking-card quote-calculator" onSubmit={calculate} noValidate>
    <div className="booking-card-icon"><Calculator aria-hidden="true" /></div><h2>{t.title}</h2><p>{t.intro}</p>
    <div className="quote-fields"><Select label={t.service} value={form.service} options={t.services} required onChange={value => update("service", value)} /><Select label={t.city} value={form.city} options={t.cities} required onChange={value => update("city", value)} /><Select label={t.propertyType} value={form.propertyType} options={t.propertyTypes} required onChange={value => update("propertyType", value)} /><Field label={t.rooms} value={form.rooms} type="number" min="0" onChange={value => update("rooms", value)} /><Field label={t.bathrooms} value={form.bathrooms} type="number" min="0" onChange={value => update("bathrooms", value)} /><Field label={t.area} value={form.area} type="number" min="0" onChange={value => update("area", value)} /></div>
    {error && !summary && <p className="form-error" role="alert">{error}</p>}
    {!summary && <button className="button booking-submit" type="submit"><Calculator size={18} />{t.getQuote}</button>}
    {summary && <div className="quote-summary" aria-live="polite"><h3>{t.summary}</h3><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>{t.disclaimer}</p><h3 className="contact-fields-title">{flow.customerDetails}</h3><ContactFields contact={contact} setContact={setContact} t={flow} />{error && <p className="form-error" role="alert">{error}</p>}<div className="quote-actions"><button className="button" type="button" onClick={send}><Send size={17} />{flow.sendRequest}</button></div></div>}
  </form>;
}

function ContactFields({ contact, setContact, t }: { contact: Contact; setContact: (value: Contact) => void; t: typeof bookingTranslations.en }) {
  const update = (field: keyof Contact, value: string) => setContact({ ...contact, [field]: value });
  return <div className="booking-fields"><Field label={t.name} value={contact.name} placeholder={t.namePlaceholder} required autoComplete="name" onChange={value => update("name", value)} /><Field label={t.phone} value={contact.phone} placeholder={t.phonePlaceholder} type="tel" required autoComplete="tel" onChange={value => update("phone", value)} /><Field label={t.email} value={contact.email} placeholder={t.emailPlaceholder} type="email" required autoComplete="email" onChange={value => update("email", value)} /><label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={contact.website} onChange={event => update("website", event.target.value)} /></label></div>;
}

function errorText(error: string, t: typeof bookingTranslations.en) { if (error === "invalidPhone") return t.invalidPhone; if (error === "invalidEmail") return t.invalidEmail; if (error === "emailMismatch") return t.emailMismatch; if (error === "rateLimited") return t.rateLimited; if (error === "required" || error === "invalidQuote") return t.required; return t.sendError; }
function Field({ label, value, onChange, type = "text", placeholder, required, min, autoComplete }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean; min?: string; autoComplete?: string }) { return <label className="field"><span>{label}{required && " *"}</span><input type={type} value={value} min={min} inputMode={type === "number" ? "numeric" : undefined} placeholder={placeholder} required={required} autoComplete={autoComplete} onChange={event => onChange(event.target.value)} /></label>; }
function Select({ label, value, options, onChange, required }: { label: string; value: string; options: string[]; onChange: (value: string) => void; required?: boolean }) { return <label className="field"><span>{label}{required && " *"}</span><select value={value} required={required} onChange={event => onChange(event.target.value)}><option value="">—</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>; }
