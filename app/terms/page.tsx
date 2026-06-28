import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 — PolyLingo',
};

export default function TermsPage() {
  return (
    <main className="section bg-bg">
      <div className="container-content mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-semibold text-blue hover:text-navy">
          ← LP に戻る
        </Link>
        <h1 className="mt-6 font-title text-navy">利用規約</h1>
        <p className="mt-6 text-text-muted">
          本ページは公開前のプレースホルダーです。正式版はリリース前に掲載します。
        </p>
      </div>
    </main>
  );
}
