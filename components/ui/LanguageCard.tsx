import type { LanguageCode } from '@/lib/copy';
import { LANGUAGE_FLAGS, LANGUAGE_LABELS } from '@/lib/languages';

type LanguageCardProps = {
  code: LanguageCode;
  text: string;
  pronunciation?: string;
  onPlayAudio?: () => void;
};

export function LanguageCard({
  code,
  text,
  pronunciation,
  onPlayAudio,
}: LanguageCardProps) {
  return (
    <article className="card flex flex-col gap-3 !p-4 md:!p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            {LANGUAGE_FLAGS[code]}
          </span>
          <span className="font-caption text-blue">{LANGUAGE_LABELS[code]}</span>
        </div>
        <button
          type="button"
          onClick={onPlayAudio}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lightblue text-navy transition hover:bg-blue hover:text-white focus-visible:ring-navy"
          aria-label={`${LANGUAGE_LABELS[code]}の音声を再生（デモ）`}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </button>
      </div>
      <p className="text-base font-semibold leading-snug text-navy">
        {text || '—'}
      </p>
      {pronunciation && (
        <p className="text-xs text-text-muted">{pronunciation}</p>
      )}
    </article>
  );
}
