'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[hsl(var(--color-background))] border-t border-[hsl(var(--color-border))] p-4 shadow-lg z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
        We use cookies for analytics and ads. By using FreePDF you agree to our Privacy Policy.
      </p>
      <div className="flex gap-3 whitespace-nowrap">
        <Link href="/en/privacy" className="text-sm font-medium text-[hsl(var(--color-muted-foreground))] hover:text-[#F97316] transition-colors py-2 px-4">
          Learn More
        </Link>
        <button
          onClick={accept}
          className="bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-medium py-2 px-6 rounded-md transition-colors shadow-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
