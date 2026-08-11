# Booking email setup

The booking and quote forms submit to `POST /api/booking`. A successful response is shown only after Resend accepts both emails:

1. a localized confirmation to the customer;
2. a full request notification to Blue Wave Cleaning.

WhatsApp is never opened automatically. It appears only as a secondary, user-initiated option after success and as a fallback after an error.

## Production configuration

1. Create a Resend account and verify `bluewavecleaning.org` in the Resend dashboard.
2. Create an API key with sending permission.
3. Add these server-side environment variables to the production hosting project:

```env
RESEND_API_KEY=re_...
BOOKING_NOTIFICATION_EMAIL=info@bluewavecleaning.org
BOOKING_FROM_EMAIL=Blue Wave Cleaning <bookings@bluewavecleaning.org>
```

Never prefix the API key with `NEXT_PUBLIC_` and never commit a real key. The browser sends requests only to `/api/booking`; the secret remains on the server.

## Validation and protection

- international phone validation and E.164 normalization use `libphonenumber-js` with Cyprus (`+357`) as the default country;
- email is required, syntax-checked, trimmed, domain-normalized, and confirmed in a second field;
- both the browser and API validate submissions;
- an invisible honeypot rejects automated spam;
- the API applies a best-effort per-IP limit of five requests per ten minutes;
- every request carries an idempotency key, and Resend receives separate idempotency keys for customer and company emails;
- submit controls are disabled while a request is in progress.

The in-memory rate and duplicate guards are best-effort in serverless isolates. For higher traffic, replace them with a shared Cloudflare KV or Durable Object store.

## Local verification

Copy `.env.example` to `.env.local`, insert a valid Resend key and a verified sender, then run:

```bash
pnpm dev
```

Test valid Cyprus formats such as `+357 97 579867` and `+35797579867`. Confirm that malformed phone numbers, invalid emails, and mismatched email confirmation are rejected before any network request.
