# Cygnus Cyber Risk Intelligence Tracker v1.0

Fresh clean Vite/Vercel-ready static preview for the Cygnus Cyber Risk Intelligence Tracker.

## v1.0 updates

- Added Executive Cyber Briefing section
- Added current posture summary, executive priorities, and recommended executive actions
- Enabled Print / Save Briefing button using browser print
- Preserved Global Tracker-style branding, live OTX feed, source links, analyst notes, sector relevance, and AI Systems Risk & Patching

- Added sector relevance tags to live OTX pulse cards
- Added sector mapping logic for financial services, healthcare, government, energy, SMEs, technology providers, and cross-sector monitoring
- Added sector relevance overview section
- Kept Cygnus Analyst Notes, OTX source links, and AI Systems Risk & Patching intact

- Added Cygnus Analyst Notes under live OTX pulses
- Added business-risk relevance labels for each OTX item
- Added recommended monitoring actions beneath each pulse summary
- Kept OTX full pulse links opening in a new tab
- Kept AI Systems Risk & Patching section intact

- Aligned landing page theme with the Global Strategic Risk Intelligence Tracker
- Added white landing-page style with large navy headline and gold italic positioning statement
- Added rounded version banner, feature cards, and large pill-style action buttons
- Preserved live OTX feed, OTX source links, and AI Systems Risk & Patching section

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
