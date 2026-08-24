import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { GateShell } from "@/components/layout/gate-shell";
import { Header } from "@/components/layout/header";
import { FONT_FAMILY } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { siteUrl, websiteJsonLd } from "@/lib/seo";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — UK Event & Attraction Tickets`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  generator: siteConfig.creator,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  metadataBase: new URL(siteUrl),
  keywords: siteConfig.keywords,
  category: siteConfig.category,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — UK Event & Attraction Tickets`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — UK Event & Attraction Tickets`,
    description: siteConfig.description,
    creator: siteConfig.creator,
    images: {
      url: siteConfig.ogImage,
      alt: siteConfig.name,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className="min-h-screen font-sans antialiased"
        style={{ fontFamily: FONT_FAMILY }}
      >
        <JsonLd data={websiteJsonLd()} />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <GateShell>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </GateShell>
        </Providers>
      </body>
    </html>
  );
}
