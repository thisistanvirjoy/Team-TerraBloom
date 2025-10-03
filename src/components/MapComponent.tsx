import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

// Component to handle map updates
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
}

export default function MapComponent({ 
  center = [23.6850, 90.3563], // Bangladesh center
  zoom = 7,
  className = "h-full w-full"
}: MapComponentProps) {
  const mapRef = useRef<L.Map>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Sample bloom prediction data
  const bloomData = [
    {
      id: 1,
      position: [23.6850, 90.3563] as [number, number],
      district: 'Dhaka',
      bloomWindow: '1-2 weeks',
      confidence: 85,
      ndvi: 0.72,
      stage: 'Pre-bloom'
    },
    {
      id: 2,
      position: [22.3569, 91.7832] as [number, number],
      district: 'Chittagong',
      bloomWindow: '2-3 weeks',
      confidence: 78,
      ndvi: 0.68,
      stage: 'Early bloom'
    },
    {
      id: 3,
      position: [24.3636, 88.6241] as [number, number],
      district: 'Rajshahi',
      bloomWindow: '3-4 weeks',
      confidence: 92,
      ndvi: 0.81,
      stage: 'Peak bloom'
    },
    {
      id: 4,
      position: [23.1667, 89.2167] as [number, number],
      district: 'Khulna',
      bloomWindow: '1 week',
      confidence: 88,
      ndvi: 0.75,
      stage: 'Post-bloom'
    }
  ];

  const getMarkerColor = (stage: string) => {
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

  useEffect(() => {
    // Set map as ready after a short delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (mapError) {
    return (
      <div className={`${className} flex items-center justify-center bg-emerald-50 rounded-2xl border border-emerald-200`}>
        <div className="text-center text-emerald-700">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm">Map failed to load</p>
          <p className="text-xs text-emerald-600 mt-1">Please refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 rounded-2xl border border-emerald-200 z-10">
          <div className="text-center text-emerald-700">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-2xl"
        ref={mapRef}
        whenReady={() => setIsMapReady(true)}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bloomData.map((point) => (
          <Marker
            key={point.id}
            position={point.position}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `
                <div style="
                  background-color: ${getMarkerColor(point.stage)};
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
                <h3 className="font-bold text-emerald-900 mb-2">{point.district}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bloom Window:</span>
                    <span className="font-semibold text-emerald-700">{point.bloomWindow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className={`font-semibold ${getConfidenceColor(point.confidence)}`}>
                      {point.confidence}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NDVI:</span>
                    <span className="font-semibold text-emerald-700">{point.ndvi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stage:</span>
                    <span className="font-semibold" style={{ color: getMarkerColor(point.stage) }}>
                      {point.stage}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapUpdater center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}
