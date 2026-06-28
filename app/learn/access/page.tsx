'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnAccessPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/learn-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      router.push('/learn');
      router.refresh();
      return;
    }

    setError('コードが正しくありません');
    setLoading(false);
  };

  return (
    <main className="section flex min-h-[100dvh] items-center bg-bg">
      <form onSubmit={submit} className="card mx-auto w-full max-w-sm">
        <h1 className="font-title text-navy">学習ページ</h1>
        <p className="mt-2 text-sm text-text-muted">
          アクセスコードを入力してください。
        </p>
        <label htmlFor="access-code" className="mt-6 block text-sm font-semibold text-navy">
          アクセスコード
        </label>
        <input
          id="access-code"
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
        />
        {error && (
          <p className="mt-2 text-sm text-fire" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !code}
          className="btn-primary mt-6 w-full min-h-[48px] disabled:opacity-50"
        >
          {loading ? '確認中…' : '入る'}
        </button>
      </form>
    </main>
  );
}
