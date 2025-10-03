import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import Card from '../components/Card';
import { Camera, MapPin, CheckCircle } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Report() {
  const { t } = useTranslation();
  const [selectedStage, setSelectedStage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const tl = gsap.timeline();
    tl.fromTo(
      formRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
  }, [reduced]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);

    if (!reduced) {
      gsap.fromTo(
        successRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Card>
          <div ref={successRef} className="text-center py-8">
            <CheckCircle size={64} className="mx-auto mb-4 text-emerald-600" />
            <h2 className="text-2xl font-bold mb-2 text-emerald-900">
              Report Submitted!
            </h2>
            <p className="text-emerald-700 mb-6">
              Thank you for contributing to BloomTrack. Your observation helps improve predictions for everyone.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card>
        <h2 className="text-xl font-bold mb-4 text-emerald-900">
          {t('report.heading')}
        </h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-emerald-900">
              {t('report.photo')}
            </label>
            <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center hover:border-emerald-400 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <Camera size={32} className="mx-auto mb-2 text-emerald-600" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer text-sm text-emerald-700"
              >
                Click to upload or drag and drop
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium text-emerald-900">
              {t('report.crop')}
            </label>
            <input
              type="text"
              placeholder="e.g., Rice, Wheat, Mustard"
              className="w-full border border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-300 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="stage"
              className="block text-sm mb-2 font-medium text-emerald-900"
            >
              {t('report.stage')}
            </label>
            <select
              id="stage"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full border border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-300 transition-colors"
            >
              <option value="">Select stage...</option>
              <option value="bud">{t('report.stages.bud')}</option>
              <option value="early">{t('report.stages.early')}</option>
              <option value="full">{t('report.stages.full')}</option>
              <option value="post">{t('report.stages.post')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium text-emerald-900">
              {t('report.location')}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="District, Region"
                className="flex-1 border border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-300 transition-colors"
              />
              <button
                type="button"
                className="px-4 py-3 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
                aria-label="Use current location"
              >
                <MapPin size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium text-emerald-900">
              {t('report.description')}
            </label>
            <textarea
              rows={3}
              placeholder="Additional observations..."
              className="w-full border border-emerald-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-300 transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : t('report.send')}
          </button>
        </form>
      </Card>

      <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <p className="text-sm text-emerald-800">
          Your observations help validate satellite data and improve predictions
          for the entire community.
        </p>
      </div>

      {/* Mock community gallery */}
      <div className="mt-6">
        <h3 className="font-semibold text-emerald-900 mb-3">{t('reportGallery.title')}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-emerald-100 bg-white">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 grid place-items-center text-emerald-700/60 text-xs">
                {t('reportGallery.photo')} {i}
              </div>
              <div className="p-2 text-xs flex items-center justify-between text-emerald-800">
                <span>{t('reportGallery.crop')}: Rice</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Full bloom</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
