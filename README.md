# BloomTrack (Frontend)

Modern React + TypeScript prototype for crop bloom visualization and reporting. Backend/data pipeline integration is pending; the current app uses mock data and offline‑friendly layers suitable for hackathon demos.

## ✨ Key Features

- Internationalization: English and Bangla (বাংলা) with live toggle
- Animated, accessible UI (GSAP), reduced‑motion aware
- Responsive layout with sticky nav and persistent footer
- Map page (Leaflet)
  - Static preview overlays (NDVI, Rain, Soil, Bloom) with toggles
  - Time slider (2020 / 2023 / 2025) to vary overlays
  - Local/Global extent toggle
  - Optional NASA GIBS layer support in SimpleMap
- Division view
  - Division cards with stage, confidence badge (High/Medium/Low), last update
- Conditions
  - Weather/soil cards with icons and a decision‑support forecast
- Report
  - Report form (mock) + recent community reports gallery (mock)
- Data Status
  - Sparkline trend, anomaly badge (e.g., bloom 5 days early)
  - Source chips (MODIS · GLDAS · GPM · VIIRS)
- Home
  - Hero with static preview map
  - Crop Bloom Calendar (Rice / Sunflower / Mustard)

## 🧱 Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- i18next / react-i18next
- GSAP (animations)
- Leaflet (maps); lucide-react (icons)

## 🚀 Getting Started

Prerequisites: Node 18+

```bash
npm install
npm run dev
```

Scripts:
- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run lint` – Lint
- `npm run typecheck` – TS typecheck

Open: `http://localhost:5173` (Vite may auto‑pick another port).

## 🗺️ Maps

This repo includes two complementary approaches:

1) Static preview overlays (default)
- Implemented in `src/components/SimpleMap.tsx`
- Toggles: NDVI, Rain, Soil, Bloom (colored rectangles as placeholders)
- Time slider varies overlay opacity/extent for 2020/2023/2025
- Local/Global mode for quick scope switching

2) NASA GIBS tiles (optional)
- SimpleMap supports a `gibs` boolean and `gibsLayer`, `gibsDate` props
- Example layer: `MODIS_Terra_CorrectedReflectance_Bands721`

## 🌐 Internationalization

- Resource file: `src/i18n.ts`
- Default: English; toggle to Bangla via nav button or `Settings`
- New UI strings (map mode, sparkline labels, decision‑support, calendar, gallery) are fully translated

## 🔧 Configuration

- Tailwind config: `tailwind.config.js`
- Vite config: `vite.config.ts`

## 📁 Important Paths

- `src/App.tsx` – App shell, routes, persistent footer
- `src/pages/` – `Home`, `MapView`, `DivisionView`, `Conditions`, `DataStatus`, `Report`, `Settings`
- `src/components/` – `Nav`, `Card`, `LanguageToggle`, `Loader`, `SimpleMap`
- `src/i18n.ts` – i18n resources

## 🧪 Demo Notes

- All analytics/maps use mock data to keep the demo stable and offline‑friendly
- Animations respect system “prefers‑reduced‑motion”
- Footer text: `© 2025 BloomTrack · NASA Space Apps 2025- by Team Terrabloom`

## 📦 Roadmap (Backend/Data Integration Pending)

- Connect to real NASA datasets (MODIS/VIIRS, GLDAS, GPM), either:
  - Direct tile services (e.g., GIBS, TMS/WMTS)
  - Serverless endpoints that preprocess curves (NDVI trends, bloom windows)
- Supabase/DB for:
  - User reports (photos + metadata)
  - Region-level statistics and historical trends
- Auth (optional): sign‑in for reporters/moderation

## 🔒 Accessibility & Performance

- Focus styles and keyboard navigation via Tailwind
- Reduced motion respected via custom hook `usePrefersReducedMotion`
- Lightweight overlays (SVG/rectangles) for performance in demo mode

## 🤝 Contributing

PRs welcome. Please:
- Keep changes scoped by page/component
- Include i18n keys in both `en` and `bn`
- Ensure `npm run typecheck` and `npm run lint` pass

## 📜 License

Prototype for hackathon purposes. All referenced satellite products belong to their respective providers (NASA, etc.).
