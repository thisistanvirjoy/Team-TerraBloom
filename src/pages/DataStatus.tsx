import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Card from '../components/Card';
import { Satellite, Calendar, Database, TrendingUp } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function DataStatus() {
  const { t } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sourcesRef = useRef<HTMLDivElement>(null);
  const confidenceRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo(
      cardsRef.current?.children || [],
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    )
    .fromTo(
      sourcesRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.2'
    );

    // Animate numeric confidence counter
    const target = { val: 0 };
    gsap.to(target, {
      val: 85,
      duration: 1.2,
      ease: 'power1.out',
      onUpdate: () => {
        if (confidenceRef.current) {
          confidenceRef.current.textContent = `${Math.round(target.val)}%`;
        }
      },
      delay: 0.2,
    });
  }, [reduced]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 ref={titleRef} className="text-2xl font-bold mb-6 text-emerald-900">
        {t('nav.data')}
      </h2>

      <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-start gap-3">
            <Calendar className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-sm font-medium text-emerald-900 mb-1">
                {t('badges.update')}
              </p>
              <p className="text-lg font-bold text-emerald-700">
                2025-09-25
              </p>
              <p className="text-xs text-emerald-600 mt-1">MODIS</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <Satellite className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-sm font-medium text-emerald-900 mb-1">
                {t('badges.window')}
              </p>
              <p className="text-lg font-bold text-emerald-700">
                1-2 weeks
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                Confidence: <span ref={confidenceRef}>0%</span>
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <Database className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-sm font-medium text-emerald-900 mb-1">
                {t('data.sources')}
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                {t('data.modis')}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card ref={sourcesRef}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-emerald-900">NASA Data Sources</h3>
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
            <TrendingUp size={14} /> {t('dataStatus.anomalyEarly', { days: 5 })}
          </span>
        </div>
        <div className="space-y-3">
          {/* Sparkline trend (mock) */}
          <div className="mb-2">
            <p className="text-xs text-emerald-700 mb-1">{t('dataStatus.sparklineLabel')}</p>
            <svg viewBox="0 0 200 40" className="w-full h-10">
              <polyline
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                points="0,28 40,24 80,22 120,18 160,16 200,14"
              />
            </svg>
          </div>

          {/* Source chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {['modis','gldas','gpm','viirs'].map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-full border border-emerald-200 text-emerald-800 bg-white hover:bg-emerald-50 cursor-default">
                {t(`dataStatus.sourcesShort.${s}`)}
              </span>
            ))}
          </div>
          <div className="border-l-4 border-emerald-500 pl-4 py-2 hover:bg-emerald-50 transition-colors rounded-r-lg">
            <p className="font-semibold text-emerald-900">MOD13Q1</p>
            <p className="text-sm text-emerald-700">
              MODIS Vegetation Indices - 16-day, 250m resolution
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                NDVI
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                EVI
              </span>
            </div>
          </div>

          <div className="border-l-4 border-teal-500 pl-4 py-2 hover:bg-teal-50 transition-colors rounded-r-lg">
            <p className="font-semibold text-emerald-900">MCD12Q2</p>
            <p className="text-sm text-emerald-700">
              Land Cover Dynamics - Phenology metrics
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                Phenology
              </span>
            </div>
          </div>

          <div className="border-l-4 border-emerald-400 pl-4 py-2 hover:bg-emerald-50 transition-colors rounded-r-lg">
            <p className="font-semibold text-emerald-900">GLDAS</p>
            <p className="text-sm text-emerald-700">
              Global Land Data Assimilation System - Soil moisture
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                Soil Moisture
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                Temperature
              </span>
            </div>
          </div>

          <div className="border-l-4 border-teal-400 pl-4 py-2 hover:bg-teal-50 transition-colors rounded-r-lg">
            <p className="font-semibold text-emerald-900">GPM</p>
            <p className="text-sm text-emerald-700">
              Global Precipitation Measurement
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                Precipitation
              </span>
            </div>
          </div>

          <div className="border-l-4 border-emerald-300 pl-4 py-2 hover:bg-emerald-50 transition-colors rounded-r-lg">
            <p className="font-semibold text-emerald-900">MOD11A2</p>
            <p className="text-sm text-emerald-700">
              Land Surface Temperature - 8-day, 1km resolution
            </p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                LST
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <p className="text-sm text-emerald-800">
          Data is automatically updated when new satellite observations become
          available. All predictions use multiple NASA datasets for maximum
          accuracy.
        </p>
      </div>
    </div>
  );
}
