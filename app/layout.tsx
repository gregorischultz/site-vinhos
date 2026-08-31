import type { Metadata } from "next";
import { Fraunces, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { EnTete } from "@/components/EnTete";
import { BarriereAge } from "@/components/BarriereAge";
import { BanniereCookies } from "@/components/BanniereCookies";
import { PiedLegal } from "@/components/PiedLegal";

// Fontes self-hosted (descarregadas no build, servidas pelo próprio site — sem CDN)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

import { SITE_URL, SITE_BASELINE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Carafe — ${SITE_BASELINE}`,
  description:
    "Guide éditorial pour choisir une bouteille concrète en moins de deux minutes : par plat, par budget ou par type de vin.",
  openGraph: {
    title: `Carafe — ${SITE_BASELINE}`,
    siteName: "Carafe",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <BarriereAge />
        <EnTete />
        <div className="flex-1">{children}</div>
        <PiedLegal />
        <BanniereCookies />
      </body>
    </html>
  );
}
