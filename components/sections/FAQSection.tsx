"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is Windows VPS?",
    answer:
      "Also known as virtual private server, a VPS windows is a server that runs on the windows operating system. Virtualization technology is used to create and run this virtual environment on a physical machine it can be a cost effective alternative to physical servers, providing a reliable and scalable solution for businesses of all sizes.",
  },
  {
    question: "These are managed or un-managed VPS?",
    answer:
      "Our service is designed for experienced users and is self-managed. We are here to make sure your VPS is online (Responding to ping and SSH requests). We will respond to your requests regarding the performance, network or virtualization issues within minutes. Beyond that is within your responsibility. However, you are not left alone in the dark if you need help. We are happy to help on a courtesy basis. We are going to make sure to refer you to the right direction at all times. By unmanaged/self-managed, we mean that it is your responsibility to manage your own VPS. We do not offer support except network and hardware issues.",
  },
  {
    question: "Is VPS renewable?",
    answer:
      "Yes, we are offering renewal VPS but make sure customer renew it before the expiry date.",
  },
  {
    question: "When VPS will be delivered after payment ?",
    answer:
      "We process each order manually, the estimated time frame is 1 hour min or 24 hours max. Incase of any complication we inform the customer accordingly.",
  },
  {
    question: "Will I get any kind of assistance while using VPS?",
    answer:
      "Our customer support agent will be there to assist you 24/7. However, our VPS hosting is self-managed, so you will take care of your own virtual server. This gives you the freedom and flexibility to run it as you like.",
  },
  {
    question: "How do I pay my subscription fee?",
    answer:
      "We accept Bank transfers, Paypal, Wise, credit cards, coin payments and mobile payments as well.",
  },
  {
    question: "Do you offer annual VPS plans?",
    answer: "Yes, we are offering monthly and annually VPS plans.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="bg-canvas-parchment px-6 py-20 sm:py-24 lg:px-8 lg:py-[80px] border-t border-hairline"
    >
      <div className="mx-auto max-w-[720px]">
        <RevealOnScroll className="mb-14 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-muted-48">
            FAQS
          </p>
          <h2 className="font-display text-display-md text-ink">
            Frequently Asked Questions
          </h2>
        </RevealOnScroll>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <RevealOnScroll key={item.question} delay={idx * 50} as="div">
                <div
                  className={`overflow-hidden rounded-2xl border px-5 py-4 transition-[border-color,background-color,box-shadow] duration-300 sm:px-6 ${
                    isOpen
                      ? "border-primary/25 bg-primary/[0.04] shadow-[0_8px_24px_rgba(105,65,165,0.08)]"
                      : "border-hairline bg-canvas hover:border-primary/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className="flex w-full items-center justify-between text-left outline-none cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-[16px] font-semibold pr-4 transition-colors sm:text-[17px] ${
                        isOpen ? "text-primary" : "text-ink group-hover:text-primary"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[16px] font-bold transition-[transform,background-color,color] duration-300 ${
                        isOpen
                          ? "rotate-45 bg-primary text-on-primary"
                          : "bg-canvas-parchment text-ink-muted-80"
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
                      <p className="text-[14px] leading-[1.6] text-ink-muted-80 text-pretty sm:text-[15px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
