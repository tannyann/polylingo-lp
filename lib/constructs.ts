import type { LanguageCode } from '@/lib/copy';
import constructsData from '@/data/constructs_month1.json';

export type Construct = {
  id: number;
  pattern_ja: string;
  pattern_en: string;
  example_ja: string;
  example_en: string;
  month: number;
  week: number;
  category: string;
  cefr: string;
};

export type SentenceTranslations = Record<LanguageCode | 'ja', string>;

export type Sentence = {
  id: string;
  construct_id: number;
  variation: number;
  translations: SentenceTranslations;
  pronunciation?: Partial<Record<'zh' | 'ko', string>>;
};

type ConstructsFile = {
  constructs: Construct[];
  sentences_month1: Sentence[];
};

const data = constructsData as ConstructsFile;

export const DEMO_LANGUAGE_CODES: LanguageCode[] = [
  'en',
  'de',
  'zh',
  'ko',
  'es',
  'pt',
  'it',
  'fr',
];

export type DemoConstructData = {
  construct: Construct;
  sentence: Sentence | null;
  translations: Record<LanguageCode, string>;
  exampleJa: string;
  hasFullTranslations: boolean;
};

export function getConstructByPattern(patternJa: string): Construct | undefined {
  return data.constructs.find((c) => c.pattern_ja === patternJa);
}

export function getPrimarySentence(constructId: number): Sentence | undefined {
  return data.sentences_month1.find(
    (s) => s.construct_id === constructId && s.variation === 1,
  );
}

export function getDemoConstructData(patternJa: string): DemoConstructData | null {
  const construct = getConstructByPattern(patternJa);
  if (!construct) return null;

  const sentence = getPrimarySentence(construct.id) ?? null;

  const translations = DEMO_LANGUAGE_CODES.reduce(
    (acc, code) => {
      if (sentence?.translations[code]) {
        acc[code] = sentence.translations[code];
      } else if (code === 'en') {
        acc[code] = construct.example_en;
      } else {
        acc[code] = '';
      }
      return acc;
    },
    {} as Record<LanguageCode, string>,
  );

  return {
    construct,
    sentence,
    translations,
    exampleJa: sentence?.translations.ja ?? construct.example_ja,
    hasFullTranslations: sentence !== null,
  };
}

export function getAllDemoConstructs(patterns: string[]): DemoConstructData[] {
  return patterns
    .map((pattern) => getDemoConstructData(pattern))
    .filter((item): item is DemoConstructData => item !== null);
}

export function getConstructById(id: number): Construct | undefined {
  return data.constructs.find((c) => c.id === id);
}

export function getConstructsForMonth(month: number): Construct[] {
  return data.constructs
    .filter((c) => c.month === month)
    .sort((a, b) => a.id - b.id);
}

export function getSentencesForConstruct(constructId: number): Sentence[] {
  return data.sentences_month1
    .filter((s) => s.construct_id === constructId)
    .sort((a, b) => a.variation - b.variation);
}

export function getSentence(
  constructId: number,
  variation: number,
): Sentence | undefined {
  return data.sentences_month1.find(
    (s) => s.construct_id === constructId && s.variation === variation,
  );
}

export function getNextMonth1ConstructId(introduced: number[]): number | null {
  const month1 = getConstructsForMonth(1);
  const next = month1.find((c) => !introduced.includes(c.id));
  return next?.id ?? null;
}

export function getTranslation(
  sentence: Sentence | undefined,
  construct: Construct,
  code: LanguageCode,
): string {
  if (sentence?.translations[code]) return sentence.translations[code];
  if (code === 'en') return construct.example_en;
  return '';
}
