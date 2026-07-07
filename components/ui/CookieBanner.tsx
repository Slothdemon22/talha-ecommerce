"use client";

import { useState } from "react";

const STORAGE_KEY = "webairy-cookie-consent";

function readConsentRequired() {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(STORAGE_KEY);
}

export function CookieBanner() {
  const [visible, setVisible] = useState(readConsentRequired);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] border-t border-hairline bg-canvas p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:p-5">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-ink-muted-80">
          By using this website, you agree to our use of cookies. We use cookies to
          provide you with a great experience and to help our website run effectively.
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-md bg-primary px-5 py-2 text-[13px] font-medium text-on-primary hover:bg-primary-focus transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
