export const CART_PLAN_KEY = "webairy_cart_plan";

export function saveCartPlan(planId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CART_PLAN_KEY, planId);
}

export function getCartPlan(fallback = "vps-8gb") {
  if (typeof window === "undefined") return fallback;
  return sessionStorage.getItem(CART_PLAN_KEY) || fallback;
}
