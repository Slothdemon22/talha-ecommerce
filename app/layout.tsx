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
  title: "High Performance VPS Hosting with 24/7 Support - WebAiry",
  description:
    "WebAiry offers unbeatable prices for US & UK VPS. Robust and dependable Windows-based servers tailored to customer requirements.",
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
