import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("booking experience contains no calendar or time controls", async () => {
  const booking = await read("components/BookingForm.tsx");
  assert.doesNotMatch(booking, /type=["'](?:date|time)["']/i);
  assert.match(booking, /QuickBooking/);
  assert.match(booking, /QuoteCalculator/);
  assert.doesNotMatch(booking, /window\.open/);
  assert.match(booking, /fetch\("\/api\/booking"/);
  assert.match(booking, /confirmEmail/);
});

test("booking API uses server-side Resend delivery and abuse controls", async () => {
  const [route, validation, env] = await Promise.all([read("app/api/booking/route.ts"), read("lib/booking-validation.ts"), read(".env.example")]);
  assert.match(route, /process\.env\.RESEND_API_KEY/);
  assert.equal((route.match(/sendResend\(/g) ?? []).length, 3);
  assert.match(route, /Idempotency-Key/);
  assert.match(route, /rateLimits/);
  assert.match(validation, /parsePhoneNumberFromString/);
  assert.match(validation, /phone\.number/);
  assert.match(env, /BOOKING_NOTIFICATION_EMAIL=info@bluewavecleaning\.org/);
});

test("official social profiles are stored centrally", async () => {
  const socials = await read("data/socials.ts");
  for (const expected of ["instagram.com/bluewavecleaning.cy", "facebook.com/profile.php?id=61593230544288", "t.me/bluewavecleaning", "wa.me/message/KVNT5VQ3NZCQO1"]) assert.match(socials, new RegExp(expected.replace(/[.?]/g, "\\$&")));
});

test("gallery route uses exactly six supplied portfolio images without demo labels", async () => {
  const [route, gallery, component] = await Promise.all([read("app/[locale]/[[...slug]]/page.tsx"), read("data/gallery.ts"), read("components/Gallery.tsx")]);
  assert.match(route, /GalleryPage/);
  assert.equal((gallery.match(/before-after\.png/g) ?? []).length, 6);
  assert.match(component, /slice\(0, 3\)/);
  assert.doesNotMatch(component, /temporaryNote|gallery-note|gallery\.temporary/);
});

test("window and carpet cleaning expose two distinct pricing methods", async () => {
  const pricing = await read("data/pricing.ts");
  assert.match(pricing, /id: "windows"[\s\S]*?€5[\s\S]*?unit: "window"[\s\S]*?€45[\s\S]*?unit: "property"/);
  assert.match(pricing, /id: "carpet"[\s\S]*?€30[\s\S]*?unit: "room"[\s\S]*?€45[\s\S]*?unit: "property"/);
  assert.doesNotMatch(pricing, /minimum order/i);
});
