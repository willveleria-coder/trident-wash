# Trident favicons

Two sets. Pick one, ignore the other.

- **`/` (this folder)** — the full logo. Looks great at 64px+, turns into a blue smudge at 16px.
- **`/simple-mark`** — just the silver trident on brand navy. Still legible at 16px, which is the size that actually appears in a browser tab.

The simple mark is the one to ship. The full logo is there in case Sunny wants it.

## Install (Next.js App Router)

Next.js picks these up automatically by filename — no `<link>` tags, no `metadata` config needed. Copy into `app/`:

| From | To |
|---|---|
| `favicon.ico` | `app/favicon.ico` |
| `icon-192.png` | `app/icon.png` |
| `apple-touch-icon.png` | `app/apple-icon.png` |

That covers browser tabs, bookmarks, and the iOS home screen.

## PWA manifest (optional)

If you add a `public/manifest.json`, drop `icon-192.png`, `icon-512.png` and `icon-maskable-512.png` into `public/` and reference them:

```json
{
  "name": "Trident Pressure Washing",
  "short_name": "Trident",
  "theme_color": "#0B1B33",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

Then in `app/layout.tsx` metadata: `manifest: '/manifest.json'`.

## Notes

- `favicon.ico` is multi-resolution — 16, 32, 48 and 64px in one file. Browsers pick the right one.
- `apple-touch-icon.png` is flattened onto a solid background on purpose. iOS ignores transparency and fills it black, which looks broken.
- The maskable icon keeps the trident inside the inner 80% safe zone, so Android can crop it to a circle or squircle without clipping.
- Favicons cache hard. After deploying, hard-refresh or check in an incognito window before assuming it didn't work.
