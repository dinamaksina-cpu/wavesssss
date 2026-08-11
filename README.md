# Blue Wave Cleaning

Production-ready multilingual website for Blue Wave Cleaning in Cyprus. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, `next/image`, `next/font`, and Lucide icons.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create a production build with:

```bash
npm run build
```

Run quality checks with:

```bash
npm run lint
```

## Editing content

- Company name, phone, email, WhatsApp, website and service areas: `data/company.ts`
- Prices and pricing categories: `data/pricing.ts`
- Service route slugs: `data/services.ts`
- Official Instagram, Facebook, Telegram and WhatsApp URLs: `data/socials.ts`
- Gallery items, categories and replacement sources: `data/gallery.ts`
- Translations, FAQ answers, interface copy and localized metadata: `locales/en.json`, `locales/ru.json`, `locales/el.json`, `locales/uk.json`
- Localized gallery and social additions: `lib/experience-i18n.ts`
- Booking flow interface copy: `lib/booking-i18n.ts`
- Reviews visibility: `showReviews` in `data/company.ts` (currently `false`; no fake reviews are published)

## Booking and quote delivery

Quick Booking and the quote calculator submit securely to `POST /api/booking`. The server validates and normalizes the request, then uses Resend to deliver both a localized customer confirmation and a detailed notification to the company. A success screen appears only after the email provider accepts both messages.

1. Copy `.env.example` to `.env.local`.
2. Add a Resend API key and a sender address on a verified domain. Never commit secrets.
3. Run the site and submit a test request using an inbox you control.

WhatsApp never opens automatically. It remains an optional secondary action after success and an explicit fallback after an error. Submissions are requests only; a price, service, or booking time is not automatically confirmed.

See `BOOKING_SETUP.md` for environment variables, validation, spam protection, and deployment notes.

## Images and logo

- Main logo: `public/blue-wave-logo.png`
- Hero image: `public/hero-interior.png`
- Social preview: `public/og.png`
- About image: `public/images/gallery/living-room-before-after.png`
- Gallery images: `public/images/gallery/`

Replace an image while keeping the same filename, or update its reference in the relevant component. Preserve useful alt text. The gallery currently uses the six supplied before/after portfolio images. The optional accessible `BeforeAfter` component remains available for future additions.

## International routes

The supported locales are English (`en`), Russian (`ru`), Greek (`el`) and Ukrainian (`uk`). All pages use `/{locale}/...` URLs, with root and unprefixed routes redirecting to English. Language switching is persisted in browser storage and a cookie. Localized canonical and `hreflang` metadata are generated for every page.
