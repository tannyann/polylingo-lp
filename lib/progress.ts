import type { LanguageCode } from '@/lib/copy';
import {
  getConstructsForMonth,
  getNextMonth1ConstructId,
} from '@/lib/constructs';
import {
  daysBetween,
  scheduleFirstReview,
  todayISO,
  type Grade,
  nextReviewAfterGrade,
} from '@/lib/srs';

export const PROGRESS_STORAGE_KEY = 'polylingo-progress-v1';

export type CardProgress = {
  constructId: number;
  variation: number;
  language: LanguageCode;
  learnedAt: string;
  intervalIndex: number;
  nextReviewAt: string;
  lastReviewedAt?: string;
  mastered: boolean;
};

export type UserProgress = {
  version: 1;
  startedAt: string;
  targetLanguages: LanguageCode[];
  introducedConstructs: number[];
  lastNewConstructDate?: string;
  cards: CardProgress[];
};

export function createInitialProgress(
  targetLanguages: LanguageCode[],
): UserProgress {
  return {
    version: 1,
    startedAt: todayISO(),
    targetLanguages,
    introducedConstructs: [],
    cards: [],
  };
}

export function loadProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProgress;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
}

export function cardKey(card: Pick<CardProgress, 'constructId' | 'variation' | 'language'>): string {
  return `${card.constructId}:${card.variation}:${card.language}`;
}

export function getStudyDay(progress: UserProgress, today = todayISO()): number {
  return daysBetween(progress.startedAt, today) + 1;
}

export function canLearnNewConstruct(
  progress: UserProgress,
  today = todayISO(),
): boolean {
  const nextId = getNextMonth1ConstructId(progress.introducedConstructs);
  if (nextId === null) return false;
  if (progress.lastNewConstructDate === today) return false;

  const allowed = Math.min(getStudyDay(progress, today), 30);
  return progress.introducedConstructs.length < allowed;
}

export function getDueCards(
  progress: UserProgress,
  today = todayISO(),
): CardProgress[] {
  return progress.cards.filter(
    (c) => !c.mastered && c.nextReviewAt <= today,
  );
}

export function getStats(progress: UserProgress, today = todayISO()) {
  const month1Total = getConstructsForMonth(1).length;
  const due = getDueCards(progress, today).length;
  const mastered = progress.cards.filter((c) => c.mastered).length;
  const studyDay = getStudyDay(progress, today);

  return {
    studyDay,
    constructsLearned: progress.introducedConstructs.length,
    month1Total,
    dueCount: due,
    masteredCount: mastered,
    canLearnNew: canLearnNewConstruct(progress, today),
    nextConstructId: getNextMonth1ConstructId(progress.introducedConstructs),
  };
}

export function introduceConstruct(
  progress: UserProgress,
  constructId: number,
  today = todayISO(),
): UserProgress {
  if (progress.introducedConstructs.includes(constructId)) return progress;

  const newCards: CardProgress[] = [];
  for (let variation = 1; variation <= 5; variation += 1) {
    for (const language of progress.targetLanguages) {
      newCards.push({
        constructId,
        variation,
        language,
        learnedAt: today,
        intervalIndex: 0,
        nextReviewAt: scheduleFirstReview(today),
        mastered: false,
      });
    }
  }

  return {
    ...progress,
    introducedConstructs: [...progress.introducedConstructs, constructId],
    lastNewConstructDate: today,
    cards: [...progress.cards, ...newCards],
  };
}

export function gradeCard(
  progress: UserProgress,
  card: CardProgress,
  grade: Grade,
  today = todayISO(),
): UserProgress {
  const key = cardKey(card);
  const result = nextReviewAfterGrade(card.intervalIndex, grade, today);

  return {
    ...progress,
    cards: progress.cards.map((c) =>
      cardKey(c) === key
        ? {
            ...c,
            intervalIndex: result.intervalIndex,
            nextReviewAt: result.nextReviewAt,
            lastReviewedAt: today,
            mastered: result.mastered,
          }
        : c,
    ),
  };
}

export function exportProgress(progress: UserProgress): string {
  return JSON.stringify(progress, null, 2);
}

export function importProgress(json: string): UserProgress | null {
  try {
    const parsed = JSON.parse(json) as UserProgress;
    if (parsed.version !== 1 || !Array.isArray(parsed.targetLanguages)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
