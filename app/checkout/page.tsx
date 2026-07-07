import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { CheckoutForm } from "./CheckoutForm";

interface PageProps {
  searchParams: Promise<{ plan?: string }>;
}

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your WebAiry VPS order with secure checkout and fast provisioning.",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const session = await getSession();
  const user = session ? { email: session.email, name: session.name } : null;
  const resolvedParams = await searchParams;
  const plan = resolvedParams.plan || null;

  return <CheckoutForm planId={plan} initialUser={user} />;
}
