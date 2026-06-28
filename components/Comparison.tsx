'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { PageCopy } from '@/lib/copy';

type ComparisonProps = {
  comparison: PageCopy['comparison'];
};

export default function Comparison({ comparison }: ComparisonProps) {
  return (
    <section
      id="comparison"
      aria-labelledby="comparison-title"
      className="section bg-bg"
    >
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center"
        >
          <h2
            id="comparison-title"
            className="font-title text-balance text-navy"
          >
            {comparison.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            {comparison.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-12 overflow-x-auto"
          role="region"
          aria-label="Duolingo と PolyLingo の比較表"
        >
          <table className="w-full min-w-[540px] border-collapse text-left">
            <caption className="sr-only">
              {comparison.title} — Duolingo と PolyLingo の機能比較
            </caption>
            <thead>
              <tr className="border-b-2 border-border">
                <th className="pb-4 pr-4 text-sm font-semibold text-text-muted" scope="col">
                  項目
                </th>
                <th className="pb-4 px-4 text-sm font-semibold text-text-muted" scope="col">
                  Duolingo
                </th>
                <th className="pb-4 pl-4 text-sm font-semibold text-navy" scope="col">
                  PolyLingo
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-lightblue/30'}
                >
                  <th
                    scope="row"
                    className="py-4 pr-4 text-sm font-semibold text-navy"
                  >
                    {row.label}
                  </th>
                  <td className="py-4 px-4 text-sm text-text-muted">
                    {row.duolingo}
                  </td>
                  <td className="py-4 pl-4 text-sm font-semibold text-navy">
                    {row.polylingo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
