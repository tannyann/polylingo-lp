'use client';

import { motion } from 'framer-motion';
import { LANGUAGE_PILLS, type HeroCopy } from '@/lib/copy';
import { LanguagePill } from '@/components/ui/LanguagePill';
import { trackEvent } from '@/lib/analytics';

type HeroProps = {
  hero: HeroCopy;
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const pillContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const pillItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export default function Hero({ hero }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative flex min-h-screen items-center bg-hero-gradient px-6 py-16 text-white md:min-h-[90vh] md:px-8 md:py-20"
    >
      <div className="container-content grid w-full gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="flex flex-col"
        >
          <motion.span variants={fadeUp} className="badge-amber w-fit">
            {hero.badge}
          </motion.span>

          <motion.h1
            id="hero-headline"
            variants={fadeUp}
            className="mt-6 font-display text-balance"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-lightblue md:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <a
              href={hero.ctaHref}
              onClick={() => trackEvent('hero_cta_click')}
              className="btn inline-flex w-full rounded-full bg-white px-6 py-3 font-semibold text-navy shadow-card transition duration-200 hover:scale-105 hover:shadow-card-hover focus-visible:ring-white sm:w-auto"
            >
              {hero.cta}
            </a>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Mobile: horizontal scroll */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pillContainer}
            className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide lg:hidden"
            aria-label="対応8言語"
          >
            {LANGUAGE_PILLS.map((lang) => (
              <motion.div
                key={lang.code}
                variants={pillItem}
                className="shrink-0 snap-start"
              >
                <LanguagePill code={lang.code} label={lang.label} />
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop: 2 rows × 4 columns */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={pillContainer}
            className="hidden grid-cols-4 gap-3 lg:grid"
            aria-label="対応8言語"
          >
            {LANGUAGE_PILLS.map((lang) => (
              <motion.div key={lang.code} variants={pillItem}>
                <LanguagePill code={lang.code} label={lang.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
