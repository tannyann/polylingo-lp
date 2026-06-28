'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import type { PageCopy } from '@/lib/copy';

type SolutionProps = {
  solution: PageCopy['solution'];
};

const PILLAR_ICONS = [
  (
    <svg
      key="syntax"
      aria-hidden="true"
      className="h-6 w-6 text-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h10M4 18h14"
      />
    </svg>
  ),
  (
    <svg
      key="swipe"
      aria-hidden="true"
      className="h-6 w-6 text-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7h12m0 0-4-4m4 4-4 4M16 17H4m0 0 4 4m-4-4 4-4"
      />
    </svg>
  ),
  (
    <svg
      key="brain"
      aria-hidden="true"
      className="h-6 w-6 text-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.59.659H9.06a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4.5"
      />
    </svg>
  ),
];

function SyntaxMiniVisual() {
  return (
    <div
      className="rounded-xl bg-lightblue p-5"
      aria-hidden="true"
    >
      <p className="font-caption text-blue">構文 #10</p>
      <div className="mt-3 space-y-2 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-swap px-2 py-1 font-semibold text-white">
            コーヒー
          </span>
          <span className="text-navy">が欲しい</span>
        </div>
        <div className="flex items-center gap-2 opacity-70">
          <span className="rounded-md border border-swap/40 bg-white px-2 py-1 font-semibold text-swap">
            水
          </span>
          <span className="text-navy">が欲しい</span>
        </div>
      </div>
    </div>
  );
}

function SwipeMiniVisual() {
  const langs = ['EN', 'DE', 'ZH', 'KO'];
  return (
    <div
      className="rounded-xl bg-lightblue p-5"
      aria-hidden="true"
    >
      <p className="text-center font-caption text-blue">横スワイプ</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        {langs.map((lang, i) => (
          <span
            key={lang}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${
              i === 1
                ? 'bg-navy text-white shadow-card'
                : 'bg-white/80 text-navy'
            }`}
          >
            {lang}
          </span>
        ))}
        <span className="text-blue">→</span>
      </div>
      <p className="mt-3 text-center text-xs text-text-muted">
        1構文 · 8言語を瞬時比較
      </p>
    </div>
  );
}

function AdaptMiniVisual() {
  return (
    <div
      className="rounded-xl bg-lightblue p-5"
      aria-hidden="true"
    >
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
          <span className="font-semibold text-navy">中文</span>
          <span className="rounded-full bg-navy px-2 py-0.5 text-xs font-semibold text-white">
            日本語解説
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
          <span className="font-semibold text-navy">Español</span>
          <span className="rounded-full bg-blue px-2 py-0.5 text-xs font-semibold text-white">
            English
          </span>
        </div>
      </div>
    </div>
  );
}

const MINI_VISUALS = [SyntaxMiniVisual, SwipeMiniVisual, AdaptMiniVisual];

export default function Solution({ solution }: SolutionProps) {
  return (
    <section
      id="solution"
      aria-labelledby="solution-title"
      className="section bg-white"
    >
      <div className="container-content">
        <motion.h2
          id="solution-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="font-title text-balance text-center text-navy"
        >
          {solution.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 flex flex-col gap-8"
        >
          {solution.pillars.map((pillar, index) => {
            const MiniVisual = MINI_VISUALS[index];
            return (
              <motion.article
                key={pillar.number}
                variants={fadeUp}
                className="card grid gap-6 md:grid-cols-2 md:items-center md:gap-10"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-lightblue md:text-4xl">
                      {pillar.number}
                    </span>
                    {PILLAR_ICONS[index]}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-navy md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-text-muted">{pillar.description}</p>
                </div>
                {MiniVisual && <MiniVisual />}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
