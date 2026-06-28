'use client';

import Link from 'next/link';
import { getStats, type UserProgress } from '@/lib/progress';
import { getConstructById } from '@/lib/constructs';
import { todayISO } from '@/lib/srs';

type LearnHomeProps = {
  progress: UserProgress;
  onStartLesson: (constructId: number) => void;
  onStartReview: () => void;
  onReset: () => void;
};

export function LearnHome({
  progress,
  onStartLesson,
  onStartReview,
  onReset,
}: LearnHomeProps) {
  const today = todayISO();
  const stats = getStats(progress, today);
  const nextConstruct = stats.nextConstructId
    ? getConstructById(stats.nextConstructId)
    : null;

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="badge-amber">Day {stats.studyDay}</p>
          <h1 className="mt-3 font-title text-navy">今日の学習</h1>
        </div>
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold text-blue hover:text-navy"
        >
          LP
        </Link>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <StatCard label="学習済み構文" value={`${stats.constructsLearned} / ${stats.month1Total}`} />
        <StatCard label="復習待ち" value={String(stats.dueCount)} highlight={stats.dueCount > 0} />
        <StatCard label="定着済みカード" value={String(stats.masteredCount)} />
        <StatCard label="学習言語" value={String(progress.targetLanguages.length)} />
      </dl>

      <div className="mt-8 space-y-3">
        {stats.dueCount > 0 && (
          <button
            type="button"
            onClick={onStartReview}
            className="btn-primary w-full min-h-[48px]"
          >
            復習を始める（{stats.dueCount}枚）
          </button>
        )}

        {stats.canLearnNew && nextConstruct && (
          <button
            type="button"
            onClick={() => onStartLesson(nextConstruct.id)}
            className={`w-full min-h-[48px] rounded-full px-6 py-3 font-semibold transition ${
              stats.dueCount > 0
                ? 'btn-secondary'
                : 'btn-primary'
            }`}
          >
            新しい構文: {nextConstruct.pattern_ja}
          </button>
        )}

        {!stats.canLearnNew && stats.dueCount === 0 && (
          <div className="card text-center">
            <p className="font-semibold text-navy">今日は完了です</p>
            <p className="mt-2 text-sm text-text-muted">
              {stats.constructsLearned >= stats.month1Total
                ? 'Month 1 の全構文を学習しました。'
                : '明日、新しい構文が解放されます。'}
            </p>
          </div>
        )}

        {!stats.canLearnNew &&
          stats.dueCount === 0 &&
          stats.constructsLearned < stats.month1Total &&
          progress.lastNewConstructDate === today && (
            <p className="text-center text-sm text-text-muted">
              今日の新規構文は学習済みです。
            </p>
          )}
      </div>

      <details className="mt-10 text-sm text-text-muted">
        <summary className="cursor-pointer font-semibold text-navy">
          データ管理
        </summary>
        <div className="mt-3 space-y-2">
          <p>開始日: {progress.startedAt}</p>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  '進捗をリセットしますか？この操作は取り消せません。',
                )
              ) {
                onReset();
              }
            }}
            className="text-fire underline"
          >
            進捗をリセット
          </button>
        </div>
      </details>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="card !p-4">
      <dt className="text-xs font-semibold text-text-muted">{label}</dt>
      <dd
        className={`mt-1 text-2xl font-bold ${highlight ? 'text-blue' : 'text-navy'}`}
      >
        {value}
      </dd>
    </div>
  );
}
