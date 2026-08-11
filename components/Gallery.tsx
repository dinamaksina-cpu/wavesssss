"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

export function GallerySection({ locale, dict, preview = false }: { locale: Locale; dict: Dictionary; preview?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef(0);
  const items = preview ? galleryItems.slice(0, 3) : galleryItems;
  const close = () => setActive(null);
  const move = (delta: number) => setActive(current => current === null ? null : (current + delta + galleryItems.length) % galleryItems.length);
  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [active]);
  return <section className="section gallery-section"><div className="container">
    <div className="gallery-heading"><SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} body={dict.gallery.body} />{preview && <Link className="text-link" href={`/${locale}/gallery`}>{dict.gallery.viewAll}<ArrowRight size={17} /></Link>}</div>
    <div className={`gallery-grid ${preview ? "is-preview" : ""}`}>{items.map((item, index) => <button className="gallery-item" key={item.id} type="button" onClick={() => setActive(index)} aria-label={`${dict.gallery.open}: ${dict.gallery.categories[item.category]}`}>
      <Image src={item.image} alt={dict.gallery.alt[item.category]} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized />
      <span>{dict.gallery.categories[item.category]}</span><Maximize2 aria-hidden="true" />
    </button>)}</div>
  </div>
  <AnimatePresence>{active !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={dict.gallery.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => event.target === event.currentTarget && close()} onTouchStart={event => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={event => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1); }}>
    <button ref={closeRef} className="lightbox-close" type="button" onClick={close} aria-label={dict.gallery.close}><X /></button>
    <button className="lightbox-nav prev" type="button" onClick={() => move(-1)} aria-label={dict.gallery.previous}><ArrowLeft /></button>
    <motion.figure key={active} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }}><Image src={galleryItems[active].image} alt={dict.gallery.alt[galleryItems[active].category]} fill sizes="90vw" unoptimized /><figcaption>{dict.gallery.categories[galleryItems[active].category]}</figcaption></motion.figure>
    <button className="lightbox-nav next" type="button" onClick={() => move(1)} aria-label={dict.gallery.next}><ArrowRight /></button>
  </motion.div>}</AnimatePresence>
  </section>;
}
