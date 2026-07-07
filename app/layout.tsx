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
  title: "Aura VPS — High Performance Virtual Servers",
  description:
    "Experience high-performance, low-latency Windows and Linux Virtual Private Servers powered by enterprise KVM virtualization and NVMe SSD nodes.",
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
