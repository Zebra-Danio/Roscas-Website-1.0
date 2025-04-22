import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TinaCMSProvider } from "@/lib/tina";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roscas - Modern Solutions for Customer Engagement",
  description: "Highly customizable components for building modern websites and applications that look and feel the way you mean it.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
          {children}
        </TinaCMSProvider>
      </body>
    </html>
  );
}
