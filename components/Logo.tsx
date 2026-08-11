import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Logo({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <Link href={`/${locale}`} className="logo" aria-label="Blue Wave Cleaning home">
      <Image src="/blue-wave-logo.png" alt="Blue Wave Cleaning" width={1292} height={1424} priority unoptimized className={compact ? "logo-img compact" : "logo-img"} />
      {!compact && <span><strong>BLUE WAVE</strong><small>CLEANING</small></span>}
    </Link>
  );
}
