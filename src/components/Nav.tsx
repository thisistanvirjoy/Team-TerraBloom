import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Map, Home, FileInput, Database, Settings, Menu, X, MapPinned, CloudSun } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Nav() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const itemClass =
    'flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-emerald-50 text-emerald-900 transition-colors';
  const activeClass = itemClass + ' bg-emerald-100 font-semibold';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (reduced) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isMobileMenuOpen, reduced]);

  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/map', icon: Map, label: t('nav.map') },
    { to: '/divisions', icon: MapPinned, label: t('nav.divisions') },
    { to: '/conditions', icon: CloudSun, label: t('nav.conditions') },
    { to: '/report', icon: FileInput, label: t('nav.report') },
    { to: '/data', icon: Database, label: t('nav.data') },
    { to: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-emerald-700 text-xl hover:scale-105 transition-transform">
          {t('appName')}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? activeClass : itemClass + ' group relative')}
            >
              <Icon size={18} />
              {label}
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded" />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-xl hover:bg-emerald-50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t border-emerald-100 shadow-lg"
        >
          <nav className="px-4 py-2 space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-emerald-100 text-emerald-900 font-semibold' 
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
