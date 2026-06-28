'use client';

import { useState } from 'react';
import { LanguageCard } from '@/components/ui/LanguageCard';
import {
  getConstructById,
  getSentence,
  getTranslation,
} from '@/lib/constructs';
import type { UserProgress } from '@/lib/progress';
import { introduceConstruct } from '@/lib/progress';

type NewLessonProps = {
  constructId: number;
  progress: UserProgress;
  onComplete: (next: UserProgress) => void;
  onCancel: () => void;
};

export function NewLesson({
  constructId,
  progress,
  onComplete,
  onCancel,
}: NewLessonProps) {
  const construct = getConstructById(constructId);
  const [variation, setVariation] = useState(1);

  if (!construct) {
    return (
      <p className="text-center text-text-muted">構文が見つかりません。</p>
    );
  }

  const sentence = getSentence(constructId, variation);
  const isLast = variation >= 5;

  const finish = () => {
    onComplete(introduceConstruct(progress, constructId));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-blue hover:text-navy"
        >
          ← 戻る
        </button>
        <span className="text-sm font-semibold text-text-muted">
          バリエーション {variation} / 5
        </span>
      </div>

      <p className="mt-4 badge-amber">構文 #{construct.id}</p>
      <h1 className="mt-2 font-title text-navy">{construct.pattern_ja}</h1>
      <p className="mt-1 text-text-muted">{construct.pattern_en}</p>

      <div className="card mt-6">
        <p className="font-caption text-blue">日本語</p>
        <p className="mt-2 text-xl font-bold text-navy">
          {sentence?.translations.ja ?? construct.example_ja}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {progress.targetLanguages.map((code) => (
          <LanguageCard
            key={code}
            code={code}
            text={getTranslation(sentence, construct, code)}
            pronunciation={
              sentence?.pronunciation?.[code as 'zh' | 'ko'] ?? undefined
            }
          />
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {variation > 1 && (
          <button
            type="button"
            onClick={() => setVariation((v) => v - 1)}
            className="btn-secondary flex-1 min-h-[48px]"
          >
            前へ
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            onClick={() => setVariation((v) => v + 1)}
            className="btn-primary flex-1 min-h-[48px]"
          >
            次のバリエーション
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="btn-primary flex-1 min-h-[48px]"
          >
            学習完了 → 復習予約
          </button>
        )}
      </div>
    </div>
  );
}
