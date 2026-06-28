'use client';

import { useState } from 'react';
import type { LanguageCode } from '@/lib/copy';
import { LANGUAGE_PILLS } from '@/lib/copy';

type LearnOnboardingProps = {
  onStart: (languages: LanguageCode[]) => void;
};

export function LearnOnboarding({ onStart }: LearnOnboardingProps) {
  const [selected, setSelected] = useState<LanguageCode[]>(['en', 'de']);

  const toggle = (code: LanguageCode) => {
    setSelected((prev) =>
      prev.includes(code)
        ? prev.length > 1
          ? prev.filter((c) => c !== code)
          : prev
        : [...prev, code],
    );
  };

  return (
    <div className="mx-auto max-w-lg">
      <p className="badge-amber">Month 1 — 30構文</p>
      <h1 className="mt-4 font-title text-navy">学習を始める</h1>
      <p className="mt-3 text-text-muted">
        1日1構文 × 5バリエーション。選んだ言語で復習カードが作られます。
        進捗はこのブラウザに保存されます。
      </p>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold text-navy">
          学習する言語（1つ以上）
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LANGUAGE_PILLS.map(({ code, label }) => {
            const active = selected.includes(code);
            return (
              <button
                key={code}
                type="button"
                onClick={() => toggle(code)}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? 'border-navy bg-navy text-white'
                    : 'border-border bg-white text-navy hover:bg-lightblue'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => onStart(selected)}
        className="btn-primary mt-8 w-full min-h-[48px]"
      >
        学習を開始する
      </button>
    </div>
  );
}
