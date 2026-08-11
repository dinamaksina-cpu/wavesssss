import { CircleCheck, HeartHandshake, Leaf, ScanSearch, ShieldCheck, WalletCards } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

const icons=[ShieldCheck,CircleCheck,ScanSearch,Leaf,WalletCards,HeartHandshake];
export function WhyChooseUs({dict}:{dict:Dictionary}){return <section className="section section-ice"><div className="container"><SectionHeading eyebrow={dict.benefits.eyebrow} title={dict.benefits.title}/><div className="benefit-grid">{dict.benefits.items.map((item,i)=>{const Icon=icons[i];return <article key={item.title}><Icon/><h3>{item.title}</h3><p>{item.body}</p></article>})}</div></div></section>}
