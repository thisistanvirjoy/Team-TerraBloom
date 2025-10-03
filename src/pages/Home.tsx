import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import SimpleMap from '../components/SimpleMap';
import { MapPinned, CloudSun, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Hero section animations
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    // Letter by letter for title
    .add(() => {
      const title = titleRef.current;
      if (!title) return;
      const text = title.innerText;
      const letters = text.split('');
      title.innerHTML = letters.map((l) => `<span class="inline-block opacity-0">${l === ' ' ? '&nbsp;' : l}</span>`).join('');
      const spans = title.querySelectorAll('span');
      gsap.to(spans, { opacity: 1, y: 0, duration: 0.02, stagger: 0.02, ease: 'power2.out' });
    }, '-=0.6')
    .fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      buttonsRef.current?.children || [],
      { y: 15, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      '-=0.2'
    )
    .fromTo(
      visualRef.current,
      { scale: 0.8, opacity: 0, rotation: -5 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.7 },
      '-=0.3'
    )
    // Cards animation
    .fromTo(
      cardsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
      '-=0.1'
    );
  }, [reduced]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section
        ref={heroRef}
        className="grid md:grid-cols-2 gap-6 items-center"
      >
        <div>
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl font-extrabold text-emerald-900"
          >
            {t('hero.title')}
          </h1>
          <p 
            ref={subtitleRef}
            className="mt-3 text-emerald-800/80 text-lg"
          >
            {t('hero.subtitle')}
          </p>
          <div ref={buttonsRef} className="mt-5 flex gap-3 flex-wrap">
            <Link
              to="/map"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:scale-105 hover:shadow-lg transition-all duration-200 font-medium"
            >
              {t('hero.ctaMap')}
            </Link>
            <Link
              to="/report"
              className="px-4 py-2 rounded-xl bg-amber-500/90 text-white hover:bg-amber-500 hover:scale-105 hover:shadow-md transition-all duration-200 font-medium"
            >
              {t('hero.ctaReport')}
            </Link>
          </div>
        </div>
        <div 
          ref={visualRef}
          className="aspect-video rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden"
        >
          <div className="h-full w-full pointer-events-none">
            <SimpleMap
              center={[23.6850, 90.3563]}
              zoom={6}
              className="h-full w-full"
              activeLayers={{ ndvi: true, rain: false, soil: true, bloom: true }}
            />
          </div>
        </div>
      </section>

      <section className="mt-8" ref={cardsRef}>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/divisions">
            <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-emerald-50">
              <div className="flex items-center gap-3">
                <MapPinned className="text-emerald-600 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-emerald-900">
                  {t('features.district')}
                  </p>
                  <p className="text-sm text-emerald-800/70">
                  {t('features.districtDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/conditions">
            <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-emerald-50">
              <div className="flex items-center gap-3">
                <CloudSun className="text-emerald-600 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-emerald-900">
                    {t('features.conditions')}
                  </p>
                  <p className="text-sm text-emerald-800/70">
                    {t('features.conditionsDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/report">
            <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-emerald-50">
              <div className="flex items-center gap-3">
                <Droplets className="text-emerald-600 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-emerald-900">
                    {t('features.reports')}
                  </p>
                  <p className="text-sm text-emerald-800/70">
                    {t('features.reportsDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        {/* Crop calendar */}
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <Card>
            <p className="font-semibold text-emerald-900 mb-1">{t('calendar.heading')}</p>
            <div className="text-sm text-emerald-800/80 space-y-1">
              <div className="flex justify-between"><span>{t('calendar.rice')}</span><span>{t('calendar.riceWindow')}</span></div>
              <div className="flex justify-between"><span>{t('calendar.sunflower')}</span><span>{t('calendar.sunflowerWindow')}</span></div>
              <div className="flex justify-between"><span>{t('calendar.mustard')}</span><span>{t('calendar.mustardWindow')}</span></div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
