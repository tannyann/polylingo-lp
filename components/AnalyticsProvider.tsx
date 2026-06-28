'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { PLAUSIBLE_DOMAIN, trackEvent } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const scroll50 = useRef(false);
  const scroll100 = useRef(false);

  useEffect(() => {
    trackEvent('page_view');

    function onScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const ratio = window.scrollY / scrollable;

      if (!scroll50.current && ratio >= 0.5) {
        scroll50.current = true;
        trackEvent('scroll_50');
      }
      if (!scroll100.current && ratio >= 0.95) {
        scroll100.current = true;
        trackEvent('scroll_100');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!PLAUSIBLE_DOMAIN) return null;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
