const WIDTH = 480;
const HEIGHT = 260;
const PAD = { top: 20, right: 24, bottom: 40, left: 48 };

const CHART_W = WIDTH - PAD.left - PAD.right;
const CHART_H = HEIGHT - PAD.top - PAD.bottom;

const MAX_DAY = 35;

/** Natural forgetting: retention decays exponentially without review. */
function forgettingRetention(day: number): number {
  return 100 * Math.exp(-day / 6);
}

const SRS_REVIEWS = [0, 1, 3, 7, 16, 35];

/** SRS retention with resets at spaced review intervals. */
function srsRetention(day: number): number {
  let retention = 100;
  let lastReview = 0;

  for (const review of SRS_REVIEWS.slice(1)) {
    if (day <= review) {
      const elapsed = day - lastReview;
      return retention * Math.exp(-elapsed / 8);
    }
    const elapsed = review - lastReview;
    retention = Math.min(100, retention * Math.exp(-elapsed / 8) + 35);
    retention = Math.min(100, retention + 15);
    lastReview = review;
  }

  const elapsed = day - lastReview;
  return retention * Math.exp(-elapsed / 10);
}

function toX(day: number): number {
  return PAD.left + (day / MAX_DAY) * CHART_W;
}

function toY(retention: number): number {
  return PAD.top + CHART_H - (retention / 100) * CHART_H;
}

function buildPath(retentionFn: (day: number) => number): string {
  const points: string[] = [];
  for (let day = 0; day <= MAX_DAY; day += 0.5) {
    const x = toX(day);
    const y = toY(retentionFn(day));
    points.push(`${points.length === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(' ');
}

const forgettingPath = buildPath(forgettingRetention);
const srsPath = buildPath(srsRetention);

const reviewMarkers = SRS_REVIEWS.filter((d) => d > 0);

export default function EbbinghausChart() {
  return (
    <figure className="w-full" aria-labelledby="ebbinghaus-chart-title">
      <figcaption id="ebbinghaus-chart-title" className="sr-only">
        忘却曲線と間隔反復（SRS）による記憶定着率の比較グラフ
      </figcaption>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full max-w-lg"
        role="img"
        aria-hidden="true"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <g key={pct}>
            <line
              x1={PAD.left}
              y1={toY(pct)}
              x2={WIDTH - PAD.right}
              y2={toY(pct)}
              stroke="#E5E9F0"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={toY(pct) + 4}
              textAnchor="end"
              className="fill-muted text-[10px]"
            >
              {pct}%
            </text>
          </g>
        ))}

        {/* Review markers */}
        {reviewMarkers.map((day) => (
          <g key={day}>
            <line
              x1={toX(day)}
              y1={PAD.top}
              x2={toX(day)}
              y2={PAD.top + CHART_H}
              stroke="#DEEBF7"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <text
              x={toX(day)}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-blue text-[10px] font-semibold"
            >
              D{day}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={PAD.left + CHART_W / 2}
          y={HEIGHT - 22}
          textAnchor="middle"
          className="fill-muted text-[11px]"
        >
          経過日数
        </text>

        {/* Forgetting curve */}
        <path
          d={forgettingPath}
          fill="none"
          stroke="#EF4444"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* SRS curve */}
        <path
          d={srsPath}
          fill="none"
          stroke="#10B981"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Review dots on SRS curve */}
        {reviewMarkers.map((day) => (
          <circle
            key={`dot-${day}`}
            cx={toX(day)}
            cy={toY(srsRetention(day))}
            r={4}
            fill="#10B981"
            stroke="white"
            strokeWidth={1.5}
          />
        ))}

        {/* Legend */}
        <g transform={`translate(${PAD.left}, ${PAD.top - 4})`}>
          <line x1={0} y1={0} x2={20} y2={0} stroke="#EF4444" strokeWidth={2.5} />
          <text x={26} y={4} className="fill-text text-[11px]">
            忘却曲線
          </text>
          <line x1={100} y1={0} x2={120} y2={0} stroke="#10B981" strokeWidth={2.5} />
          <text x={126} y={4} className="fill-text text-[11px]">
            SRS 復習
          </text>
        </g>
      </svg>
    </figure>
  );
}
