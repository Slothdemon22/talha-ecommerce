import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-1 bg-canvas-parchment py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[800px] space-y-10">
        <header className="space-y-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-1 text-[14px] font-medium text-primary hover:text-primary-focus transition-colors"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">‹</span>
            <span>Back to Store</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-[40px] font-semibold leading-tight tracking-tight text-ink">
                Your Orders
              </h1>
              <p className="text-[15px] text-ink-muted-80 mt-1">
                Manage your Aura VPS deployments and order histories.
              </p>
            </div>
            {session.name && (
              <div className="text-[14px] text-ink-muted-80 sm:text-right">
                Logged in as <span className="font-semibold text-ink">{session.name}</span>
              </div>
            )}
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="bg-canvas border border-hairline rounded-lg p-12 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-canvas-parchment text-ink-muted-80">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-[21px] font-semibold text-ink">No orders found</h2>
              <p className="text-[15px] text-ink-muted-80 max-w-sm mx-auto">
                You haven't placed any orders yet. When you deploy a VPS server plan, it will appear here.
              </p>
            </div>
            <div className="pt-2">
              <Button href="/#pricing" variant="primary">
                Shop Aura VPS
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const items = (order.items as unknown as OrderItem[]) || [];

              return (
                <article
                  key={order.id}
                  className="bg-canvas border border-hairline rounded-lg overflow-hidden transition-premium hover:border-ink-muted-48/30"
                >
                  {/* Order Card Header */}
                  <header className="border-b border-divider-soft bg-surface-pearl px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px] text-ink-muted-80 font-medium">
                    <div>
                      <p className="uppercase tracking-wider text-[10px] text-ink-muted-48">Date Placed</p>
                      <p className="text-ink mt-0.5">{formattedDate}</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-wider text-[10px] text-ink-muted-48">Total Paid</p>
                      <p className="text-ink mt-0.5 font-semibold">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-wider text-[10px] text-ink-muted-48">Ship To</p>
                      <p className="text-ink mt-0.5 truncate" title={order.shippingAddress || ""}>
                        {order.shippingAddress?.split(",")[0] || "Customer"}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="uppercase tracking-wider text-[10px] text-ink-muted-48">Order ID</p>
                      <p className="text-ink mt-0.5 font-mono select-all truncate">{order.id}</p>
                    </div>
                  </header>

                  {/* Order Card Body */}
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[14px] font-semibold text-emerald-600">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Status: {order.status}</span>
                      </div>
                      <span className="text-[12px] text-ink-muted-48">Est. Deployment: 24-48 Hours</span>
                    </div>

                    <div className="divide-y divide-divider-soft">
                      {items.map((item, idx) => (
                        <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-canvas-parchment rounded border border-divider-soft flex items-center justify-center p-1 relative overflow-hidden">
                              {/* Simple SVG icon/placeholder represent server blade */}
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                className="text-ink-muted-80"
                              >
                                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                <line x1="6" y1="6" x2="6" y2="6.01" strokeWidth="2" strokeLinecap="round" />
                                <line x1="6" y1="18" x2="6" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                                <line x1="10" y1="6" x2="18" y2="6" />
                                <line x1="10" y1="18" x2="18" y2="18" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-[15px] font-semibold text-ink">{item.name}</h3>
                              <p className="text-[12px] text-ink-muted-80 mt-0.5">
                                Qty: {item.quantity} · ${item.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                          <span className="text-[15px] font-semibold text-ink">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.shippingAddress && (
                      <div className="border-t border-divider-soft pt-4 text-[13px] text-ink-muted-80 space-y-1">
                        <p className="font-semibold text-ink">Server Provisioning Destination / Owner Address</p>
                        <p>{order.shippingAddress}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
