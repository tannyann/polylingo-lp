'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import type { PageCopy } from '@/lib/copy';

type ComingFeaturesProps = {
  comingFeatures: PageCopy['comingFeatures'];
};

export default function ComingFeatures({
  comingFeatures,
}: ComingFeaturesProps) {
  return (
    <section
      id="coming-features"
      aria-labelledby="coming-features-title"
      className="section bg-white"
    >
      <div className="container-content">
        <motion.h2
          id="coming-features-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="font-title text-balance text-center text-navy"
        >
          {comingFeatures.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {comingFeatures.features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              className="card flex flex-col"
            >
              <span className="w-fit rounded-full bg-lightblue px-2.5 py-0.5 font-caption text-blue">
                [{feature.badge}]
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">
                {feature.title}
              </h3>
              <p className="mt-3 flex-1 text-text-muted">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
