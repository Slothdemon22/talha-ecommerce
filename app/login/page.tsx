import { Suspense } from "react";
import type { Metadata } from "next";
import LoginPage from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your WebAiry account to manage VPS orders and account details.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginRoute() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-ink-muted-80">Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
