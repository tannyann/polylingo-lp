import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PolyLingo - 30構文で8言語が話せる';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #1F3864 0%, #2E75B6 100%)',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#F59E0B',
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          2026年12月リリース予定
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          30構文で、8言語が話せる。
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#DEEBF7',
            marginBottom: 40,
          }}
        >
          Duolingoの次に行きたい、本気の学習者のためのアプリ。
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['EN', 'DE', 'ZH', 'KO', 'ES', 'PT', 'IT', 'FR'].map((lang) => (
            <div
              key={lang}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 12,
                padding: '8px 16px',
                color: '#ffffff',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {lang}
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 64,
            fontSize: 36,
            fontWeight: 800,
            color: '#ffffff',
          }}
        >
          PolyLingo
        </div>
      </div>
    ),
    { ...size },
  );
}
