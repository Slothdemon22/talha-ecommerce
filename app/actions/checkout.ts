"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function createOrderAction(orderData: {
  totalAmount: number;
  shippingAddress: string;
  items: any;
}) {
  try {
    const session = await getSession();
    const userId = session?.userId || null;

    const order = await db.order.create({
      data: {
        userId,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        items: orderData.items,
        status: "COMPLETED",
      },
    });

    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Order creation error:", error);
    return { error: "Failed to persist order in the database." };
  }
}
