import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic", "greek"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bluewavecleaning.org"),
  title: { default: "Blue Wave Cleaning | Cleaning Services Cyprus", template: "%s | Blue Wave Cleaning" },
  description: "Professional home, office and vacation rental cleaning in Paphos, Limassol and surrounding areas.",
  icons: { icon: "/blue-wave-logo.png", shortcut: "/blue-wave-logo.png" },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={manrope.variable}>{children}</body></html>;
}
