import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SimpleMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  activeLayers?: { ndvi: boolean; rain: boolean; soil: boolean; bloom: boolean };
  gibs?: boolean;
  gibsLayer?: string;
  gibsDate?: string; // YYYY-MM-DD
  timeKey?: '2020' | '2023' | '2025';
  mode?: 'local' | 'global';
}

export default function SimpleMap({ 
  center = [23.6850, 90.3563],
  zoom = 7,
  className = "h-full w-full",
  activeLayers = { ndvi: true, rain: false, soil: false, bloom: true },
  gibs = false,
  gibsLayer = 'MODIS_Terra_CorrectedReflectance_Bands721',
  gibsDate,
  timeKey = '2025',
  mode = 'local',
}: SimpleMapProps) {
  // no-op ref kept if needed in future
  const { t } = useTranslation();

  // All division data with coordinates
  const divisionData = [
    {
      id: 1,
      name: 'Dhaka',
      position: [23.6850, 90.3563] as [number, number],
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
      position: [22.3569, 91.7832] as [number, number],
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
      position: [24.3636, 88.6241] as [number, number],
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
      position: [23.1667, 89.2167] as [number, number],
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
      position: [24.8949, 91.8687] as [number, number],
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
      position: [22.7010, 90.3535] as [number, number],
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
      position: [24.7500, 90.4000] as [number, number],
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
      position: [25.7500, 89.2500] as [number, number],
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

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Pre-bloom': return '#10b981'; // emerald-500
      case 'Early bloom': return '#f59e0b'; // amber-500
      case 'Peak bloom': return '#ef4444'; // red-500
      case 'Post-bloom': return '#6b7280'; // gray-500
      default: return '#10b981';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-2xl"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gibs && (
          <TileLayer
            opacity={0.7}
            attribution="NASA GIBS"
            url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${gibsLayer}/default/${gibsDate || new Date(Date.now()-3*24*60*60*1000).toISOString().slice(0,10)}/{z}/{y}/{x}.jpg`}
          />
        )}
        {/* Static Preview Layers (PNG overlays approximated with rectangles here) */}
        <LayerGroup>
          {/* vary opacity slightly by timeKey to simulate differences */}
          {activeLayers.ndvi && (
            <Rectangle
              bounds={mode === 'local' ? [[25.9, 88.0], [20.5, 92.5]] : [[50, -130], [-50, 130]]}
              pathOptions={{ color: '#10b981', weight: 0, fillColor: '#10b981', fillOpacity: timeKey === '2020' ? 0.1 : timeKey === '2023' ? 0.14 : 0.18 }}
            />
          )}
          {activeLayers.rain && (
            <Rectangle
              bounds={mode === 'local' ? [[26.5, 88.3], [21.0, 92.0]] : [[40, -100], [-20, 70]]}
              pathOptions={{ color: '#3b82f6', weight: 0, fillColor: '#3b82f6', fillOpacity: timeKey === '2020' ? 0.1 : 0.12 }}
            />
          )}
          {activeLayers.soil && (
            <Rectangle
              bounds={mode === 'local' ? [[26.2, 88.6], [21.4, 92.2]] : [[35, -80], [-10, 90]]}
              pathOptions={{ color: '#f59e0b', weight: 0, fillColor: '#f59e0b', fillOpacity: timeKey === '2025' ? 0.14 : 0.1 }}
            />
          )}
          {activeLayers.bloom && (
            <Rectangle
              bounds={mode === 'local' ? [[25.2, 88.8], [21.8, 92.3]] : [[30, -60], [-5, 110]]}
              pathOptions={{ color: '#ef4444', weight: 0, fillColor: '#ef4444', fillOpacity: timeKey === '2023' ? 0.12 : 0.1 }}
            />
          )}
        </LayerGroup>
        
        {divisionData.map((division) => (
          <Marker
            key={division.id}
            position={division.position}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `
                <div style="
                  background-color: ${getStageColor(division.stage)};
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                "></div>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup className="bloom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-emerald-900 mb-2">
                  {t(`divisions.names.${division.name.toLowerCase()}`)}
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bloom Window:</span>
                    <span className="font-semibold text-emerald-700">{division.bloomWindow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className={`font-semibold ${getConfidenceColor(division.confidence)}`}>
                      {division.confidence}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NDVI:</span>
                    <span className="font-semibold text-emerald-700">{division.ndvi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-semibold text-emerald-700">{division.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rainfall:</span>
                    <span className="font-semibold text-emerald-700">{division.rainfall}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Soil Moisture:</span>
                    <span className="font-semibold text-emerald-700">{division.soilMoisture}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stage:</span>
                    <span className="font-semibold" style={{ color: getStageColor(division.stage) }}>
                      {division.stage}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600 mt-2 pt-2 border-t border-emerald-100">
                    Last updated: {division.lastUpdate}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
