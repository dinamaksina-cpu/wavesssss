import test from "node:test";
import assert from "node:assert/strict";
import { normalizeEmail, normalizePhone, validateBookingSubmission } from "../lib/booking-validation.ts";

const base = { kind: "quick", locale: "en", name: "Test Customer", phone: "+357 97 579867", email: "customer@Example.COM", confirmEmail: "customer@example.com", idempotencyKey: "test-request-1" };

test("Cyprus phone formats normalize to E.164", () => {
  assert.equal(normalizePhone("+357 97 579867"), "+35797579867");
  assert.equal(normalizePhone("+35797579867"), "+35797579867");
  assert.equal(normalizePhone("97579867"), "+35797579867");
  assert.equal(normalizePhone("123"), null);
});

test("email domain normalization and confirmation are strict", () => {
  assert.equal(normalizeEmail(" customer@Example.COM "), "customer@example.com");
  assert.equal(validateBookingSubmission(base).ok, true);
  assert.deepEqual(validateBookingSubmission({ ...base, email: "not-an-email", confirmEmail: "not-an-email" }), { ok: false, error: "invalidEmail" });
  assert.deepEqual(validateBookingSubmission({ ...base, confirmEmail: "other@example.com" }), { ok: false, error: "emailMismatch" });
});
