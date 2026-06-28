/** Days after a review when the card is due again (Day 1 / 3 / 7 / 16 / 35). */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 16, 35] as const;

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(`${from}T12:00:00`);
  const b = new Date(`${to}T12:00:00`);
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000);
}

export function scheduleFirstReview(learnedAt: string): string {
  return addDays(learnedAt, REVIEW_INTERVALS_DAYS[0]);
}

export function nextReviewAfterGrade(
  intervalIndex: number,
  grade: Grade,
  reviewedAt: string,
): { intervalIndex: number; nextReviewAt: string; mastered: boolean } {
  let nextIndex = intervalIndex;

  switch (grade) {
    case 'again':
      nextIndex = 0;
      break;
    case 'hard':
      break;
    case 'good':
      nextIndex = Math.min(intervalIndex + 1, REVIEW_INTERVALS_DAYS.length - 1);
      break;
    case 'easy':
      nextIndex = Math.min(intervalIndex + 2, REVIEW_INTERVALS_DAYS.length - 1);
      break;
  }

  const atMax = nextIndex >= REVIEW_INTERVALS_DAYS.length - 1;
  const mastered = atMax && (grade === 'good' || grade === 'easy');

  if (mastered) {
    return { intervalIndex: nextIndex, nextReviewAt: reviewedAt, mastered: true };
  }

  const days = REVIEW_INTERVALS_DAYS[nextIndex];
  return {
    intervalIndex: nextIndex,
    nextReviewAt: addDays(reviewedAt, days),
    mastered: false,
  };
}
