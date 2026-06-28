'use client';

import { motion } from 'framer-motion';
import { Accordion } from '@/components/ui/Accordion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { trackEvent } from '@/lib/analytics';
import type { PageCopy } from '@/lib/copy';

type FAQProps = {
  faq: PageCopy['faq'];
};

export default function FAQ({ faq }: FAQProps) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-bg">
      <div className="container-content">
        <motion.h2
          id="faq-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="font-title text-balance text-center text-navy"
        >
          よくある質問
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto mt-12 max-w-2xl"
        >
          <Accordion
            items={faq.items}
            onItemOpen={(question) =>
              trackEvent('faq_open', { question })
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
