import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学習システム — PolyLingo',
  description:
    'エビングハウスの忘却曲線に基づく Spaced Repetition System (SRS)。Day 1 / 3 / 7 / 16 / 35 の最適復習タイミングで記憶を定着させます。',
};

export default function LearningSystemPage() {
  return (
    <main className="section bg-bg">
      <div className="container-content mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-semibold text-blue hover:text-navy"
        >
          ← LP に戻る
        </Link>

        <h1 className="mt-6 font-title text-navy">
          学習システムの詳細
        </h1>

        <div className="mt-8 space-y-6 font-body text-text">
          <p>
            PolyLingo のカリキュラムは、エビングハウスの忘却曲線に基づく
            Spaced Repetition System (SRS) を中核に据えています。
          </p>

          <section>
            <h2 className="text-lg font-bold text-navy">復習タイミング</h2>
            <p className="mt-2 text-text-muted">
              各 (構文, 言語) ペアは独立して管理され、以下の間隔で自動復習が
              スケジュールされます。
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-text-muted">
              <li>Day 1 — 初回学習の翌日</li>
              <li>Day 3 — 短期定着</li>
              <li>Day 7 — 1週間後</li>
              <li>Day 16 — 中期定着</li>
              <li>Day 35 — 長期定着</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">1日の学習量</h2>
            <p className="mt-2 text-text-muted">
              1日1構文 × 5バリエーション。90日で90構文（CEFR B1
              相当）を目指す設計です。MVP では Month 1（30構文）から開始します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy">アルゴリズム</h2>
            <p className="mt-2 text-text-muted">
              SM-2 ベースの復習スケジューリング。正答率に応じて次回復習日が
              調整され、無駄な反復を減らしながら記憶定着を最大化します。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
