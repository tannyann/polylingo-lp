import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'var(--navy)',
        blue: 'var(--blue)',
        lightblue: 'var(--lightblue)',
        bg: 'var(--bg)',
        amber: 'var(--amber)',
        fire: 'var(--fire)',
        success: 'var(--success)',
        swap: 'var(--swap)',
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--muted)',
        },
        border: 'var(--border)',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-noto-sans-jp)',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'card-hover':
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
