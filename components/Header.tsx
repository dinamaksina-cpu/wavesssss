"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { languageNames, locales, type Dictionary, type Locale } from "@/lib/i18n";
import { SocialLinks } from "./SocialLinks";

export function LanguageSwitcher({ locale, label = "Language" }: { locale: Locale; label?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  function change(next: string) {
    const parts = pathname.split("/");
    parts[1] = next;
    localStorage.setItem("blue-wave-locale", next);
    document.cookie = `blue-wave-locale=${next};path=/;max-age=31536000;samesite=lax`;
    router.push(parts.join("/") || `/${next}`);
  }
  return (
    <label className="language-select">
      <span className="sr-only">{label}</span>
      <select value={locale} onChange={(e) => change(e.target.value)} aria-label={label}>
        {locales.map((code) => <option value={code} key={code}>{code.toUpperCase()}</option>)}
      </select>
      <ChevronDown size={14} aria-hidden="true" />
    </label>
  );
}

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButtonRef.current?.focus(); return; }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const nav = [["services", dict.nav.services], ["prices", dict.nav.prices], ["gallery", dict.gallery.title], ["about", dict.nav.about], ["faq", dict.nav.faq], ["contact", dict.nav.contact]];
  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Logo locale={locale} />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([href, label]) => <Link key={href} href={`/${locale}/${href}`}>{label}</Link>)}
          </nav>
          <div className="header-actions">
            <LanguageSwitcher locale={locale} />
            <Link href={`/${locale}/booking`} className="button button-sm">{dict.nav.booking}</Link>
            <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(true)} aria-label={dict.nav.menu} aria-expanded={open} aria-controls="mobile-menu"><Menu /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div ref={panelRef} id="mobile-menu" className="menu-panel" initial={{ x: reduceMotion ? 0 : "100%" }} animate={{ x: 0 }} exit={{ x: reduceMotion ? 0 : "100%" }} transition={{ duration: reduceMotion ? 0 : .38, ease: [0.22, 1, 0.36, 1] }} role="dialog" aria-modal="true" aria-label={dict.nav.menu}>
              <motion.div className="menu-wave-orb" aria-hidden="true" initial={{ opacity: 0, scale: .75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : .7 }} />
              <div className="menu-top"><Logo locale={locale} compact /><button className="menu-button" onClick={() => setOpen(false)} aria-label={dict.nav.close}><X /></button></div>
              <motion.nav className="mobile-nav" initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: reduceMotion ? 0 : .055, delayChildren: reduceMotion ? 0 : .1 } } }}>
                <motion.div variants={{ hidden: { opacity: 0, x: reduceMotion ? 0 : 26 }, shown: { opacity: 1, x: 0 } }}><Link href={`/${locale}`} onClick={() => setOpen(false)}><span>01</span>{dict.nav.home}</Link></motion.div>
                {nav.map(([href, label], i) => <motion.div key={href} variants={{ hidden: { opacity: 0, x: reduceMotion ? 0 : 26 }, shown: { opacity: 1, x: 0 } }}><Link href={`/${locale}/${href}`} onClick={() => setOpen(false)}><span>0{i + 2}</span>{label}</Link></motion.div>)}
              </motion.nav>
              <motion.div className="menu-bottom" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : .34 }}>
                <SocialLinks dict={dict} compact />
                <div className="language-list">{locales.map((code) => <Link key={code} href={`/${code}${pathname.replace(/^\/(en|ru|el|uk)/, "")}`} onClick={() => setOpen(false)}>{languageNames[code]}</Link>)}</div>
                <Link href={`/${locale}/booking`} className="button" onClick={() => setOpen(false)}>{dict.nav.booking}</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
