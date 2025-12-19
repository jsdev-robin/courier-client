'use client';

import { createSocket } from '@/libs/socket/socket';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from '@repo/ui/components/map';
import { Car } from 'lucide-react';
import { useEffect, useState } from 'react';
import MapAutoMove from '../../../../../../../../utils/MapAutoMove';

interface GpsSpeedData {
  position: { lat: number; lng: number };
  speed: number;
  member: string;
}

const agentSocket = createSocket('agent/stream/location');

const ParcelLiveTrackingMap = ({
  agentId,
}: {
  agentId: string | undefined;
}) => {
  const [agentLocation, setAgentLocation] = useState<GpsSpeedData | null>(null);
  useEffect(() => {
    if (agentId) {
      agentSocket.connect();
      agentSocket.emit('joinAdminRoom', `agentId/${agentId}`);
      agentSocket.on(`agentId/${agentId}`, (data: GpsSpeedData) => {
        setAgentLocation(data);
      });
      return () => {
        agentSocket.off(`agentId/${agentId}`);
        agentSocket.disconnect();
      };
    }
  }, [agentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Tracking Map</CardTitle>
      </CardHeader>
      <CardContent>
        <Map center={[23.8617, 90.0003]} zoom={7}>
          {agentLocation?.position && (
            <>
              <MapAutoMove
                lat={Number(agentLocation?.position.lat)}
                lng={Number(agentLocation?.position.lng)}
                zoom={14}
              />
              <MapMarker
                position={[
                  Number(agentLocation?.position.lat),
                  Number(agentLocation?.position.lng),
                ]}
                icon={<Car className="text-blue-500" />}
              >
                <MapPopup>A map component for shadcn/ui.</MapPopup>
              </MapMarker>
            </>
          )}
          <MapTileLayer />
          <MapZoomControl />
        </Map>
      </CardContent>
    </Card>
  );
};

export default ParcelLiveTrackingMap;
