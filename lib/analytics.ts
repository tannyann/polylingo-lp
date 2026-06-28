export type AnalyticsEvent =
  | 'page_view'
  | 'hero_cta_click'
  | 'scroll_50'
  | 'scroll_100'
  | 'demo_interact'
  | 'form_start'
  | 'form_submit'
  | 'form_error'
  | 'faq_open';

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: EventProps },
    ) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, props?: EventProps): void {
  if (typeof window === 'undefined') return;

  if (window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', event, props ?? '');
  }
}

export const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'polylingo.app';
