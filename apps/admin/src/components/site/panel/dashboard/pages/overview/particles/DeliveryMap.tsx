'use client';

import { useFitMarkers } from '@/hooks/useFitMarkers';
import { useFindMapMetricsParcelQuery } from '@/libs/features/services/analytics/parcelAnalyticsApi';
import { ParcelStatus, statusClass } from '@/utils/statusClass';
import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Map,
  MapLocateControl,
  MapMarker,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from '@repo/ui/components/map';
import { Skeleton } from '@repo/ui/components/skeleton';

const DeliveryMap = () => {
  const { data, isLoading, isError } = useFindMapMetricsParcelQuery();
  const locations = data?.data.metrics;
  const mapRef = useFitMarkers(locations);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Delivery Map</CardTitle>
        <CardDescription>247 active deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-100" />
        ) : (
          <Map center={[23.8103, 90.4125]} zoom={12} ref={mapRef}>
            <MapTileLayer />
            <MapZoomControl className="top-auto right-1 bottom-1 left-auto" />
            <MapLocateControl className="top-1" />
            {locations?.map((item, i) => (
              <MapMarker
                key={i}
                position={[item.coordinates[1], item.coordinates[0]]}
              >
                <MapTooltip side="bottom">
                  <div>
                    <div className="flex items-center gap-2">
                      <p>{item.trackingNumber}</p>
                      <Badge
                        className={statusClass[item.status as ParcelStatus]}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <address className="leading-relaxed text-sm">
                      <div className="font-medium">
                        {item.deliveryAddress.contactName}
                      </div>
                      <div className="text-muted-foreground">
                        {item.deliveryAddress.contactPhone}
                      </div>
                      <div>
                        {item.deliveryAddress.street},{' '}
                        {item.deliveryAddress.city}
                      </div>
                      <div>
                        {item.deliveryAddress.state},{' '}
                        {item.deliveryAddress.country} –{' '}
                        {item.deliveryAddress.postalCode}
                      </div>
                    </address>
                  </div>
                </MapTooltip>
              </MapMarker>
            ))}
          </Map>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;
