'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { PageCopy } from '@/lib/copy';

type FounderStoryProps = {
  founder: PageCopy['founder'];
};

export default function FounderStory({ founder }: FounderStoryProps) {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="section bg-lightblue/30"
    >
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="founder-title" className="font-title text-navy">
            {founder.title}
          </h2>

          <div className="mt-8 card text-left">
            <p className="font-body leading-relaxed text-text">
              {founder.body}
            </p>
            <p className="mt-6 border-t border-border pt-6 text-sm text-text-muted">
              {founder.footer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
