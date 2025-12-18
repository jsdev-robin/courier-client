'use client';

import { useFindNavigateQuery } from '@/libs/features/services/navigation/navigationApi';
import { buttonVariants } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import {
  Map,
  MapLocateControl,
  MapMarker,
  MapTileLayer,
  MapZoomControl,
} from '@repo/ui/components/map';
import { Skeleton } from '@repo/ui/components/skeleton';
import Typography from '@repo/ui/components/typography';
import { cn } from '@repo/ui/lib/utils';
import { Car, Handbag, Phone } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Polyline } from 'react-leaflet';

const Navigation = () => {
  const { lat, lng } = useParams<{ lat: string; lng: string }>();
  const { data, isLoading } = useFindNavigateQuery(
    {
      location: [lat, lng],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <section className="-m-4">
      <div className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-9">
            {isLoading ? (
              <Skeleton className="min-h-[calc(100vh-50px)]" />
            ) : (
              <Map
                center={[23.85, 90.2]}
                className="min-h-[calc(100vh-50px)] rounded-none"
                zoom={8}
              >
                <MapTileLayer />
                <MapZoomControl />
                <MapLocateControl
                  watch={true}
                  icon={<Car className="size-6 fill-blue-600 stroke-white" />}
                />
                <Polyline positions={data?.data?.polyline ?? []} color="blue" />
                {data && data.data.polyline.length > 0 && (
                  <>
                    <MapMarker
                      icon={<Handbag className="size-6 stroke-blue-500" />}
                      position={
                        data.data.polyline[data.data.polyline.length - 1]
                      }
                    />
                    <MapMarker position={data.data.polyline[0]} />
                  </>
                )}
              </Map>
            )}
          </div>
          <div className="md:col-span-3 h-[calc(100vh-50px)] overflow-y-auto">
            <div className="bg-[linear-gradient(135deg,#10b981_0%,#047857_100%)] p-4">
              <Heading as="h6" className="text-white">
                Active Navigation
              </Heading>
              <Typography variant="sm" className="text-white">
                Delivering to destination
              </Typography>
            </div>
            <div className="p-4">
              <p>
                <strong>Distance:</strong>{' '}
                {data?.data.distance
                  ? `${data?.data.distance}`
                  : 'Calculating...'}
              </p>
              <p>
                <strong>Duration:</strong>{' '}
                {data?.data.distance ? data?.data.distance : 'Calculating...'}
              </p>
            </div>
            <ul className="space-y-2 p-4">
              {data?.data.navigation.map((item, i) => (
                <li key={i}>
                  {i}. {item.instruction} (
                  {(item.distance / 1609.344).toFixed(2)} mile)
                </li>
              ))}
            </ul>
            <div className="bottom-0 bg-foreground p-4 w-full sticky">
              <Link
                href={`tel:01734`}
                className={cn(buttonVariants(), 'w-full')}
              >
                <Phone />
                Call customer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
