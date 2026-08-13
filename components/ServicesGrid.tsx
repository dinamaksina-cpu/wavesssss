import Link from "next/link";
import { ArrowUpRight, Building2, Home, KeyRound, Sofa, Sparkles, Truck } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

const icons = [Home, Building2, KeyRound, Truck, Sofa, Sparkles];
const cardSlugs = ["home-cleaning", "office-cleaning", "airbnb-cleaning", "move-in-out-cleaning", "upholstery-cleaning", "specialized-cleaning"] as const;

export function ServicesGrid({ locale, dict, compact = false, showHeading = true }: { locale: Locale; dict: Dictionary; compact?: boolean; showHeading?: boolean }) {
  const items = compact ? dict.services.items.slice(0, 3) : dict.services.items;
  return <section className="section services-section"><div className="container">{showHeading && <SectionHeading eyebrow={dict.services.eyebrow} title={dict.services.title} body={dict.services.body}/>}<div className="services-grid">{items.map((item, i)=>{const Icon=icons[i]; const slug=cardSlugs[i];return <article className="service-card" key={item.title}><div className="icon-box"><Icon/></div><span className="card-index">0{i+1}</span><h3>{item.title}</h3><p>{item.description}</p><ul>{item.details.slice(0,3).map(detail=><li key={detail}>{detail}</li>)}</ul><Link href={`/${locale}/services/${slug}`}>{dict.common.learn}<ArrowUpRight size={16}/></Link></article>})}</div>{compact&&<div className="section-end"><Link href={`/${locale}/services`} className="text-link">{dict.nav.services}<ArrowUpRight size={16}/></Link></div>}</div></section>;
}
