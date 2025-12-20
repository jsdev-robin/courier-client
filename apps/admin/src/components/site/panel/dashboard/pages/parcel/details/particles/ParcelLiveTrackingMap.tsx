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
  location: {
    latitude: number;
    longitude: number;
  };
  speed: number;
  agent: {
    id: string;
    fullName?: string;
    email?: string;
    phone?: string;
    avatar: {
      url: string;
    };
  };
}

const agentSocket = createSocket('agent/sharing/location');

const ParcelLiveTrackingMap = ({
  agentId,
}: {
  agentId: string | undefined;
}) => {
  const [agentLocation, setAgentLocation] = useState<GpsSpeedData | null>(null);

  console.log(agentLocation);

  useEffect(() => {
    if (agentId) {
      agentSocket.connect();
      agentSocket.emit('joinAdminRoom', `${agentId}`);
      agentSocket.on(`${agentId}`, (data: GpsSpeedData) => {
        setAgentLocation(data);
      });
      return () => {
        agentSocket.off(`${agentId}`);
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
          {agentLocation?.location && (
            <>
              <MapAutoMove
                lat={Number(agentLocation.location.latitude)}
                lng={Number(agentLocation.location.longitude)}
                zoom={14}
              />
              <MapMarker
                position={[
                  Number(agentLocation.location.latitude),
                  Number(agentLocation.location.longitude),
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
