import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { brand } from "@/content/brand";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0c1a1f",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${brand.name} — Websites, Apps, PWAs & Systems for Clinics`,
    template: `%s · ${brand.name}`,
  },
  description: brand.tagline,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: brand.name,
    title: `${brand.name} — Websites, Apps, PWAs & Systems for Clinics`,
    description: brand.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    title: brand.name,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-off-white text-foreground">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
