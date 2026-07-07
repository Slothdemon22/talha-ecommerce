"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is Windows VPS?",
    answer: "A Windows Virtual Private Server (VPS) is a private, isolated server environment running Windows Server OS. It grants you full Remote Desktop (RDP) administrator access, allowing you to run desktop programs, host websites, manage databases, and run automated tasks 24/7.",
  },
  {
    question: "How long does setup take?",
    answer: "Our cloud nodes deploy templates between 12 to 24 hours following payment confirmation. You will receive an automated email containing your unique IP address, Admin credentials, and Remote Desktop ports once preparation is complete.",
  },
  {
    question: "Where are the datacenters located?",
    answer: "We deploy cloud nodes in enterprise-grade datacenters in the United States (US) and the United Kingdom (UK). You will have the option to specify your preferred location during the checkout validation process.",
  },
  {
    question: "What is KVM virtualization?",
    answer: "KVM (Kernel-based Virtual Machine) is a true hardware virtualization technology. Unlike shared container hosting, KVM ensures your VPS has fully isolated memory, disk allocations, and CPU cycles that cannot be oversold or shared.",
  },
  {
    question: "Are VPS packages refundable?",
    answer: "Because we allocate dedicated network interfaces, static IP mappings, and physical resources immediately upon order placement, all of our promotional VPS plans are non-refundable.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="bg-canvas px-6 py-20 sm:py-24 lg:px-8 lg:py-[80px] border-t border-hairline"
    >
      <div className="mx-auto max-w-[720px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-muted-48">
            FAQS
          </p>
          <h2 className="font-display text-display-md text-ink">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 text-[15px] text-ink-muted-80">
            Find immediate answers regarding deployment, server specs, refunds, and Remote Desktop credentials.
          </p>
        </div>

        <div className="divide-y divide-divider-soft border-t border-b border-divider-soft">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="flex w-full items-center justify-between text-left outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[17px] font-semibold text-ink group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`ml-6 flex h-6 w-6 items-center justify-center rounded-full bg-canvas-parchment text-[18px] text-ink-muted-80 font-bold transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-primary" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15px] leading-[1.6] text-ink-muted-80 font-normal text-pretty">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
