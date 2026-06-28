'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { trackEvent } from '@/lib/analytics';
import {
  DEMO_LANGUAGE_CODES,
  getAllDemoConstructs,
  type DemoConstructData,
} from '@/lib/constructs';
import { LanguageCard } from '@/components/ui/LanguageCard';
import type { PageCopy } from '@/lib/copy';

type InteractiveDemoProps = {
  demo: PageCopy['demo'];
};

const tabFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function InteractiveDemo({ demo }: InteractiveDemoProps) {
  const demoConstructs = useMemo(
    () => getAllDemoConstructs(demo.constructs),
    [demo.constructs],
  );

  const defaultIndex = useMemo(() => {
    const idx = demoConstructs.findIndex(
      (item) => item.construct.pattern_ja === demo.defaultConstruct,
    );
    return idx >= 0 ? idx : 0;
  }, [demoConstructs, demo.defaultConstruct]);

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const active = demoConstructs[activeIndex];

  if (!active) return null;

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="section bg-lightblue/40"
    >
      <div className="container-content">
        <motion.h2
          id="demo-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="font-title text-balance text-center text-navy"
        >
          {demo.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:justify-center md:overflow-visible md:pb-0"
          role="tablist"
          aria-label="構文を選択"
        >
          {demoConstructs.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.construct.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="demo-panel"
                id={`demo-tab-${item.construct.id}`}
                onClick={() => {
                  setActiveIndex(index);
                  trackEvent('demo_interact', {
                    construct: item.construct.pattern_ja,
                  });
                }}
                className={`shrink-0 snap-start rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:ring-navy min-h-[44px] ${
                  isActive
                    ? 'bg-navy text-white shadow-card'
                    : 'bg-white text-navy hover:bg-white/80'
                }`}
              >
                {item.construct.pattern_ja}
              </button>
            );
          })}
        </motion.div>

        <div
          id="demo-panel"
          role="tabpanel"
          aria-labelledby={`demo-tab-${active.construct.id}`}
          className="mt-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.construct.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabFade}
            >
              <DemoPanel data={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DemoPanel({ data }: { data: DemoConstructData }) {
  const { construct, sentence, translations, exampleJa, hasFullTranslations } =
    data;

  return (
    <div>
      <div className="text-center">
        <p className="font-caption text-blue">
          構文 #{construct.id}
        </p>
        <p className="mt-2 text-2xl font-bold text-navy md:text-3xl">
          {construct.pattern_ja}
        </p>
        <p className="mt-1 text-sm text-text-muted">{construct.pattern_en}</p>
        <p className="mt-4 text-lg text-navy">
          例: <span className="font-semibold">{exampleJa}</span>
        </p>
        {!hasFullTranslations && (
          <p className="mt-2 text-xs text-text-muted">
            ※ この構文の8言語例文はカリキュラム後半（Month 3）に収録予定です
          </p>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_LANGUAGE_CODES.map((code) => (
          <LanguageCard
            key={code}
            code={code}
            text={translations[code]}
            pronunciation={sentence?.pronunciation?.[code as 'zh' | 'ko']}
            onPlayAudio={() => {
              /* Phase 2: audio playback */
            }}
          />
        ))}
      </div>
    </div>
  );
}
