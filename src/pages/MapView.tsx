import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import Card from '../components/Card';
import SimpleMap from '../components/SimpleMap';
import { Map, Layers, Info } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function MapView() {
  const { t } = useTranslation();
  const [activeLayers, setActiveLayers] = useState({
    ndvi: true,
    bloom: true,
    rain: false
  });
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.6850, 90.3563]);
  const [mapZoom, setMapZoom] = useState(7);
  const [timeKey, setTimeKey] = useState<'2020' | '2023' | '2025'>('2025');
  const [mode, setMode] = useState<'local' | 'global'>('local');
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
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
      mapRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      controlsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.4'
    );
  }, [reduced]);

  const handleLayerToggle = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setMapCenter([lat, lng]);
    setMapZoom(10);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 ref={titleRef} className="text-2xl font-bold mb-6 text-emerald-900">
        {t('nav.map')}
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div ref={mapRef} className="md:col-span-2 relative">
          <div className="h-[560px] w-full rounded-2xl bg-emerald-50 border border-emerald-200 overflow-hidden">
            <SimpleMap
              center={mapCenter}
              zoom={mapZoom}
              className="h-full w-full"
              activeLayers={{ ndvi: activeLayers.ndvi, rain: activeLayers.rain, soil: true, bloom: activeLayers.bloom }}
              timeKey={timeKey}
              mode={mode}
            />
            <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur px-3 py-2 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700">2020</span>
                <input type="range" min={0} max={2} step={1} value={timeKey === '2020' ? 0 : timeKey === '2023' ? 1 : 2} onChange={(e) => {
                  const v = Number(e.target.value);
                  setTimeKey(v === 0 ? '2020' : v === 1 ? '2023' : '2025');
                }} className="accent-emerald-600"/>
                <span className="text-xs text-emerald-700">2025</span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-xs">
                <button onClick={() => { setMode('local'); setMapCenter([23.6850, 90.3563]); setMapZoom(7); }} className={`px-2 py-1 rounded-lg border ${mode==='local' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-emerald-200 text-emerald-800'}`}>📍 {t('map.mode.local')}</button>
                <button onClick={() => { setMode('global'); setMapCenter([10, 0]); setMapZoom(2 as any); }} className={`px-2 py-1 rounded-lg border ${mode==='global' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-emerald-200 text-emerald-800'}`}>🌍 {t('map.mode.global')}</button>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={controlsRef} className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="text-emerald-600" size={20} />
              <p className="font-semibold text-emerald-900">
                {t('map.layers')}
              </p>
            </div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeLayers.ndvi}
                  onChange={() => handleLayerToggle('ndvi')}
                  className="mr-2 accent-emerald-600"
                  id="ndvi"
                />
                <label htmlFor="ndvi" className="cursor-pointer">
                  {t('map.ndvi')}
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeLayers.bloom}
                  onChange={() => handleLayerToggle('bloom')}
                  className="mr-2 accent-emerald-600"
                  id="bloom"
                />
                <label htmlFor="bloom" className="cursor-pointer">
                  {t('map.bloom')}
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeLayers.rain}
                  onChange={() => handleLayerToggle('rain')}
                  className="mr-2 accent-emerald-600"
                  id="rain"
                />
                <label htmlFor="rain" className="cursor-pointer">
                  {t('map.rain')}
                </label>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-emerald-600" size={20} />
              <p className="font-semibold text-emerald-900">{t('map.legend')}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span>Pre-bloom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span>Early bloom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Peak bloom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span>Post-bloom</span>
              </div>
            </div>
          </Card>

          <Card>
            <p className="font-semibold mb-3 text-emerald-900">{t('map.quick')}</p>
            <div className="space-y-2">
              <button
                onClick={() => handleLocationChange(23.6850, 90.3563)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Dhaka
              </button>
              <button
                onClick={() => handleLocationChange(22.3569, 91.7832)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Chattogram
              </button>
              <button
                onClick={() => handleLocationChange(24.3636, 88.6241)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Rajshahi
              </button>
              <button
                onClick={() => handleLocationChange(23.1667, 89.2167)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Khulna
              </button>
              <button
                onClick={() => handleLocationChange(24.8949, 91.8687)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Sylhet
              </button>
              <button
                onClick={() => handleLocationChange(22.7010, 90.3535)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Barishal
              </button>
              <button
                onClick={() => handleLocationChange(24.7500, 90.4000)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Mymensingh
              </button>
              <button
                onClick={() => handleLocationChange(25.7500, 89.2500)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Rangpur
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
