'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import type { PageCopy } from '@/lib/copy';

type ProblemProps = {
  problem: PageCopy['problem'];
};

export default function Problem({ problem }: ProblemProps) {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="section bg-bg"
    >
      <div className="container-content">
        <motion.h2
          id="problem-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="font-title text-balance text-center text-navy"
        >
          {problem.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {problem.cards.map((card) => (
            <motion.article
              key={card.number}
              variants={fadeUp}
              className="card flex flex-col"
            >
              <span className="font-caption text-blue">{card.number}</span>
              <h3 className="mt-3 text-lg font-bold leading-snug text-navy">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-text-muted">{card.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
