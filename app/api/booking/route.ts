import { NextRequest, NextResponse } from "next/server";
import { company } from "@/data/company";
import { validateBookingSubmission, type BookingLocale, type ValidBookingSubmission } from "@/lib/booking-validation";

export const runtime = "edge";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimits = new Map<string, number[]>();
const completed = new Map<string, number>();

const customerCopy: Record<BookingLocale, { subject: string; hello: string; received: string; followup: string; note: string }> = {
  en: { subject: "We received your Blue Wave Cleaning request", hello: "Hello", received: "Thank you — we have received your request.", followup: "Our team will contact you to confirm the service details and availability.", note: "Your requested service or time is not confirmed until our team contacts you." },
  ru: { subject: "Мы получили ваш запрос Blue Wave Cleaning", hello: "Здравствуйте", received: "Спасибо — мы получили ваш запрос.", followup: "Наша команда свяжется с вами, чтобы подтвердить детали услуги и доступность.", note: "Услуга или время не подтверждены, пока с вами не свяжется наша команда." },
  el: { subject: "Λάβαμε το αίτημά σας στη Blue Wave Cleaning", hello: "Γεια σας", received: "Ευχαριστούμε — λάβαμε το αίτημά σας.", followup: "Η ομάδα μας θα επικοινωνήσει μαζί σας για να επιβεβαιώσει τις λεπτομέρειες και τη διαθεσιμότητα.", note: "Η υπηρεσία ή η ώρα δεν επιβεβαιώνεται μέχρι να επικοινωνήσει μαζί σας η ομάδα μας." },
  uk: { subject: "Ми отримали ваш запит Blue Wave Cleaning", hello: "Вітаємо", received: "Дякуємо — ми отримали ваш запит.", followup: "Наша команда зв’яжеться з вами, щоб підтвердити деталі послуги та доступність.", note: "Послуга або час не підтверджені, доки з вами не зв’яжеться наша команда." },
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

function detailRows(data: ValidBookingSubmission) {
  const rows: [string, string][] = [["Request", data.kind === "quote" ? "Quote request" : "Quick booking"], ["Name", data.name], ["Phone", data.phone], ["Email", data.email], ["Language", data.locale.toUpperCase()]];
  if (data.quote) Object.entries(data.quote).forEach(([key, value]) => { if (value) rows.push([key, value]); });
  return rows;
}

function customerEmail(data: ValidBookingSubmission) {
  const copy = customerCopy[data.locale];
  const rows = detailRows(data).slice(1).map(([label, value]) => `<tr><td style="padding:6px 16px 6px 0;color:#617486">${escapeHtml(label)}</td><td style="padding:6px 0;color:#102d45">${escapeHtml(value)}</td></tr>`).join("");
  return {
    subject: copy.subject,
    text: `${copy.hello} ${data.name},\n\n${copy.received}\n${copy.followup}\n\n${copy.note}\n\nBlue Wave Cleaning\n${company.phone}\n${company.email}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#102d45"><div style="height:5px;background:#20b8cb;border-radius:8px"></div><h1 style="font-size:26px;color:#073e68">Blue Wave Cleaning</h1><p>${escapeHtml(copy.hello)} ${escapeHtml(data.name)},</p><p><strong>${escapeHtml(copy.received)}</strong></p><p>${escapeHtml(copy.followup)}</p><table style="border-collapse:collapse;margin:24px 0">${rows}</table><p style="padding:14px;background:#eaf8fb;border-radius:10px">${escapeHtml(copy.note)}</p><p>${escapeHtml(company.phone)}<br>${escapeHtml(company.email)}</p></div>`,
  };
}

async function sendResend(apiKey: string, payload: Record<string, unknown>, idempotencyKey: string) {
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`Resend rejected email (${response.status})`);
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) return NextResponse.json({ ok: false, error: "invalidRequest" }, { status: 413 });

  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ ok: false, error: "invalidRequest" }, { status: 400 }); }
  const validation = validateBookingSubmission(payload);
  if (!validation.ok) return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
  const data = validation.data;
  if (data.website) return NextResponse.json({ ok: true });

  const now = Date.now();
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const recent = (rateLimits.get(ip) || []).filter(timestamp => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return NextResponse.json({ ok: false, error: "rateLimited" }, { status: 429 });
  recent.push(now); rateLimits.set(ip, recent);
  if ((completed.get(data.idempotencyKey) || 0) > now - WINDOW_MS) return NextResponse.json({ ok: true, duplicate: true });

  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.BOOKING_NOTIFICATION_EMAIL || company.email;
  const from = process.env.BOOKING_FROM_EMAIL || "Blue Wave Cleaning <onboarding@resend.dev>";
  if (!apiKey) return NextResponse.json({ ok: false, error: "emailUnavailable" }, { status: 503 });

  const customer = customerEmail(data);
  const rows = detailRows(data);
  const notificationText = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const notificationHtml = `<h1>New Blue Wave Cleaning request</h1><table>${rows.map(([label, value]) => `<tr><th align="left" style="padding:6px 16px 6px 0">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table><p>Submitted: ${escapeHtml(new Date().toISOString())}</p>`;

  try {
    await Promise.all([
      sendResend(apiKey, { from, to: [data.email], subject: customer.subject, html: customer.html, text: customer.text }, `${data.idempotencyKey}-customer`),
      sendResend(apiKey, { from, to: [notificationEmail], reply_to: data.email, subject: `New ${data.kind === "quote" ? "quote" : "booking"} request — ${data.name}`, html: notificationHtml, text: notificationText }, `${data.idempotencyKey}-company`),
    ]);
    completed.set(data.idempotencyKey, now);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Booking email delivery failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok: false, error: "emailFailed" }, { status: 502 });
  }
}
