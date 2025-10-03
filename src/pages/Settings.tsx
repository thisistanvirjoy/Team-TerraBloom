import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Card from '../components/Card';
import { Globe, Zap } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [reducedMotion, setReducedMotion] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
    );
  }, [reduced]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleReducedMotionToggle = () => {
    setReducedMotion(!reducedMotion);
    // In a real app, this would save to localStorage and affect the entire app
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 ref={titleRef} className="text-2xl font-bold mb-6 text-emerald-900">
        {t('settings.heading')}
      </h2>

      <div ref={cardsRef} className="space-y-4">
        <Card>
          <div className="flex items-start gap-3">
            <Globe className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <p className="font-semibold text-emerald-900 mb-2">
                {t('settings.language')}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-4 py-2 rounded-xl border transition-all duration-200 hover:scale-105 ${
                    i18n.language === 'en'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'border-emerald-200 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('bn')}
                  className={`px-4 py-2 rounded-xl border transition-all duration-200 hover:scale-105 ${
                    i18n.language === 'bn'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'border-emerald-200 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <Zap className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-900">
                    {t('settings.reducedMotion')}
                  </p>
                  <p className="text-sm text-emerald-700 mt-1">
                    Reduce animations for better accessibility
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={reducedMotion}
                    onChange={handleReducedMotionToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600 hover:scale-105 transition-transform"></div>
                </label>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-emerald-900 mb-3">About</h3>
          <p className="text-sm text-emerald-700 mb-2">
            BloomTrack uses NASA satellite data to predict crop bloom timing,
            helping farmers optimize planting and harvesting decisions.
          </p>
          <div className="pt-3 border-t border-emerald-100">
            <p className="text-xs text-emerald-600">Version 1.0.0</p>
            <p className="text-xs text-emerald-600 mt-1">
              {t('footer.credit')}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
