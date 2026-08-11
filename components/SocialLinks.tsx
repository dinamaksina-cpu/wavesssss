import { socials } from "@/data/socials";
import type { Dictionary } from "@/lib/i18n";

type Brand = "instagram" | "facebook" | "telegram" | "whatsapp";

function BrandIcon({ brand }: { brand: Brand }) {
  if (brand === "instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.25"/><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>;
  if (brand === "facebook") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.2 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8V13h2.8v8h3.4Z"/></svg>;
  if (brand === "telegram") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.7 3.4 18.5 20c-.2 1.2-.9 1.5-1.8.9l-4.9-3.6-2.3 2.3c-.3.3-.5.5-1 .5l.3-5 9.2-8.3c.4-.4-.1-.6-.6-.2L6 13.8l-4.8-1.5c-1-.3-1.1-1 .2-1.5l18.8-7.3c.9-.3 1.7.2 1.5-.1Z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.8 9.8 0 0 0-8.4 14.9L2.2 22l5.2-1.4A9.9 9.9 0 1 0 12 2Zm0 17.8a7.8 7.8 0 0 1-4-1.1l-.3-.2-3.1.8.8-3-.2-.3A7.8 7.8 0 1 1 12 19.8Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.9-.2-.3.2-.3.6-1.1.1-.2.1-.4 0-.6l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.5 3.9 1.7.7 2.4.8 3.3.7 1-.1 1.4-.8 1.6-1.4.2-.5.2-1 .1-1.1-.2-.2-.4-.2-.7-.4Z"/></svg>;
}

export function SocialLinks({ dict, compact = false }: { dict: Dictionary; compact?: boolean }) {
  const links: Array<{ name: string; href: string; brand: Brand }> = [
    { name: "Instagram", href: socials.instagram, brand: "instagram" },
    { name: "Facebook", href: socials.facebook, brand: "facebook" },
    { name: "Telegram", href: socials.telegram, brand: "telegram" },
    { name: "WhatsApp", href: socials.whatsapp, brand: "whatsapp" },
  ];
  return <div className={`social-links ${compact ? "is-compact" : ""}`} aria-label={dict.social.follow}>{links.map(({ name, href, brand }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><BrandIcon brand={brand} /><span>{name}</span></a>)}</div>;
}
