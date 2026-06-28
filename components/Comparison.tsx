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
          <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
            {comparison.subtitle}
          </p>
        </motion.div>

        {/* Mobile: card stack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-10 space-y-4 md:hidden"
          role="list"
          aria-label="Duolingo と PolyLingo の比較"
        >
          {comparison.rows.map((row) => (
            <article key={row.label} className="card" role="listitem">
              <h3 className="text-base font-bold text-navy">{row.label}</h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="font-caption text-text-muted">Duolingo</dt>
                  <dd className="mt-1 text-text-muted">{row.duolingo}</dd>
                </div>
                <div className="rounded-xl bg-lightblue/60 p-3">
                  <dt className="font-caption text-navy">PolyLingo</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    {row.polylingo}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </motion.div>

        {/* Desktop: table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-12 hidden overflow-x-auto md:block"
          role="region"
          aria-label="Duolingo と PolyLingo の比較表"
        >
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {comparison.title} — Duolingo と PolyLingo の機能比較
            </caption>
            <thead>
              <tr className="border-b-2 border-border">
                <th
                  className="pb-4 pr-4 text-sm font-semibold text-text-muted"
                  scope="col"
                >
                  項目
                </th>
                <th
                  className="pb-4 px-4 text-sm font-semibold text-text-muted"
                  scope="col"
                >
                  Duolingo
                </th>
                <th
                  className="pb-4 pl-4 text-sm font-semibold text-navy"
                  scope="col"
                >
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
