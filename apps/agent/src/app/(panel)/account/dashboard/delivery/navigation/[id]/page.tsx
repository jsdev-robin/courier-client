'use client';

import { useAgentLocation } from '@/contexts/LocationContext';
import { useFindNavigateQuery } from '@/libs/features/services/navigation/navigationApi';
import {
  Map,
  MapLocateControl,
  MapMarker,
  MapTileLayer,
  MapZoomControl,
} from '@repo/ui/components/map';
import 'leaflet/dist/leaflet.css';
import { Car } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Polyline } from 'react-leaflet';

const Navigate: React.FC = () => {
  const { location } = useAgentLocation();
  const searchParams = useSearchParams();
  const parcel = searchParams.get('data');
  const coords = parcel ? JSON.parse(parcel) : null;
  const query = useFindNavigateQuery({
    parcel: coords.parcel,
    agent: {
      lat: Number(location?.latitude),
      lng: Number(location?.longitude),
    },
  });

  const data = query.data;

  return (
    <Map center={[23.85, 90.2]} zoom={10} className="h-[80vh]">
      <MapTileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapZoomControl className="top-auto right-1 bottom-1 left-auto" />
      <MapLocateControl className="top-1" />
      {data && <Polyline positions={data.data.polyline} color="blue" />}
      {data && data.data.polyline.length > 0 && (
        <MapMarker
          position={data.data.polyline[data.data.polyline.length - 1]}
        />
      )}
      {data && data.data.polyline.length > 0 && (
        <MapMarker
          icon={<Car className="size-6 fill-blue-600 stroke-white" />}
          position={data.data.polyline[0]}
        />
      )}
    </Map>
  );
};

export default Navigate;
