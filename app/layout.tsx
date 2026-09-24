import type { Metadata, Viewport } from "next";
import { Barlow, Lato } from "next/font/google";
import "./globals.css";

const barlow = Barlow({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-barlow" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-lato" });

export const metadata: Metadata = {
  title: "BDF × Mzaar Idea Picker",
  description: "Pick the Beirut Duty Free × Mzaar partnership ideas you want to start with.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
