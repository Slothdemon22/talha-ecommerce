"use server";

import { db } from "@/lib/db";
import type { OrderItem } from "@/lib/orders";
import { getSession } from "@/lib/session";
import { vpsPlansById } from "@/lib/plans";

export async function createOrderAction(orderData: {
  planId: string;
  customerEmail: string;
  totalAmount: number;
  shippingAddress: string;
  items: OrderItem[];
}) {
  const plan = vpsPlansById[orderData.planId];
  if (!plan) {
    return { error: "Invalid VPS plan selected." };
  }

  const email = orderData.customerEmail.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "A valid email address is required." };
  }

  if (!orderData.shippingAddress.trim()) {
    return { error: "Owner information is required." };
  }

  const expectedTotal = Number((plan.price * 1.08).toFixed(2));
  if (Math.abs(orderData.totalAmount - expectedTotal) > 0.01) {
    return { error: "Order total mismatch. Please refresh and try again." };
  }

  try {
    const session = await getSession();
    const userId = session?.userId || null;

    const order = await db.order.create({
      data: {
        userId,
        customerEmail: email,
        totalAmount: expectedTotal,
        shippingAddress: orderData.shippingAddress.trim(),
        items: orderData.items,
        status: "PROCESSING",
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation error:", error);
    return { error: "Failed to save your order. Please try again." };
  }
}
