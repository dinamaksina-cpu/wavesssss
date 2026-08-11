"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Calculator, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { company } from "@/data/company";
import { bookingTranslations } from "@/lib/booking-i18n";
import { validateBookingSubmission, type BookingSubmission } from "@/lib/booking-validation";
import type { Dictionary, Locale } from "@/lib/i18n";

type Contact = { name: string; phone: string; email: string; confirmEmail: string; website: string };
type Status = "idle" | "submitting" | "success" | "error";
const emptyContact: Contact = { name: "", phone: "+357 ", email: "", confirmEmail: "", website: "" };

function key() { return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
function whatsappUrl(message: string) { return `${company.whatsapp}?text=${encodeURIComponent(message)}`; }

async function sendSubmission(payload: BookingSubmission) {
  const response = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json().catch(() => ({ ok: false }));
  if (!response.ok || !result.ok) throw new Error(result.error || "sendError");
}

export function BookingForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return <div className="booking-experience"><QuickBooking dict={dict} locale={locale} /><QuoteCalculator dict={dict} locale={locale} /></div>;
}

function QuickBooking({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const base = dict.forms.quick; const t = bookingTranslations[locale];
  const [contact, setContact] = useState<Contact>(emptyContact); const [status, setStatus] = useState<Status>("idle"); const [error, setError] = useState(""); const inFlight = useRef(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); if (inFlight.current) return;
    const payload: BookingSubmission = { kind: "quick", locale, ...contact, idempotencyKey: key() };
    const validation = validateBookingSubmission(payload);
    if (!validation.ok) return setError(errorText(validation.error, t));
    inFlight.current = true; setStatus("submitting"); setError("");
    try { await sendSubmission(payload); setStatus("success"); } catch (reason) { setStatus("error"); setError(errorText(reason instanceof Error ? reason.message : "sendError", t)); } finally { inFlight.current = false; }
  }
  const message = `${base.message.greeting}\n${base.message.intro}\n${t.name}: ${contact.name}\n${t.phone}: ${contact.phone}`;
  if (status === "success") return <Success locale={locale} message={message} />;
  return <form className="booking-card quick-booking" onSubmit={submit} noValidate>
    <div className="booking-card-icon"><MessageCircle aria-hidden="true" /></div><h2>{base.title}</h2><p>{t.quickIntro}</p>
    <ContactFields contact={contact} setContact={setContact} t={t} disabled={status === "submitting"} />
    {error && <FormError text={error} t={t} message={message} />}
    <button className="button booking-submit" type="submit" disabled={status === "submitting"}><Send size={18} />{status === "submitting" ? t.submitting : t.submitBooking}</button>
  </form>;
}

function QuoteCalculator({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.forms.quote; const flow = bookingTranslations[locale];
  const [form, setForm] = useState({ service: "", city: "", propertyType: "", rooms: "", bathrooms: "", area: "" });
  const [contact, setContact] = useState<Contact>(emptyContact); const [error, setError] = useState(""); const [summary, setSummary] = useState(false); const [status, setStatus] = useState<Status>("idle"); const inFlight = useRef(false);
  const update = (field: keyof typeof form, value: string) => { setForm({ ...form, [field]: value }); setSummary(false); setStatus("idle"); };
  function calculate(event: FormEvent) { event.preventDefault(); if (!form.service || !form.city || !form.propertyType) return setError(t.required); setError(""); setSummary(true); }
  const rows = [[t.service, form.service], [t.city, form.city], [t.propertyType, form.propertyType], [t.rooms, form.rooms], [t.bathrooms, form.bathrooms], [t.area, form.area ? `${form.area} m²` : ""]].filter(([, value]) => value);
  const message = [t.message.greeting, t.message.intro, ...rows.map(([label, value]) => `${label}: ${value}`), `${flow.name}: ${contact.name}`, `${flow.phone}: ${contact.phone}`].join("\n");
  async function send() {
    if (inFlight.current) return;
    const payload: BookingSubmission = { kind: "quote", locale, ...contact, idempotencyKey: key(), quote: form };
    const validation = validateBookingSubmission(payload);
    if (!validation.ok) return setError(errorText(validation.error, flow));
    inFlight.current = true; setStatus("submitting"); setError("");
    try { await sendSubmission(payload); setStatus("success"); } catch (reason) { setStatus("error"); setError(errorText(reason instanceof Error ? reason.message : "sendError", flow)); } finally { inFlight.current = false; }
  }
  if (status === "success") return <Success locale={locale} message={message} />;
  return <form className="booking-card quote-calculator" onSubmit={calculate} noValidate>
    <div className="booking-card-icon"><Calculator aria-hidden="true" /></div><h2>{t.title}</h2><p>{t.intro}</p>
    <div className="quote-fields"><Select label={t.service} value={form.service} options={t.services} required onChange={value => update("service", value)} /><Select label={t.city} value={form.city} options={t.cities} required onChange={value => update("city", value)} /><Select label={t.propertyType} value={form.propertyType} options={t.propertyTypes} required onChange={value => update("propertyType", value)} /><Field label={t.rooms} value={form.rooms} type="number" min="0" onChange={value => update("rooms", value)} /><Field label={t.bathrooms} value={form.bathrooms} type="number" min="0" onChange={value => update("bathrooms", value)} /><Field label={t.area} value={form.area} type="number" min="0" onChange={value => update("area", value)} /></div>
    {error && !summary && <p className="form-error" role="alert">{error}</p>}
    {!summary && <button className="button booking-submit" type="submit"><Calculator size={18} />{t.getQuote}</button>}
    {summary && <div className="quote-summary" aria-live="polite"><h3>{t.summary}</h3><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>{t.disclaimer}</p><h3 className="contact-fields-title">{flow.customerDetails}</h3><ContactFields contact={contact} setContact={setContact} t={flow} disabled={status === "submitting"} />{error && <FormError text={error} t={flow} message={message} />}<div className="quote-actions"><button className="button" type="button" onClick={send} disabled={status === "submitting"}><Send size={17} />{status === "submitting" ? flow.submitting : flow.sendRequest}</button></div></div>}
  </form>;
}

function ContactFields({ contact, setContact, t, disabled }: { contact: Contact; setContact: (value: Contact) => void; t: typeof bookingTranslations.en; disabled: boolean }) {
  const update = (field: keyof Contact, value: string) => setContact({ ...contact, [field]: value });
  return <div className="booking-fields"><Field label={t.name} value={contact.name} placeholder={t.namePlaceholder} required disabled={disabled} autoComplete="name" onChange={value => update("name", value)} /><Field label={t.phone} value={contact.phone} placeholder={t.phonePlaceholder} type="tel" required disabled={disabled} autoComplete="tel" onChange={value => update("phone", value)} /><Field label={t.email} value={contact.email} placeholder={t.emailPlaceholder} type="email" required disabled={disabled} autoComplete="email" onChange={value => update("email", value)} /><Field label={t.confirmEmail} value={contact.confirmEmail} placeholder={t.emailPlaceholder} type="email" required disabled={disabled} autoComplete="email" onChange={value => update("confirmEmail", value)} /><label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={contact.website} onChange={event => update("website", event.target.value)} /></label></div>;
}

function Success({ locale, message }: { locale: Locale; message: string }) {
  const t = bookingTranslations[locale];
  return <section className="booking-card booking-success" aria-live="polite"><CheckCircle2 aria-hidden="true" /><h2>{t.successTitle}</h2><p>{t.successBody}</p><p>{t.successNote}</p><div className="quote-actions"><Link className="button" href={`/${locale}`}>{t.home}</Link><a className="button button-outline" href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={17} />{t.whatsapp}</a></div></section>;
}

function FormError({ text, t, message }: { text: string; t: typeof bookingTranslations.en; message: string }) { return <div className="form-error-wrap"><p className="form-error" role="alert">{text}</p><a href={whatsappUrl(message)} target="_blank" rel="noreferrer">{t.whatsapp}</a></div>; }
function errorText(error: string, t: typeof bookingTranslations.en) { if (error === "invalidPhone") return t.invalidPhone; if (error === "invalidEmail") return t.invalidEmail; if (error === "emailMismatch") return t.emailMismatch; if (error === "rateLimited") return t.rateLimited; if (error === "required" || error === "invalidQuote") return t.required; return t.sendError; }
function Field({ label, value, onChange, type = "text", placeholder, required, min, disabled, autoComplete }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean; min?: string; disabled?: boolean; autoComplete?: string }) { return <label className="field"><span>{label}{required && " *"}</span><input type={type} value={value} min={min} inputMode={type === "number" ? "numeric" : undefined} placeholder={placeholder} required={required} disabled={disabled} autoComplete={autoComplete} onChange={event => onChange(event.target.value)} /></label>; }
function Select({ label, value, options, onChange, required }: { label: string; value: string; options: string[]; onChange: (value: string) => void; required?: boolean }) { return <label className="field"><span>{label}{required && " *"}</span><select value={value} required={required} onChange={event => onChange(event.target.value)}><option value="">—</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>; }
