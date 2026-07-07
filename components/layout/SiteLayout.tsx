"use client";

import { GlobalFooter } from "./GlobalFooter";
import { WebAiryHeader } from "./WebAiryHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CookieBanner } from "@/components/ui/CookieBanner";

interface UserSession {
  email: string;
  name?: string;
}

export function SiteLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserSession | null;
}) {
  return (
    <>
      <WebAiryHeader user={user} />
      <WhatsAppButton />
      <CookieBanner />
      <div className="flex min-h-screen min-w-0 flex-col">
        <main className="min-w-0 flex-1">{children}</main>
        <GlobalFooter />
      </div>
    </>
  );
}
