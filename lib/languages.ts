import type { LanguageCode } from '@/lib/copy';

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文',
  ko: '한국어',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  fr: 'Français',
};

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  zh: '🇨🇳',
  ko: '🇰🇷',
  es: '🇪🇸',
  pt: '🇵🇹',
  it: '🇮🇹',
  fr: '🇫🇷',
};
