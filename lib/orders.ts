import { db } from "@/lib/db";

import type { Order } from "@prisma/client";

export type { Order };

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export async function linkGuestOrdersToUser(userId: string, email: string) {
  await db.order.updateMany({
    where: {
      userId: null,
      customerEmail: email.toLowerCase(),
    },
    data: { userId },
  });
}
