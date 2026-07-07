"use client";

import Link from "next/link";
import { getCartPlan } from "@/lib/cart";

type CartLinkProps = {
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
};

export function CartLink({ className, children, onNavigate }: CartLinkProps) {
  const plan = getCartPlan();

  return (
    <Link href={`/checkout?plan=${plan}`} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}
