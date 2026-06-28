'use client';

import { useMemo, useState } from 'react';
import { LANGUAGE_LABELS } from '@/lib/languages';
import {
  getConstructById,
  getSentence,
  getTranslation,
} from '@/lib/constructs';
import {
  getDueCards,
  gradeCard,
  type UserProgress,
} from '@/lib/progress';
import type { Grade } from '@/lib/srs';
import { todayISO } from '@/lib/srs';

type ReviewSessionProps = {
  progress: UserProgress;
  onComplete: (next: UserProgress) => void;
  onCancel: () => void;
};

export function ReviewSession({
  progress,
  onComplete,
  onCancel,
}: ReviewSessionProps) {
  const today = todayISO();
  const queue = useMemo(() => getDueCards(progress, today), [progress, today]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [working, setWorking] = useState(progress);

  const card = queue[index];
  const total = queue.length;

  if (!card) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="font-semibold text-navy">復習はありません</p>
        <button type="button" onClick={onCancel} className="btn-primary mt-6">
          ホームへ
        </button>
      </div>
    );
  }

  const construct = getConstructById(card.constructId);
  const sentence = getSentence(card.constructId, card.variation);

  if (!construct) {
    return null;
  }

  const answer = getTranslation(sentence, construct, card.language);

  const handleGrade = (grade: Grade) => {
    const next = gradeCard(working, card, grade, today);
    setWorking(next);

    if (index + 1 >= total) {
      onComplete(next);
      return;
    }

    setIndex((i) => i + 1);
    setRevealed(false);
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-blue hover:text-navy"
        >
          ← 戻る
        </button>
        <span className="text-sm font-semibold text-text-muted">
          {index + 1} / {total}
        </span>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        {construct.pattern_ja} · バリエーション {card.variation}
      </p>

      <div className="card mt-4">
        <p className="font-caption text-blue">日本語 → {LANGUAGE_LABELS[card.language]}</p>
        <p className="mt-3 text-xl font-bold text-navy">
          {sentence?.translations.ja ?? construct.example_ja}
        </p>
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="btn-primary mt-6 w-full min-h-[48px]"
        >
          答えを見る
        </button>
      ) : (
        <>
          <div className="card mt-4 border-2 border-blue/20">
            <p className="text-lg font-semibold text-navy">{answer}</p>
            {sentence?.pronunciation?.[card.language as 'zh' | 'ko'] && (
              <p className="mt-1 text-sm text-text-muted">
                {sentence.pronunciation[card.language as 'zh' | 'ko']}
              </p>
            )}
          </div>

          <p className="mt-6 text-center text-sm font-semibold text-navy">
            覚えていましたか？
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <GradeButton grade="again" label="もう一度" onClick={handleGrade} />
            <GradeButton grade="hard" label="難しい" onClick={handleGrade} />
            <GradeButton grade="good" label="良い" onClick={handleGrade} />
            <GradeButton grade="easy" label="簡単" onClick={handleGrade} />
          </div>
        </>
      )}
    </div>
  );
}

function GradeButton({
  grade,
  label,
  onClick,
}: {
  grade: Grade;
  label: string;
  onClick: (grade: Grade) => void;
}) {
  const styles: Record<Grade, string> = {
    again: 'border-fire/30 bg-fire/5 text-fire hover:bg-fire/10',
    hard: 'border-amber/30 bg-amber/5 text-amber hover:bg-amber/10',
    good: 'border-blue/30 bg-lightblue text-navy hover:bg-blue/10',
    easy: 'border-success/30 bg-success/5 text-success hover:bg-success/10',
  };

  return (
    <button
      type="button"
      onClick={() => onClick(grade)}
      className={`min-h-[48px] rounded-xl border px-3 py-3 text-sm font-semibold transition ${styles[grade]}`}
    >
      {label}
    </button>
  );
}
