"use client";

import React, { useState } from "react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/923398010015?text=Hello%20Aura%20VPS%2C%20I%20have%20a%20question%20about%20your%20VPS%20hosting%20plans.", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Tooltip */}
      <div
        className={`absolute right-full mr-3 bg-ink/90 backdrop-blur-sm text-on-dark text-[12px] font-medium py-1.5 px-3 rounded-md shadow-md transition-all duration-300 origin-right ${
          showTooltip ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-2 scale-95 pointer-events-none"
        }`}
      >
        Chat with Aura VPS Support
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contact us on WhatsApp"
        className="relative flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 text-white shadow-lg hover:shadow-xl hover:bg-emerald-600 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 group"
      >
        {/* Outer pulse effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-75 group-hover:animate-none"></span>
        
        {/* WhatsApp Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative z-10"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.01 2C6.48 2 2 6.48 2 12c0 2.17.69 4.19 1.87 5.83L2.5 22.5l4.87-1.3c1.55.91 3.35 1.43 5.28 1.43 5.53 0 10-4.48 10-10S17.54 2 12.01 2zm6.26 14.16c-.26.74-1.29 1.35-1.78 1.4-.49.05-.98.24-3.15-.6-2.77-1.07-4.57-3.89-4.71-4.08-.14-.19-1.12-1.49-1.12-2.84s.7-2.02.95-2.28c.25-.26.54-.33.72-.33h.52c.16 0 .37-.06.58.45.21.51.72 1.76.78 1.88.06.12.1.27.02.43-.08.16-.12.26-.25.41-.12.15-.26.33-.37.44-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.92.81 1.7 1.06 1.94 1.18.25.12.39.1.53-.06.14-.16.62-.72.78-.97.16-.25.33-.21.56-.12.23.09 1.48.7 1.73.83.25.12.41.19.47.3.06.11.06.63-.2 1.37z"
          />
        </svg>
      </button>
    </div>
  );
}
