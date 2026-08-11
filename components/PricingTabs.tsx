"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { pricing, type PriceCategory, type PriceItem } from "@/data/pricing";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

export function PricingTabs({ locale, dict, compact = false }: { locale: Locale; dict: Dictionary; compact?: boolean }) {
  const [category, setCategory] = useState<"all" | PriceCategory>(compact ? "general" : "all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const categories = Object.entries(dict.pricing.categories) as ["all" | PriceCategory, string][];
  const visible = pricing.filter(item => category === "all" || item.category === category).slice(0, compact ? 6 : 99);
  return <section className="section pricing-section"><div className="container">
    <SectionHeading eyebrow={dict.pricing.eyebrow} title={dict.pricing.title} body={dict.pricing.body} />
    {!compact && <div className="pricing-tabs" role="tablist">{categories.map(([key, label]) => <button key={key} role="tab" aria-selected={category === key} onClick={() => setCategory(key)}>{label}</button>)}</div>}
    <div className="price-list">{visible.map(item => <PriceRow key={item.id} item={item} locale={locale} dict={dict} open={expanded === item.id} onToggle={() => setExpanded(expanded === item.id ? null : item.id)} />)}</div>
    <p className="disclaimer">{dict.pricing.disclaimer}</p>
    <div className="pricing-actions"><Link href={`/${locale}/booking`} className="button">{dict.common.book}</Link>{compact && <Link href={`/${locale}/prices`} className="button button-outline">{dict.nav.prices}</Link>}</div>
  </div></section>;
}

function PriceRow({ item, locale, dict, open, onToggle }: { item: PriceItem; locale: Locale; dict: Dictionary; open: boolean; onToggle: () => void }) {
  const name = dict.pricing.items[item.id as keyof typeof dict.pricing.items];
  return <article className={`price-row ${item.options ? "has-options" : ""}`}>
    <button onClick={onToggle} aria-expanded={open}>
      <span><small>{dict.pricing.categories[item.category]}</small><strong>{name}</strong></span>
      {item.options ? <div className="price-options" aria-label={name}>{item.options.map((option, index) => <div className="price-option" key={`${option.price}-${option.unit}`}>
        <strong>{option.from && dict.common.from} {option.price} <small>/ {dict.pricing.units[option.unit]}</small></strong>
        {option.description && <span>{dict.pricing.optionDescriptions[option.description]}</span>}
        {index === 0 && <em>{dict.pricing.or}</em>}
      </div>)}</div> : <span className="price-value">{item.price === "quote" ? dict.pricing.units.quote : <>{item.category !== "bundle" && dict.common.from} {item.price}{item.unit && <small> / {dict.pricing.units[item.unit as "window" | "room"]}</small>}</>}<ChevronDown className={open ? "rotate" : ""} /></span>}
      {item.options && <ChevronDown className={`price-options-chevron ${open ? "rotate" : ""}`} />}
    </button>
    {open && <div className="price-details"><p>{dict.pricing.details}</p>{item.value && <span>{dict.pricing.units.value} {item.value}</span>}<Link href={`/${locale}/booking`}>{dict.common.quote}</Link></div>}
  </article>;
}
