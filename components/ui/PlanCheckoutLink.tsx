"use client";

import Link from "next/link";
import { saveCartPlan } from "@/lib/cart";
import type { ComponentProps } from "react";

type PlanCheckoutLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  planId: string;
  href?: string;
};

export function PlanCheckoutLink({
  planId,
  href,
  onClick,
  ...props
}: PlanCheckoutLinkProps) {
  return (
    <Link
      href={href ?? `/checkout?plan=${planId}`}
      onClick={(e) => {
        saveCartPlan(planId);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
