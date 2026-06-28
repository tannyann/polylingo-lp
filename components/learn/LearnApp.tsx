'use client';

import { useState } from 'react';
import { LearnHome } from '@/components/learn/LearnHome';
import { LearnOnboarding } from '@/components/learn/LearnOnboarding';
import { NewLesson } from '@/components/learn/NewLesson';
import { ReviewSession } from '@/components/learn/ReviewSession';
import { useProgress } from '@/components/learn/useProgress';
import { saveProgress } from '@/lib/progress';

type Screen = 'home' | 'lesson' | 'review';

export function LearnApp() {
  const { progress, ready, init, update, reset } = useProgress();
  const [screen, setScreen] = useState<Screen>('home');
  const [lessonId, setLessonId] = useState<number | null>(null);

  if (!ready) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-text-muted">
        読み込み中…
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="section">
        <LearnOnboarding onStart={init} />
      </div>
    );
  }

  if (screen === 'lesson' && lessonId !== null) {
    return (
      <div className="section pb-[max(2rem,env(safe-area-inset-bottom))]">
        <NewLesson
          constructId={lessonId}
          progress={progress}
          onComplete={(next) => {
            saveProgress(next);
            update(() => next);
            setScreen('home');
            setLessonId(null);
          }}
          onCancel={() => {
            setScreen('home');
            setLessonId(null);
          }}
        />
      </div>
    );
  }

  if (screen === 'review') {
    return (
      <div className="section pb-[max(2rem,env(safe-area-inset-bottom))]">
        <ReviewSession
          progress={progress}
          onComplete={(next) => {
            saveProgress(next);
            update(() => next);
            setScreen('home');
          }}
          onCancel={() => setScreen('home')}
        />
      </div>
    );
  }

  return (
    <div className="section pb-[max(2rem,env(safe-area-inset-bottom))]">
      <LearnHome
        progress={progress}
        onStartLesson={(id) => {
          setLessonId(id);
          setScreen('lesson');
        }}
        onStartReview={() => setScreen('review')}
        onReset={reset}
      />
    </div>
  );
}
