import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic", "greek"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bluewavecleaning.org"),
  title: { default: "Blue Wave Cleaning | Professional Cleaning in Paphos & Limassol", template: "%s | Blue Wave Cleaning" },
  description: "Professional home, office, Airbnb and specialized cleaning in Paphos, Limassol and surrounding areas, Cyprus.",
  applicationName:"Blue Wave Cleaning",
  category:"Cleaning Services",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/blue-wave-logo.png" },
  formatDetection: { telephone: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body className={manrope.variable}>{children}</body></html>;
}
