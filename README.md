# Cygnus Cyber Risk Intelligence Tracker v1.5.1

Dashboard layout redesign for the Cygnus Cyber Risk Intelligence Tracker.

## v1.5.1 updates

- Converted the tracker from a long landing-page layout into a dashboard-style intelligence interface
- Added a left-side navigation menu on desktop
- Made the Overview dashboard the default landing view
- Placed the OpenStreetMap-based Cyber Risk Intelligence Map prominently on the homepage
- Added dashboard cards for current posture, OTX signals, NCSC items, and monitored regions
- Added immediate homepage panels for highest threat themes, hot spots, and source status
- Preserved live OTX feed, live NCSC RSS feed, NCSC guidance, cyber insurance, executive briefing, analyst notes, sector relevance, AI patching, watchlist, threat landscape, readiness, help, and methodology

## Run locally

```bash
npm install
npm run dev
```

## Vercel settings

- Framework Preset: Vite
- Install Command: npm install
- Build Command: npm run build
- Output Directory: dist

## Important dependency note

If Vercel shows a registry/package-lock error, delete `package-lock.json`, run `npm install --registry=https://registry.npmjs.org/` locally, then commit the regenerated lockfile.


- Replaced the previous text-only sidebar brand block with the Cygnus corporate banner.
