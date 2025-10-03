import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import Card from '../components/Card';
import { MapPinned, TrendingUp, Calendar, Droplets, Thermometer, BarChart3 } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface DivisionData {
  id: number;
  name: string;
  bloomWindow: string;
  confidence: number;
  ndvi: number;
  temperature: number;
  rainfall: number;
  soilMoisture: number;
  stage: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
}

export default function DivisionView() {
  const { t } = useTranslation();
  const [selectedDivision, setSelectedDivision] = useState<number | null>(null);
  const [filterStage, setFilterStage] = useState<string>('all');
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Sample division data
  const divisionData: DivisionData[] = [
    {
      id: 1,
      name: 'Dhaka',
      bloomWindow: '1-2 weeks',
      confidence: 85,
      ndvi: 0.72,
      temperature: 28.5,
      rainfall: 45.2,
      soilMoisture: 78,
      stage: 'Pre-bloom',
      trend: 'up',
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      name: 'Chattogram',
      bloomWindow: '2-3 weeks',
      confidence: 78,
      ndvi: 0.68,
      temperature: 26.8,
      rainfall: 52.1,
      soilMoisture: 82,
      stage: 'Early bloom',
      trend: 'stable',
      lastUpdate: '1 hour ago'
    },
    {
      id: 3,
      name: 'Rajshahi',
      bloomWindow: '3-4 weeks',
      confidence: 92,
      ndvi: 0.81,
      temperature: 30.2,
      rainfall: 38.7,
      soilMoisture: 65,
      stage: 'Peak bloom',
      trend: 'up',
      lastUpdate: '30 minutes ago'
    },
    {
      id: 4,
      name: 'Khulna',
      bloomWindow: '1 week',
      confidence: 88,
      ndvi: 0.75,
      temperature: 29.1,
      rainfall: 41.3,
      soilMoisture: 71,
      stage: 'Post-bloom',
      trend: 'down',
      lastUpdate: '3 hours ago'
    },
    {
      id: 5,
      name: 'Sylhet',
      bloomWindow: '2-3 weeks',
      confidence: 76,
      ndvi: 0.69,
      temperature: 25.4,
      rainfall: 68.9,
      soilMoisture: 89,
      stage: 'Early bloom',
      trend: 'up',
      lastUpdate: '1 hour ago'
    },
    {
      id: 6,
      name: 'Barishal',
      bloomWindow: '1-2 weeks',
      confidence: 81,
      ndvi: 0.73,
      temperature: 27.8,
      rainfall: 55.4,
      soilMoisture: 85,
      stage: 'Pre-bloom',
      trend: 'stable',
      lastUpdate: '2 hours ago'
    },
    {
      id: 7,
      name: 'Mymensingh',
      bloomWindow: '2-3 weeks',
      confidence: 83,
      ndvi: 0.74,
      temperature: 27.2,
      rainfall: 48.5,
      soilMoisture: 79,
      stage: 'Early bloom',
      trend: 'up',
      lastUpdate: '1.5 hours ago'
    },
    {
      id: 8,
      name: 'Rangpur',
      bloomWindow: '3-4 weeks',
      confidence: 79,
      ndvi: 0.67,
      temperature: 26.5,
      rainfall: 42.8,
      soilMoisture: 72,
      stage: 'Pre-bloom',
      trend: 'stable',
      lastUpdate: '2.5 hours ago'
    }
  ];

  const filteredData = divisionData.filter(division => 
    filterStage === 'all' || division.stage.toLowerCase().includes(filterStage.toLowerCase())
  );

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
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
      '-=0.3'
    );
  }, [reduced, filteredData]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Pre-bloom': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Early bloom': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Peak bloom': return 'bg-red-100 text-red-800 border-red-200';
      case 'Post-bloom': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 ref={titleRef} className="text-2xl font-bold mb-6 text-emerald-900">
        {t('divisions.heading')}
      </h2>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-emerald-900">{t('divisions.filterByStage')}</span>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-1 rounded-lg border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{t('divisions.allStages')}</option>
            <option value="pre">{t('divisions.stages.pre')}</option>
            <option value="early">{t('divisions.stages.early')}</option>
            <option value="peak">{t('divisions.stages.peak')}</option>
            <option value="post">{t('divisions.stages.post')}</option>
          </select>
        </div>
      </div>

      {/* Division Cards */}
      <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((division) => (
          <Card
            key={division.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedDivision === division.id ? 'ring-2 ring-emerald-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedDivision(selectedDivision === division.id ? null : division.id)}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPinned className="text-emerald-600" size={20} />
                  <h3 className="font-bold text-emerald-900">{t(`divisions.names.${division.name.toLowerCase()}`)}</h3>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(division.trend)}
                </div>
              </div>

              {/* Stage + Confidence */}
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStageColor(division.stage)}`}>
                  {division.stage}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${division.confidence>=85?'bg-green-100 text-green-700':division.confidence>=75?'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>
                  {division.confidence>=85?t('divisions.confidence.high'):division.confidence>=75?t('divisions.confidence.medium'):t('divisions.confidence.low')}
                </span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-emerald-600">Bloom Window</span>
                  </div>
                  <p className="font-bold text-emerald-900">{division.bloomWindow}</p>
                </div>
                
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs text-emerald-600">Confidence</span>
                  </div>
                  <p className={`font-bold ${getConfidenceColor(division.confidence)}`}>
                    {division.confidence}%
                  </p>
                </div>
              </div>

              {/* Detailed Metrics */}
              {selectedDivision === division.id && (
                <div className="pt-4 border-t border-emerald-100 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">NDVI:</span>
                      <span className="font-semibold">{division.ndvi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Temp:</span>
                      <span className="font-semibold">{division.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Rain:</span>
                      <span className="font-semibold">{division.rainfall}mm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Soil:</span>
                      <span className="font-semibold">{division.soilMoisture}%</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-emerald-600 text-center">
                    Last updated: {division.lastUpdate}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-700">{filteredData.length}</p>
            <p className="text-sm text-emerald-600">Divisions Monitored</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-700">
              {Math.round(filteredData.reduce((acc, d) => acc + d.confidence, 0) / filteredData.length)}%
            </p>
            <p className="text-sm text-emerald-600">Avg Confidence</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-700">
              {filteredData.filter(d => d.stage === 'Peak bloom').length}
            </p>
            <p className="text-sm text-emerald-600">Peak Bloom</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-700">
              {Math.round(filteredData.reduce((acc, d) => acc + d.ndvi, 0) / filteredData.length * 100) / 100}
            </p>
            <p className="text-sm text-emerald-600">Avg NDVI</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
