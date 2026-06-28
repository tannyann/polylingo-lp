import type { Metadata } from 'next';
import { LearnApp } from '@/components/learn/LearnApp';

export const metadata: Metadata = {
  title: '学習',
  description: 'PolyLingo Month 1 — 構文ベース多言語学習',
  robots: { index: false, follow: false },
};

export default function LearnPage() {
  return (
    <main id="main-content" className="min-h-[100dvh] bg-bg">
      <LearnApp />
    </main>
  );
}
