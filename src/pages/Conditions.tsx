import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import Card from '../components/Card';
import { CloudSun, Droplets, Thermometer, Wind, Sun, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  soilMoisture: number;
  soilTemp: number;
  lastUpdate: string;
}

interface ForecastData {
  day: string;
  date: string;
  high: number;
  low: number;
  rainfall: number;
  condition: string;
  bloomImpact: 'positive' | 'negative' | 'neutral';
}

export default function Conditions() {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature');
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Sample weather data
  const weatherData: WeatherData = {
    temperature: 28.5,
    humidity: 78,
    rainfall: 45.2,
    windSpeed: 12.5,
    pressure: 1013.2,
    uvIndex: 7,
    soilMoisture: 82,
    soilTemp: 26.8,
    lastUpdate: '2 hours ago'
  };

  const forecastData: ForecastData[] = [
    {
      day: 'Today',
      date: 'Oct 3',
      high: 32,
      low: 25,
      rainfall: 5,
      condition: 'Partly Cloudy',
      bloomImpact: 'positive'
    },
    {
      day: 'Tomorrow',
      date: 'Oct 4',
      high: 30,
      low: 24,
      rainfall: 15,
      condition: 'Light Rain',
      bloomImpact: 'positive'
    },
    {
      day: 'Oct 5',
      date: 'Oct 5',
      high: 35,
      low: 26,
      rainfall: 0,
      condition: 'Sunny',
      bloomImpact: 'negative'
    },
    {
      day: 'Oct 6',
      date: 'Oct 6',
      high: 33,
      low: 25,
      rainfall: 8,
      condition: 'Cloudy',
      bloomImpact: 'neutral'
    }
  ];

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
  }, [reduced]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <TrendingDown className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 ref={titleRef} className="text-2xl font-bold mb-6 text-emerald-900">
        {t('conditions.heading')}
      </h2>

      <div ref={cardsRef} className="space-y-6">
        {/* Current Conditions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <Thermometer className="text-emerald-600" size={24} />
              <div>
                <p className="text-sm text-emerald-600">{t('conditions.temperature')}</p>
                <p className="text-2xl font-bold text-emerald-900">{weatherData.temperature}°C</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <Droplets className="text-emerald-600" size={24} />
              <div>
                <p className="text-sm text-emerald-600">{t('conditions.humidity')}</p>
                <p className="text-2xl font-bold text-emerald-900">{weatherData.humidity}%</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <CloudSun className="text-emerald-600" size={24} />
              <div>
                <p className="text-sm text-emerald-600">{t('conditions.rainfall')}</p>
                <p className="text-2xl font-bold text-emerald-900">{weatherData.rainfall}{t('conditions.mm')}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <Wind className="text-emerald-600" size={24} />
              <div>
                <p className="text-sm text-emerald-600">{t('conditions.windSpeed')}</p>
                <p className="text-2xl font-bold text-emerald-900">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Soil Conditions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <BarChart3 className="text-emerald-600" size={20} />
              {t('conditions.soilMoisture')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-600">{t('conditions.currentLevel')}</span>
                <span className="font-bold text-emerald-900">{weatherData.soilMoisture}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${weatherData.soilMoisture}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-emerald-600">
                <span>{t('conditions.dry')}</span>
                <span>{t('conditions.optimal')}</span>
                <span>{t('conditions.saturated')}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Thermometer className="text-emerald-600" size={20} />
              {t('conditions.soilTemp')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-600">Current Temp</span>
                <span className="font-bold text-emerald-900">{weatherData.soilTemp}°C</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-amber-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(weatherData.soilTemp / 40) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-emerald-600">
                <span>{t('conditions.scale0')}</span>
                <span>{t('conditions.scale20')}</span>
                <span>{t('conditions.scale40')}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Weather Forecast */}
        <Card>
          <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Sun className="text-emerald-600" size={20} />
            {t('conditions.forecastTitle')}
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {forecastData.map((day, index) => (
              <div key={index} className="text-center p-4 bg-emerald-50 rounded-lg">
                <p className="font-semibold text-emerald-900">{day.day}</p>
                <p className="text-sm text-emerald-600 mb-2">{day.date}</p>
                <div className="flex justify-center items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-emerald-900">{day.high}°</span>
                  <span className="text-emerald-600">/</span>
                  <span className="text-emerald-600">{day.low}°</span>
                </div>
                <p className="text-sm text-emerald-700 mb-2">{day.condition}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Droplets className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">{day.rainfall}{t('conditions.mm')}</span>
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(day.bloomImpact)}`}>
                  {getImpactIcon(day.bloomImpact)}
                  {t(`conditions.${day.bloomImpact}`)}
                </div>
              </div>
            ))}
          </div>
          {/* Simple decision-support forecast */}
          <div className="mt-4 p-3 rounded-lg border border-emerald-100 bg-white text-sm text-emerald-800">
            <span className="font-semibold">{t('decision.title')}</span> {t('decision.text', { min: 3, max: 5 })}
          </div>
        </Card>

        {/* Bloom Impact Analysis */}
        <Card>
          <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <TrendingUp className="text-emerald-600" size={20} />
            {t('conditions.analysis')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-900 mb-3">{t('conditions.current')}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-600">{t('conditions.temperature')} Impact:</span>
                  <span className="font-semibold text-green-600">{t('conditions.positive')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">{t('conditions.soilMoisture')}:</span>
                  <span className="font-semibold text-green-600">{t('conditions.optimal')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">{t('conditions.rainfall')}:</span>
                  <span className="font-semibold text-yellow-600">{t('conditions.neutral')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Soil Health:</span>
                  <span className="font-semibold text-green-600">{t('conditions.positive')}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-900 mb-3">{t('conditions.recommendations')}</h4>
              <div className="space-y-2 text-sm text-emerald-700">
                <p>• {t('conditions.rec1')}</p>
                <p>• {t('conditions.rec2')}</p>
                <p>• {t('conditions.rec3')}</p>
                <p>• {t('conditions.rec4')}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Source Info */}
        <div className="text-center text-sm text-emerald-600">
          <p>{t('conditions.dataUpdated', { time: weatherData.lastUpdate })}</p>
        </div>
      </div>
    </div>
  );
}
