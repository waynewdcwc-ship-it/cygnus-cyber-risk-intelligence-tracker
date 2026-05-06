# Cygnus Cyber Risk Intelligence Tracker v0.4

Fresh clean Vite/Vercel-ready static preview for the Cygnus Cyber Risk Intelligence Tracker.

## v0.4 updates

- Added a more complete top navigation system
- Added a strategic cyber watchlist section
- Added an executive readiness snapshot
- Added a terminology and help section
- Added secure Vercel serverless OTX API foundation
- Added Live OTX Preview panel with safe fallback mode
- Requires OTX_API_KEY in Vercel environment variables for live deployment
- Improved content structure and section flow
- Kept the Cygnus Development – Risk Intelligence Technology branding
- Kept OTX/API integration reserved for a later phase

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel settings

- Framework Preset: Vite
- Install Command: npm install
- Build Command: npm run build
- Output Directory: dist

## Notes

This build is static. Live OTX preview is routed through /api/otx-pulses when OTX_API_KEY is configured. The frontend does not contain the API key.
