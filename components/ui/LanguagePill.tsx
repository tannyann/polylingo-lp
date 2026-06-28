import type { LanguageCode } from '@/lib/copy';

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文',
  ko: '한국어',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  fr: 'Français',
};

type LanguagePillProps = {
  code: LanguageCode;
  label: string;
  className?: string;
};

export function LanguagePill({ code, label, className = '' }: LanguagePillProps) {
  return (
    <div
      className={`flex h-16 min-w-[4.5rem] flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/20 md:h-[4.75rem] md:min-w-0 ${className}`}
      aria-label={LANGUAGE_NAMES[code]}
    >
      <span className="text-lg font-bold tracking-wide text-white md:text-xl">
        {label}
      </span>
    </div>
  );
}
