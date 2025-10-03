import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import Nav from './components/Nav';
import Home from './pages/Home';
import MapView from './pages/MapView';
import DivisionView from './pages/DivisionView';
import Conditions from './pages/Conditions';
import Report from './pages/Report';
import DataStatus from './pages/DataStatus';
import Settings from './pages/Settings';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '#page',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [location]);

  if (loading) return <Loader onDone={() => setLoading(false)} />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white text-emerald-950">
      <Nav />
      <main id="page" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/divisions" element={<DivisionView />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/report" element={<Report />} />
          <Route path="/data" element={<DataStatus />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <footer className="py-6 text-center text-xs text-emerald-800/70 border-t border-emerald-100">
        <p>© 2025 BloomTrack · NASA Space Apps 2025- by Team Terrabloom</p>
      </footer>
    </div>
  );
}
