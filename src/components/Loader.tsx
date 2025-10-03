import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface LoaderProps {
  onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const { t } = useTranslation();
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Scale + bloom effect
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 0.8 }
    )
      .to(logoRef.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })
      // Glow ring pulses (concentric rings)
      .fromTo(
        [ringRef.current, ring2Ref.current, ring3Ref.current],
        { scale: 0.8, opacity: 0 },
        {
          scale: 1.6,
          opacity: 0.6,
          duration: 1,
          repeat: 1,
          yoyo: true,
          stagger: 0.2,
        },
        '-=0.5'
      )
      // Text fade in
      .fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.6'
      )
      // Exit transition
      .to(logoRef.current, { scale: 1.05, duration: 0.2 })
      .to([logoRef.current, ringRef.current, ring2Ref.current, ring3Ref.current, textRef.current], {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      })
      .add(() => onDone());
  }, [onDone, reduced]);

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-gradient-to-b from-emerald-900 to-teal-800 text-white">
      <div className="relative w-56 h-56">
        {/* Concentric glow rings */}
        <div ref={ringRef} className="absolute inset-0 rounded-full border-2 border-emerald-200/60" />
        <div ref={ring2Ref} className="absolute inset-2 rounded-full border-2 border-emerald-300/50" />
        <div ref={ring3Ref} className="absolute inset-4 rounded-full border-2 border-emerald-400/40" />
        <div
          ref={logoRef}
          className="absolute inset-6 rounded-full bg-white grid place-items-center shadow-[0_0_40px_0_rgba(16,185,129,0.25)]"
        >
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="BloomTrack" className="w-40 h-40" />
        </div>
      </div>
      <p ref={textRef} className="mt-6 text-sm tracking-wide opacity-90">
        {t('loading')}…
      </p>
    </div>
  );
}
