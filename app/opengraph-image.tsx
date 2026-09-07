/**
 * SAVE AS: app/opengraph-image.tsx
 *
 * Generates the 1200x630 preview card that shows when the site is shared in
 * SMS, WhatsApp, Facebook or Slack. Worth having because cold-call follow-ups
 * usually go out as a text message with a link — a bare link looks amateur,
 * a card with the brand on it doesn't.
 *
 * Next.js picks this up by filename. No config needed.
 * Delete the `/og-image.jpg` references in layout metadata if you use this.
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Trident Pressure Washing — Melbourne exterior cleaning';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0B1B33 0%, #04222B 100%)',
          position: 'relative',
        }}
      >
        {/* hazard stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background:
              'repeating-linear-gradient(45deg, #FFD60A 0 20px, #0B1B33 20px 40px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#FFD60A',
            fontWeight: 700,
            marginBottom: 28,
          }}
        >
          Melbourne · Victoria
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 104,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          Filth, meet
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 104,
            fontWeight: 900,
            color: '#22D3EE',
            lineHeight: 1,
            letterSpacing: -3,
            fontStyle: 'italic',
          }}
        >
          your match.
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 32,
            fontWeight: 600,
          }}
        >
          Pressure washing · Roofs · Gutters · Solar · Driveways
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginTop: 44,
          }}
        >
          <div
            style={{
              display: 'flex',
              background: '#FFD60A',
              color: '#0B1B33',
              fontSize: 30,
              fontWeight: 900,
              padding: '16px 32px',
              borderRadius: 999,
            }}
          >
            0430 423 564
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
            tridentwash.com.au
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}