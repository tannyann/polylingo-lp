'use client';

import { useEffect, useState } from 'react';
import { SIGNUP_FORM_ID } from '@/lib/copy';
import { trackEvent } from '@/lib/analytics';

type StickyMobileCtaProps = {
  label: string;
};

export default function StickyMobileCta({ label }: StickyMobileCtaProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const signupEl = document.getElementById(SIGNUP_FORM_ID);
    if (!signupEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -80px 0px' },
    );

    observer.observe(signupEl);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 p-4 backdrop-blur-md pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
      role="complementary"
      aria-label="事前登録へのショートカット"
    >
      <a
        href={`#${SIGNUP_FORM_ID}`}
        onClick={() =>
          trackEvent('hero_cta_click', { source: 'sticky_mobile' })
        }
        className="btn-primary flex min-h-[48px] w-full items-center justify-center text-base"
      >
        {label}
      </a>
    </div>
  );
}
