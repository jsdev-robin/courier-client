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
import { Skeleton } from '@repo/ui/components/skeleton';
import 'leaflet/dist/leaflet.css';
import { Car } from 'lucide-react';
import { useEffect } from 'react';
import { Polyline } from 'react-leaflet';

const DeliveryNavigation = ({ lat, lng }: { lat: string; lng: string }) => {
  const { location } = useAgentLocation();

  const { data, isLoading, refetch } = useFindNavigateQuery(
    {
      parcel: {
        lat: Number(lat),
        lng: Number(lng),
      },
      agent: {
        lat: Number(location?.latitude),
        lng: Number(location?.longitude),
      },
    },
    {
      skip: !location,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (location) refetch();
  }, [location, refetch]);

  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-9">
        {isLoading ? (
          <Skeleton className="h-[80vh]" />
        ) : (
          <Map center={[23.85, 90.2]} zoom={10} className="h-[80vh]">
            <MapTileLayer />
            <MapZoomControl className="top-auto right-1 bottom-1 left-auto" />
            <MapLocateControl className="top-1" />
            <Polyline positions={data?.data?.polyline ?? []} color="blue" />
            {data && data.data.polyline.length > 0 && (
              <>
                <MapMarker
                  position={data.data.polyline[data.data.polyline.length - 1]}
                />
                <MapMarker
                  icon={<Car className="size-6 fill-blue-600 stroke-white" />}
                  position={data.data.polyline[0]}
                />
              </>
            )}
          </Map>
        )}
      </div>
    </div>
  );
};

export default DeliveryNavigation;
