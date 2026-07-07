"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createOrderAction } from "@/app/actions/checkout";

type CheckoutStep = "checkout" | "success";

interface CheckoutFormProps {
  planId?: string | null;
  initialUser: {
    email: string;
    name?: string;
  } | null;
}

export function CheckoutForm({ planId, initialUser }: CheckoutFormProps) {
  // Parse name parts from initialUser if logged in
  const nameParts = initialUser?.name?.trim().split(/\s+/) || [];
  const initialFirstName = nameParts[0] || "";
  const initialLastName = nameParts.slice(1).join(" ") || "";

  // Dynamic plan details matching page options
  const vpsPlans: Record<string, { name: string; price: number; disk: string; ram: string }> = {
    "vps-4gb": { name: "Windows 4GB VPS", price: 10.00, disk: "40GB NVMe SSD", ram: "4GB Dedicated" },
    "vps-8gb": { name: "Windows 8GB VPS", price: 20.00, disk: "60GB NVMe SSD", ram: "8GB Dedicated" },
    "vps-16gb": { name: "Windows 16GB VPS", price: 30.00, disk: "120GB NVMe SSD", ram: "16GB Dedicated" },
  };

  const selectedPlanId = planId && vpsPlans[planId] ? planId : "vps-8gb";
  const planInfo = vpsPlans[selectedPlanId];
  const subtotal = planInfo.price;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const [step, setStep] = useState<CheckoutStep>("checkout");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const shippingAddress = `${firstName} ${lastName}, ${address}, ${city}, ${zipCode}`;
    const items = [
      { productId: selectedPlanId, name: planInfo.name, price: planInfo.price, quantity: 1 }
    ];

    try {
      const res = await createOrderAction({
        totalAmount: total,
        shippingAddress,
        items,
      });

      setLoading(false);
      if (res && res.error) {
        setErrorMessage(res.error);
      } else if (res && res.orderId) {
        setOrderId(res.orderId);
        setStep("success");
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (step === "success") {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-20 px-6 bg-canvas">
        <div className="max-w-[480px] w-full text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-[32px] font-semibold tracking-tight text-ink">
              Thank you for your order.
            </h1>
            <p className="text-[15px] text-ink-muted-80">
              We've received your payment. Your Aura VPS will begin provisioning shortly.
            </p>
          </div>

          <div className="border border-divider-soft rounded-lg bg-canvas-parchment p-6 text-left space-y-4">
            <div className="flex justify-between text-[14px]">
              <span className="text-ink-muted-80">Order Number</span>
              <span className="font-semibold text-ink">{orderId}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-ink-muted-80">Payment Method</span>
              <span className="font-medium text-ink">•••• 4242 (Stripe Mock)</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-ink-muted-80">Estimated Setup Time</span>
              <span className="font-medium text-ink">24-48 Hours</span>
            </div>
            <div className="border-t border-hairline pt-3 flex justify-between text-[15px] font-semibold">
              <span className="text-ink">Total Paid</span>
              <span className="text-ink">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button href="/" className="w-full justify-center">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-canvas-parchment py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form */}
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-7 bg-canvas border border-hairline rounded-lg p-6 sm:p-8 space-y-8"
          >
            {errorMessage && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-[14px] font-medium text-red-800 text-pretty">{errorMessage}</p>
              </div>
            )}

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink border-b border-divider-soft pb-2">
                1. Contact Information
              </h2>
              <div className="space-y-1.5">
                <label htmlFor="checkout-email" className="block text-[12px] font-medium text-ink-muted-80">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="name@example.com"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="space-y-4">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink border-b border-divider-soft pb-2">
                2. Owner Information & Location Selection
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="first-name" className="block text-[12px] font-medium text-ink-muted-80">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="last-name" className="block text-[12px] font-medium text-ink-muted-80">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="street-address" className="block text-[12px] font-medium text-ink-muted-80">
                  Street Address
                </label>
                <input
                  id="street-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="123 Apple Way"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="city" className="block text-[12px] font-medium text-ink-muted-80">
                    City / Server Location (e.g. US or UK)
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Cupertino (US Datacenter)"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="zip" className="block text-[12px] font-medium text-ink-muted-80">
                    ZIP / Postal Code
                  </label>
                  <input
                    id="zip"
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="95014"
                  />
                </div>
              </div>
            </section>

            {/* Payment Details (Stripe Mock) */}
            <section className="space-y-4">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink border-b border-divider-soft pb-2 flex items-center justify-between">
                <span>3. Payment Information</span>
                <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Stripe Test Mode
                </span>
              </h2>
              <div className="space-y-1.5">
                <label htmlFor="card-number" className="block text-[12px] font-medium text-ink-muted-80">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="card-number"
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      let formatted = val.match(/.{1,4}/g)?.join(" ") || "";
                      setCardNumber(formatted);
                    }}
                    className="block w-full rounded-md border border-hairline bg-canvas pl-4 pr-12 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="4242 4242 4242 4242"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-ink-muted-48">
                      <rect width="24" height="16" rx="2" fill="currentColor" opacity="0.1" />
                      <circle cx="8" cy="8" r="4" fill="#EB001B" />
                      <circle cx="14" cy="8" r="4" fill="#F79E1B" opacity="0.8" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="expiry" className="block text-[12px] font-medium text-ink-muted-80">
                    Expiration Date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    required
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 2) {
                        setExpiry(val.slice(0, 2) + "/" + val.slice(2, 4));
                      } else {
                        setExpiry(val);
                      }
                    }}
                    className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cvc" className="block text-[12px] font-medium text-ink-muted-80">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="password"
                    required
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                    className="block w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder-ink-muted-48 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="123"
                  />
                </div>
              </div>
            </section>

            <div className="pt-4 border-t border-divider-soft">
              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center active:scale-[0.96] transition-transform duration-200"
              >
                {loading ? "Processing Secure Payment..." : `Place Your Order — $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>

          {/* Order Summary */}
          <aside className="lg:col-span-5 bg-canvas border border-hairline rounded-lg p-6 space-y-6 sticky top-28">
            <h2 className="text-[17px] font-semibold tracking-tight text-ink border-b border-divider-soft pb-2">
              Order Summary
            </h2>

            <div className="flex gap-4">
              <div className="relative h-20 w-20 bg-canvas-parchment rounded border border-divider-soft overflow-hidden flex items-center justify-center p-2">
                <svg
                  width="40"
                  height="40"
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
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{planInfo.name}</h3>
                  <p className="text-[12px] text-ink-muted-48">RAM: {planInfo.ram} · Storage: {planInfo.disk}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-ink-muted-80 font-medium">Qty: 1</span>
                  <span className="text-[15px] font-semibold text-ink">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-divider-soft text-[14px]">
              <div className="flex justify-between">
                <span className="text-ink-muted-80">Subtotal</span>
                <span className="text-ink font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted-80">Setup / Delivery</span>
                <span className="text-ink font-medium text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted-80">Estimated Tax (8%)</span>
                <span className="text-ink font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-hairline pt-3 flex justify-between text-[17px] font-semibold">
                <span className="text-ink">Total</span>
                <span className="text-ink">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-canvas-parchment rounded-md p-4 text-[12px] text-ink-muted-80 space-y-1 text-pretty">
              <p className="font-semibold text-ink flex items-center gap-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-emerald-600"
                >
                  <polyline points="10 3 4.5 8.5 2 6" />
                </svg>
                Secure Billing Guaranteed
              </p>
              <p>Your details are protected using industry-grade SSL encryption and processed mock via Stripe.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
