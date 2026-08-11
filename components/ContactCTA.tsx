import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import type { Dictionary, Locale } from "@/lib/i18n";
export function ContactCTA({locale,dict}:{locale:Locale;dict:Dictionary}){return <section className="contact-cta"><div className="container contact-cta-inner"><div><p className="eyebrow light">{dict.contact.eyebrow}</p><h2>{dict.contact.title}</h2><p>{dict.contact.body}</p></div><div className="contact-cta-actions"><Link href={`/${locale}/booking`} className="button button-white">{dict.common.book}<ArrowUpRight size={17}/></Link><a href={company.whatsapp} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a><a href={`mailto:${company.email}`}><Mail/>{dict.contact.email}</a><a href={company.phoneHref}><Phone/>{company.phoneDisplay}</a></div></div></section>}
