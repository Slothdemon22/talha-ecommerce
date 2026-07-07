import { getSession } from "@/lib/session";
import { CheckoutForm } from "./CheckoutForm";

interface PageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const session = await getSession();
  const user = session ? { email: session.email, name: session.name } : null;
  const resolvedParams = await searchParams;
  const plan = resolvedParams.plan || null;

  return <CheckoutForm planId={plan} initialUser={user} />;
}
