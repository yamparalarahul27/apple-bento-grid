# Apple Bento Grid

A Next.js and Shadcn UI app for creating Apple event style bento grid compositions.

## What It Does

- Uses a fixed 12 column by 6 row canvas based on the provided 1512 x 945 Apple bento references.
- Includes presets for AirPods, OS overview, and hardware launch layouts.
- Lets you edit tile content, type, icon, color, image, spans, radius, gap, and stage tone.
- Supports local image upload, reference-image assignment, PNG export, and JSON export/import.
- Keeps a cell budget visible so layouts stay constrained instead of becoming freeform collages.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Key Files

- `src/components/bento-builder.tsx` - editor UI, canvas renderer, export/import behavior.
- `src/lib/bento-presets.ts` - bento model, preset layouts, grid constants, reference image list.
- `src/app/globals.css` - Shadcn theme tokens and bento-specific visual styling.
- `public/references` - numbered copies of the provided Apple bento screenshots.
