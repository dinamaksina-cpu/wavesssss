import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <section className="hero"><Image src="/hero-interior.png" alt="Bright Mediterranean interior" fill priority unoptimized sizes="100vw" className="hero-image"/><div className="hero-shade"/><div className="container hero-inner"><div className="hero-content"><p className="eyebrow light">{dict.common.eyebrow}</p><h1>{dict.hero.title1}<br/><em>{dict.hero.title2}</em></h1><p className="hero-copy">{dict.hero.body}</p><div className="hero-actions"><Link href={`/${locale}/booking`} className="button">{dict.common.book}<ArrowUpRight size={17}/></Link><a href={company.whatsapp} className="button button-ghost" target="_blank" rel="noreferrer"><MessageCircle size={17}/>{dict.common.whatsapp}</a></div><p className="hero-areas">{dict.common.areas}</p></div><div className="hero-trust">{dict.hero.trust.map(item=><span key={item}><Check size={13}/>{item}</span>)}</div></div></section>;
}
