'use client';

import { useCallback, useEffect, useState } from 'react';
import type { LanguageCode } from '@/lib/copy';
import {
  clearProgress,
  createInitialProgress,
  loadProgress,
  saveProgress,
  type UserProgress,
} from '@/lib/progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  const init = useCallback((languages: LanguageCode[]) => {
    const next = createInitialProgress(languages);
    saveProgress(next);
    setProgress(next);
  }, []);

  const update = useCallback((fn: (p: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const next = fn(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearProgress();
    setProgress(null);
  }, []);

  return { progress, ready, init, update, reset };
}
