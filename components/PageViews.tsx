import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { serviceSlugs, type ServiceSlug } from "@/data/services";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Hero } from "./Hero";
import { ServicesGrid } from "./ServicesGrid";
import { WhyChooseUs } from "./WhyChooseUs";
import { PricingTabs } from "./PricingTabs";
import { HowItWorks } from "./HowItWorks";
import { FAQAccordion } from "./FAQAccordion";
import { ContactCTA } from "./ContactCTA";
import { SectionHeading } from "./SectionHeading";
import { BookingForm } from "./BookingForm";
import { GallerySection } from "./Gallery";
import { SocialLinks } from "./SocialLinks";

export function HomePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <><Hero locale={locale} dict={dict} /><ServicesGrid locale={locale} dict={dict} compact /><WhyChooseUs dict={dict} /><PricingTabs locale={locale} dict={dict} compact /><HowItWorks dict={dict} /><AboutBlock dict={dict} /><GallerySection locale={locale} dict={dict} preview /><FAQAccordion dict={dict} compact /><ContactCTA locale={locale} dict={dict} /></>;
}

function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <section className="page-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{body && <p>{body}</p>}</div></section>;
}

export function ServicesPage({ locale, dict }: { locale: Locale; dict: Dictionary }) { return <><PageHero eyebrow={dict.services.eyebrow} title={dict.services.title} body={dict.services.body} /><ServicesGrid locale={locale} dict={dict} /><ContactCTA locale={locale} dict={dict} /></>; }
export function PricesPage({ locale, dict }: { locale: Locale; dict: Dictionary }) { return <><PageHero eyebrow={dict.pricing.eyebrow} title={dict.pricing.title} body={dict.pricing.body} /><PricingTabs locale={locale} dict={dict} /><ContactCTA locale={locale} dict={dict} /></>; }

export function AboutBlock({ dict, standalone = false }: { dict: Dictionary; standalone?: boolean }) {
  return <section className={`section about-section ${standalone ? "standalone" : ""}`}><div className="container about-grid"><div className="about-visual"><Image src="/images/gallery/living-room-before-after.png" alt={dict.about.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" unoptimized /><span>CYPRUS<br />PAPHOS · LIMASSOL</span></div><div><SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} /><p>{dict.about.p1}</p><p>{dict.about.p2}</p><p>{dict.about.p3}</p></div></div></section>;
}
export function AboutPage({ locale, dict }: { locale: Locale; dict: Dictionary }) { return <><PageHero eyebrow={dict.about.eyebrow} title={dict.about.title} /><AboutBlock dict={dict} standalone /><WhyChooseUs dict={dict} /><ContactCTA locale={locale} dict={dict} /></>; }
export function FAQPage({ locale, dict }: { locale: Locale; dict: Dictionary }) { return <><PageHero eyebrow={dict.faq.eyebrow} title={dict.faq.title} /><FAQAccordion dict={dict} /><ContactCTA locale={locale} dict={dict} /></>; }
export function GalleryPage({ locale, dict }: { locale: Locale; dict: Dictionary }) { return <><PageHero eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} body={dict.gallery.body} /><GallerySection locale={locale} dict={dict} /><ContactCTA locale={locale} dict={dict} /></>; }

export function BookingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) { return <><PageHero eyebrow={dict.booking.eyebrow} title={dict.booking.title} body={dict.forms.quote.intro} /><section className="section booking-section"><div className="container"><BookingForm locale={locale} dict={dict} /></div></section></>; }

export function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <><PageHero eyebrow={dict.contact.eyebrow} title={dict.contact.title} body={dict.contact.body} /><section className="section contact-page"><div className="container contact-grid"><div className="contact-card"><span><Phone /></span><p>{dict.contact.phone}</p><a href={company.phoneHref}>{company.phoneDisplay}</a></div><div className="contact-card"><span><Mail /></span><p>{dict.contact.email}</p><a href={`mailto:${company.email}`}>{company.email}</a></div><div className="contact-card"><span><MessageCircle /></span><p>{dict.contact.whatsapp}</p><a href={company.whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a></div><div className="contact-card"><span><MapPin /></span><p>{dict.contact.areas}</p><strong>{company.areas.join(" · ")}</strong></div></div><div className="container contact-social"><h2>{dict.social.follow}</h2><SocialLinks dict={dict} /></div><div className="container contact-page-actions"><Link href={`/${locale}/booking`} className="button">{dict.common.book}</Link><a className="button button-outline" href={company.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a className="button button-outline" href={`mailto:${company.email}`}>{dict.contact.email}</a></div></section></>;
}

export function ServiceDetailPage({ locale, dict, slug }: { locale: Locale; dict: Dictionary; slug: ServiceSlug }) {
  const index = Math.max(0, serviceSlugs.indexOf(slug));
  const sourceIndex: Record<ServiceSlug, number> = { "home-cleaning": 0, "deep-cleaning": 0, "office-cleaning": 1, "airbnb-cleaning": 2, "move-in-out-cleaning": 3, "post-renovation-cleaning": 1, "carpet-cleaning": 4, "upholstery-cleaning": 4, "window-cleaning": 5 };
  const item = dict.services.items[sourceIndex[slug]];
  return <><PageHero eyebrow={dict.common.eyebrow} title={item.title} body={item.description} /><section className="section service-detail"><div className="container service-detail-grid"><div><p className="eyebrow">0{index + 1} · {dict.services.eyebrow}</p><h2>{item.title}</h2><p>{item.description}</p><ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div><aside><h3>{dict.contact.title}</h3><p>{dict.pricing.disclaimer}</p><Link href={`/${locale}/booking`} className="button">{dict.common.quote}</Link><a href={company.whatsapp} target="_blank" rel="noreferrer">{dict.common.whatsapp}<ArrowUpRight size={15} /></a></aside></div></section><ServicesGrid locale={locale} dict={dict} compact /><ContactCTA locale={locale} dict={dict} /></>;
}

export function LegalPage({ kind, dict }: { kind: "privacy" | "cookies" | "terms"; dict: Dictionary }) {
  const title = dict.legal[kind]; const text = kind === "privacy" ? dict.legal.privacyText : kind === "cookies" ? dict.legal.cookiesText : dict.legal.termsText;
  return <><PageHero eyebrow={dict.footer.legal} title={title} body={dict.legal.updated} /><article className="section legal-copy"><div className="container narrow">{text.map((paragraph, index) => <section key={paragraph}><h2>{String(index + 1).padStart(2, "0")}</h2><p>{paragraph}</p></section>)}<p>Contact: <a href={`mailto:${company.email}`}>{company.email}</a></p></div></article></>;
}
