"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
export function FAQAccordion({dict,compact=false,showHeading=true,standalone=false}:{dict:Dictionary;compact?:boolean;showHeading?:boolean;standalone?:boolean}){const [open,setOpen]=useState<number|null>(0);const items=compact?dict.faq.items.slice(0,5):dict.faq.items;return <section className={`section faq-section ${standalone?"faq-section-standalone":""}`}><div className={`container ${standalone?"faq-standalone":"faq-layout"}`}>{showHeading && <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.faq.title}/>}<div className="accordion">{items.map((item,i)=><div className="accordion-item" key={item.q}><h3><button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} aria-controls={`faq-${i}`}>{item.q}<Plus className={open===i?"rotate-plus":""}/></button></h3><div id={`faq-${i}`} className="accordion-answer" hidden={open!==i}><p>{item.a}</p></div></div>)}</div></div></section>}
