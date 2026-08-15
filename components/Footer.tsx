import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { company } from "@/data/company";
import { languageNames, locales, type Dictionary, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Logo locale={locale} /><p>{company.tagline}<br />{company.country}</p><p>{dict.footer.credit}</p></div>
    <div><h3>{dict.footer.nav}</h3>{[["services", dict.nav.services], ["prices", dict.nav.prices], ["gallery", dict.gallery.title], ["about", dict.nav.about], ["faq", dict.nav.faq], ["contact", dict.nav.contact]].map(([path, label]) => <Link key={path} href={`/${locale}/${path}`}>{label}</Link>)}</div>
    <div><h3>{dict.footer.contact}</h3><a href={company.phoneHref}><Phone size={15} />{company.phoneDisplay}</a><a href={`mailto:${company.email}`}><Mail size={15} />{company.email}</a><a href={company.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><h3 className="footer-subhead">{dict.footer.areas}</h3><p>{company.areas.join(" · ")} · {dict.footer.surrounding}</p></div>
    <div><h3>{dict.footer.languages}</h3>{locales.map(code => <Link key={code} href={`/${code}`}>{languageNames[code]}</Link>)}<h3 className="footer-subhead">{dict.footer.legal}</h3><Link href={`/${locale}/privacy`}>{dict.legal.privacy}</Link><Link href={`/${locale}/cookies`}>{dict.legal.cookies}</Link><Link href={`/${locale}/terms`}>{dict.legal.terms}</Link></div>
    <div className="footer-social"><h3>{dict.social.follow}</h3><SocialLinks dict={dict} compact /></div>
  </div><div className="container footer-bottom"><p>© {new Date().getFullYear()} {company.name}. {dict.footer.rights}</p></div></footer>;
}
