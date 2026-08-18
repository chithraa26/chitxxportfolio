import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { site } from "@/lib/content";

/**
 * ONE typeface now — Inter, for headings and body alike.
 *
 * Italic is loaded on purpose: the word-emphasis mechanic leans on it, and
 * without a real italic the browser slants the roman itself, which looks
 * broken at display sizes.
 */
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Fraunces, kept for exactly one element: the hero line.
 *
 * Everything else on the site is Inter. This is the only place the serif and
 * its true italic still earn their download — the word-emphasis mechanic
 * depends on a real italic and a genuinely heavier cut, and Inter's italic
 * can't carry that contrast at display size.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body id="top">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
