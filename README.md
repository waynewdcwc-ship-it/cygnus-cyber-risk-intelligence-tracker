# Cygnus Cyber Risk Intelligence Tracker v0.6

Fresh clean Vite/Vercel-ready static preview for the Cygnus Cyber Risk Intelligence Tracker.

## v0.6 updates

- Added AI Systems Risk & Patching section
- Added AI patching risk cards for prompt injection, sensitive data leakage, model over-trust, AI supply-chain risk, and output drift
- Added practical AI Patch Cycle: Identify, Contain, Patch, Verify
- Kept live OTX feed and full pulse source links intact

- OTX feed cards now include a View full OTX pulse link
- Full OTX pulse pages open in a new browser tab
- Dashboard remains uncluttered while source detail remains accessible

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
