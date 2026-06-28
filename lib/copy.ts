/**
 * PolyLingo LP copy — variant A (recommended).
 * Structured page data for section components (Hero, Problem, …).
 * @see docs/05_LP_SPEC.md Section 3
 */

export const COPY_VARIANT = 'A' as const;

export type CopyVariant = typeof COPY_VARIANT;

export type LanguageCode = 'en' | 'de' | 'zh' | 'ko' | 'es' | 'pt' | 'it' | 'fr';

export type LanguagePill = {
  code: LanguageCode;
  label: string;
};

export const LANGUAGE_PILLS: LanguagePill[] = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'zh', label: 'ZH' },
  { code: 'ko', label: 'KO' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
];

/** A/B test candidates — active variant is COPY_VARIANT */
export const COPY_VARIANTS = {
  hero: {
    headline: {
      A: '30構文で、8言語が話せる。',
      B: '言語の壁を、一つの構文軸で結ぶ。',
      C: '8言語を、3ヶ月で。Duolingo の次へ。',
      D: 'あなたの生活を、そのまま教材に。',
    },
    subheadline: {
      A: 'Duolingoの次に行きたい、本気の学習者のためのアプリ。',
      B: 'ポリグロット志向のあなたへ。世界初の多言語同時学習プラットフォーム。',
    },
    cta: {
      A: '事前登録する → 早期アクセス枠を確保',
      B: '無料で事前登録(1分)',
      C: 'リリース通知を受け取る',
    },
  },
} as const;

export type MetaCopy = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
};

export type HeroCopy = {
  badge: string;
  headline: string;
  subheadline: string;
  cta: string;
  ctaHref: string;
};

export type ProblemCard = {
  number: string;
  title: string;
  description: string;
};

export type SolutionPillar = {
  number: string;
  title: string;
  description: string;
};

export type ComingFeature = {
  badge: string;
  title: string;
  description: string;
};

export type ComparisonRow = {
  label: string;
  duolingo: string;
  polylingo: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PageCopy = {
  meta: MetaCopy;
  hero: HeroCopy;
  problem: {
    title: string;
    cards: ProblemCard[];
  };
  solution: {
    title: string;
    pillars: SolutionPillar[];
  };
  demo: {
    title: string;
    defaultConstruct: string;
    constructs: string[];
  };
  curriculum: {
    title: string;
    stats: { label: string; value: string }[];
    detailLink: string;
    detailHref: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    rows: ComparisonRow[];
  };
  comingFeatures: {
    title: string;
    features: ComingFeature[];
  };
  founder: {
    title: string;
    body: string;
    footer: string;
  };
  faq: {
    items: FaqItem[];
  };
  signup: {
    title: string;
    subtitle: string;
    submitLabel: string;
    successMessage: string;
    privacyNote: string;
    fields: {
      email: string;
      motherTongue: string;
      targetLanguages: string;
      message: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
    links: { label: string; href: string }[];
  };
};

export const SIGNUP_FORM_ID = 'signup';

export const pages: Record<'ja', PageCopy> = {
  ja: {
    meta: {
      title: 'PolyLingo - 30構文で8言語が話せる多言語学習アプリ',
      description:
        'Duolingoの次に行きたい本気の学習者のための言語学習アプリ。30のコア構文で8言語(英・独・西・葡・伊・仏・中・韓)を横断学習。事前登録受付中。',
      keywords: ['多言語学習', 'ポリグロット', 'Duolingo 次', '30構文', '8言語'],
      ogTitle: 'PolyLingo - 30構文で8言語',
      ogDescription:
        'Duolingoの次に行きたい本気の学習者のためのアプリ',
    },
    hero: {
      badge: '2026年12月リリース予定',
      headline: COPY_VARIANTS.hero.headline.A,
      subheadline: COPY_VARIANTS.hero.subheadline.A,
      cta: COPY_VARIANTS.hero.cta.A,
      ctaHref: `#${SIGNUP_FORM_ID}`,
    },
    problem: {
      title: '多言語学習で、こんな経験ありませんか?',
      cards: [
        {
          number: '01',
          title: '「1言語1アプリの罠」',
          description:
            'Duolingoを8回開いて、頭の中で比較してませんか?',
        },
        {
          number: '02',
          title: '「3年やっても話せない」',
          description:
            '単語を覚えても、文を組み立てる骨格がないと話せない。',
        },
        {
          number: '03',
          title: '「例文がつまらない」',
          description:
            '"The horse is wearing a hat." が記憶に残ると思いますか?',
        },
      ],
    },
    solution: {
      title: 'PolyLingo は、根本から違う。',
      pillars: [
        {
          number: '01',
          title: '30/90 コア構文エンジン',
          description:
            '日常会話の8〜9割は約30の構文。骨格に単語を入れ替えるだけで無限の表現。',
        },
        {
          number: '02',
          title: '8言語横断スワイプUI',
          description:
            '1つの構文を横スワイプで瞬時に8言語比較。世界初の体験。',
        },
        {
          number: '03',
          title: '脳構造適応型 解説切替',
          description:
            '漢字圏は日本語で、欧州語は英語で解説。あなたの脳に最適化。',
        },
      ],
    },
    demo: {
      title: '実際に体験してみる',
      defaultConstruct: '〜が欲しい',
      constructs: [
        '〜が欲しい',
        '〜できます',
        '〜に行きます',
        '〜が好きです',
        'もし〜なら',
      ],
    },
    curriculum: {
      title: '忘却曲線に逆らう、最も効率的な学習',
      stats: [
        { label: '1日1構文 × 5バリエーション', value: '着実な進歩' },
        {
          label: 'Day 1, 3, 7, 16, 35',
          value: '最適タイミングで自動復習',
        },
        { label: '90日 = 90構文', value: 'CEFR B1相当の到達目標' },
      ],
      detailLink: '学習システムの詳細を見る →',
      detailHref: '/learning-system',
    },
    comparison: {
      title: 'Duolingo との違い',
      subtitle:
        'Duolingo を否定しているわけではありません。次のステージへ行きたい人のためのアプリです。',
      rows: [
        {
          label: '学習アプローチ',
          duolingo: '単語・フレーズ中心',
          polylingo: '30構文エンジン',
        },
        {
          label: '対応言語',
          duolingo: '40言語以上',
          polylingo: '8言語横断比較',
        },
        {
          label: '解説言語',
          duolingo: '固定（主に英語）',
          polylingo: '脳構造適応型（日/英 自動切替）',
        },
        {
          label: 'ゲーミフィケーション',
          duolingo: '損失回避型（ハート・リーグ）',
          polylingo: '達成解除型（連続学習で機能解放）',
        },
        {
          label: 'ターゲット',
          duolingo: 'マス層・カジュアル',
          polylingo: 'ポリグロット志向・本気層',
        },
        {
          label: '価格',
          duolingo: 'フリーミアム',
          polylingo: 'フリーミアム（Month 1 無料）',
        },
        {
          label: 'AI機能',
          duolingo: 'Duolingo Max',
          polylingo: 'Phase 2（ビデオ通話・日記変換）',
        },
      ],
    },
    comingFeatures: {
      title: 'さらに進化していくアプリ',
      features: [
        {
          badge: 'Phase 2',
          title: 'AI ビデオ通話',
          description:
            '7日連続学習でアンロック。AI と8言語で会話練習。',
        },
        {
          badge: 'Phase 2',
          title: '日記→構文変換',
          description:
            '今日あった出来事を、AIが30構文に変換して学習素材化。',
        },
        {
          badge: 'Phase 2',
          title: 'ネイティブ会話交換',
          description: '学習者同士のテキスト/音声マッチング。',
        },
      ],
    },
    founder: {
      title: 'なぜ作っているのか',
      body: '私自身、Duolingoで複数言語のストリークを3,500日超え続けながら、「3年やっても話せない」壁に何度もぶつかりました。単語は知っているのに文が組み立てられない。8つのアプリを行き来して、頭の中で比較する日々。PolyLingo は、その分散した学習体験を1つの構文軸に統合し、本気で多言語を話したい人のために作っています。',
      footer: '事前登録の方には開発進捗を月1で配信します。',
    },
    faq: {
      items: [
        {
          question: 'リリースはいつですか?',
          answer: '2026年12月を目標に iOS 版をリリース予定です。',
        },
        {
          question: '価格はいくらになる予定ですか?',
          answer:
            '基本機能は無料、Pro プランは月額制を予定しています。詳細はリリース前にご案内します。',
        },
        {
          question: 'Android 版は出ますか?',
          answer:
            'MVP は iOS 専念です。Android 版は Phase 2 以降で検討します。',
        },
        {
          question: 'どんな言語が学べますか?',
          answer:
            '英語・ドイツ語・中国語(簡体)・韓国語・スペイン語・ポルトガル語・イタリア語・フランス語の8言語です。',
        },
        {
          question: 'なぜ8言語に絞ったのですか?',
          answer:
            '1構文を横断比較する体験の質を保つため、MVP では8言語に集中しています。',
        },
        {
          question: '完全無料でも使えますか?',
          answer:
            'Month 1 (30構文) は無料で学習できます。Pro プランで追加機能を提供予定です。',
        },
        {
          question: '事前登録のメリットは?',
          answer:
            'リリース時に1ヶ月無料の Pro プランをプレゼント。開発進捗も月1でお届けします。',
        },
        {
          question: '個人情報はどう扱われますか?',
          answer:
            'メールアドレスは開発進捗とリリース通知のみに使用します。いつでも配信停止できます。',
        },
        {
          question: '30構文で本当に話せるようになりますか?',
          answer:
            '日常会話の8〜9割は約30の構文パターンで構成されます。骨格を身につけた上で語彙を広げる設計です。',
        },
        {
          question: '既に Duolingo を使っていますが、移行できますか?',
          answer:
            'Duolingo で培った語彙はそのまま活かせます。PolyLingo は「次のステージ」として設計しています。',
        },
      ],
    },
    signup: {
      title: '早期アクセス枠を確保する',
      subtitle:
        '事前登録の方には、リリース時に 1ヶ月無料の Pro プランをプレゼントします。',
      submitLabel: '事前登録する',
      successMessage: 'メールを送信しました。確認してください',
      privacyNote:
        '登録すると、PolyLingo の開発進捗とリリース通知をお送りします。いつでも解除できます。',
      fields: {
        email: 'メールアドレス',
        motherTongue: '母語',
        targetLanguages: '学習したい言語（任意）',
        message: '一言メッセージ（任意）',
      },
    },
    footer: {
      tagline: '30構文 × 8言語 — ポリグロットのための言語学習',
      copyright: '© 2026 PolyLingo. All rights reserved.',
      links: [
        { label: '学習を始める', href: '/learn' },
        { label: 'プライバシーポリシー', href: '/privacy' },
        { label: '利用規約', href: '/terms' },
        { label: 'お問い合わせ', href: 'mailto:hello@polylingo.app' },
        { label: 'Twitter (X)', href: 'https://x.com/polylingo' },
        { label: '創業者ブログ', href: 'https://note.com/' },
      ],
    },
  },
};

export function getPageCopy(): PageCopy {
  return pages.ja;
}
