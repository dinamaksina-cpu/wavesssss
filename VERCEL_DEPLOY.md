# Vercel deployment

This project has been converted from the ChatGPT Sites/Vinext runtime to standard Next.js for Vercel.

## Vercel project settings
- Framework Preset: Next.js
- Root Directory: ./
- Build Command: default (Override OFF)
- Output Directory: default (Override OFF)
- Install Command: default (Override OFF)

## Environment variables
Add these in Vercel Project Settings -> Environment Variables:

- `RESEND_API_KEY` — required for booking/quote emails
- `BOOKING_NOTIFICATION_EMAIL=info@bluewavecleaning.org`
- `BOOKING_FROM_EMAIL=Blue Wave Cleaning <bookings@bluewavecleaning.org>` after `bluewavecleaning.org` is verified in Resend.

For initial Resend testing before domain verification, use a sender permitted by your Resend account (for example onboarding@resend.dev according to Resend's current account rules).

## Deploy
Push this project to the GitHub repository connected to Vercel. Vercel will build it with `next build` and create the `.next` output automatically.
