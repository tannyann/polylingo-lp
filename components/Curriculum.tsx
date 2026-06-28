'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import EbbinghausChart from '@/components/EbbinghausChart';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import type { PageCopy } from '@/lib/copy';

type CurriculumProps = {
  curriculum: PageCopy['curriculum'];
};

export default function Curriculum({ curriculum }: CurriculumProps) {
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-title"
      className="section bg-white"
    >
      <div className="container-content">
        <motion.h2
          id="curriculum-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="font-title text-balance text-center text-navy"
        >
          {curriculum.title}
        </motion.h2>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="card w-full max-w-lg !p-6">
              <EbbinghausChart />
              <p className="mt-4 text-center text-sm text-text-muted">
                復習なしでは記憶は急速に消える。SRS
                は最適なタイミングで定着率を維持する。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {curriculum.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="card border-l-4 border-l-blue !py-5"
              >
                <p className="font-caption text-blue">{stat.label}</p>
                <p className="mt-1 text-lg font-bold text-navy">{stat.value}</p>
              </motion.div>
            ))}

            <motion.div variants={fadeUp}>
              <Link
                href={curriculum.detailHref}
                className="inline-flex items-center gap-1 font-semibold text-blue transition hover:text-navy focus-visible:ring-navy"
              >
                {curriculum.detailLink}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
