import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getSession } from "@/lib/session";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://webairy.com"),
  title: {
    default: "WebAiry | High Performance VPS Hosting",
    template: "%s | WebAiry",
  },
  description:
    "WebAiry offers high-performance VPS hosting with reliable uptime, fast deployment, and responsive support for global businesses.",
  applicationName: "WebAiry",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "WebAiry",
    "VPS hosting",
    "Windows VPS",
    "KVM VPS",
    "managed VPS",
    "UK VPS hosting",
    "US VPS hosting",
  ],
  authors: [{ name: "WebAiry" }],
  creator: "WebAiry",
  publisher: "WebAiry",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "WebAiry",
    title: "WebAiry | High Performance VPS Hosting",
    description:
      "WebAiry offers high-performance VPS hosting with reliable uptime, fast deployment, and responsive support.",
    images: [
      {
        url: "/images/webairy-logo.png",
        width: 1200,
        height: 630,
        alt: "WebAiry logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebAiry | High Performance VPS Hosting",
    description:
      "WebAiry offers high-performance VPS hosting with reliable uptime, fast deployment, and responsive support.",
    images: ["/images/webairy-logo.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session ? { email: session.email, name: session.name } : null;

  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-canvas text-ink">
        <SiteLayout user={user}>{children}</SiteLayout>
      </body>
    </html>
  );
}
