import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import type { Dictionary, Locale } from "@/lib/i18n";

export function FloatingContact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <><a className="whatsapp-float" href={company.whatsapp} target="_blank" rel="noreferrer" aria-label={dict.common.whatsapp}><MessageCircle /></a><div className="mobile-sticky"><a href={company.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{dict.contact.whatsapp}</a><Link href={`/${locale}/booking`}>{dict.nav.booking}</Link></div></>;
}
