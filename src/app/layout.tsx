import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TinaCMSProvider } from "@/lib/tina";
import { HeroHeader } from "@/components/hero5-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://roscas.io"),
  title: {
    default: "Roscas – Free App for Managing Your Savings Circle",
    template: "%s | Roscas",
  },
  description:
    "Manage your Paluwagan, Ajo, Esusu, or Chama savings circle with the free Roscas app. Track contributions, schedule payouts, and send reminders – all in one secure place.",
  keywords: [
    "savings circle app",
    "ROSCA app",
    "Paluwagan app",
    "Ajo savings",
    "Esusu app",
    "Chama app",
    "Tanda savings",
    "community savings",
    "rotating savings and credit association",
    "savings group management",
    "free savings app",
    "financial inclusion",
    "diaspora savings UK",
    "contribution tracking",
  ],
  authors: [{ name: "Roscas", url: "https://roscas.io" }],
  creator: "Roscas",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://roscas.io",
    siteName: "Roscas",
    title: "Roscas – Free App for Managing Your Savings Circle",
    description:
      "Manage your Paluwagan, Ajo, Esusu, or Chama savings circle with the free Roscas app. Track contributions, schedule payouts, and send reminders.",
    images: [
      {
        url: "/images/peeps.jpg",
        width: 2700,
        height: 1440,
        alt: "Roscas – Community Savings Circle App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roscas – Free App for Managing Your Savings Circle",
    description:
      "Manage your Paluwagan, Ajo, Esusu, or Chama savings circle with the free Roscas app. Track contributions, schedule payouts, and send reminders.",
    images: ["/images/peeps.jpg"],
    creator: "@RoscasTeam",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TinaCMSProvider>
          <HeroHeader />
          <main>{children}</main>
        </TinaCMSProvider>
      </body>
    </html>
  );
}
