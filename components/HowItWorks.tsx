import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
export function HowItWorks({dict}:{dict:Dictionary}){return <section className="section steps-section"><div className="container"><SectionHeading eyebrow={dict.steps.eyebrow} title={dict.steps.title}/><ol className="steps-grid">{dict.steps.items.map((item,i)=><li data-process-step key={item}><span>{String(i+1).padStart(2,"0")}</span><h3>{item}</h3></li>)}</ol></div></section>}
