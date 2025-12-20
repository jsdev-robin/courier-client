'use client';

import {
  ParcelCustomer,
  ParcelDeliveryAddress,
} from '@/libs/features/services/parcel/types';
import { createSocket } from '@/libs/socket/socket';
import MapAutoMove from '@/utils/MapAutoMove';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Map,
  MapMarker,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from '@repo/ui/components/map';
import { Car, Handbag, User } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  customer,
  deliveryAddress,
}: {
  agentId: string | undefined;
  customer: ParcelCustomer | undefined;
  deliveryAddress: ParcelDeliveryAddress | undefined;
}) => {
  const [agentLocation, setAgentLocation] = useState<GpsSpeedData | null>(null);

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
                lat={Number(agentLocation?.location?.latitude)}
                lng={Number(agentLocation?.location?.longitude)}
                zoom={14}
              />
              <MapMarker
                position={[
                  Number(agentLocation?.location?.latitude),
                  Number(agentLocation?.location?.longitude),
                ]}
                icon={<Car className="text-blue-500" />}
              >
                <MapTooltip side="bottom">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong>{agentLocation?.agent?.fullName}</strong>
                      {agentLocation.agent.avatar && (
                        <Avatar className="size-5">
                          <AvatarImage
                            src={agentLocation?.agent?.avatar?.url}
                          />
                          <AvatarFallback>
                            {agentLocation?.agent?.fullName}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    Email: {agentLocation?.agent?.email}
                    <br />
                    Phone: {agentLocation?.agent?.phone}
                    <br />
                    Vehicle Speed: {agentLocation?.speed} km/h
                  </div>
                </MapTooltip>
              </MapMarker>
            </>
          )}

          <MapMarker
            position={[
              Number(customer?.personalInfo.address.coordinates[0]),
              Number(customer?.personalInfo.address.coordinates[1]),
            ]}
            icon={<User className="text-blue-500" />}
          >
            <MapTooltip side="bottom">
              <div>
                <div className="flex items-center gap-2">
                  <strong>
                    {customer?.personalInfo.familyName}{' '}
                    {customer?.personalInfo.givenName}
                  </strong>
                  {customer?.personalInfo?.avatar && (
                    <Avatar className="size-5">
                      <AvatarImage src={agentLocation?.agent?.avatar?.url} />
                      <AvatarFallback>
                        {agentLocation?.agent?.fullName}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                Email: {customer?.personalInfo?.email}
                <br />
                Phone: {customer?.personalInfo?.phone}
              </div>
            </MapTooltip>
          </MapMarker>
          <MapMarker
            position={[
              Number(deliveryAddress?.location.coordinates[0]),
              Number(deliveryAddress?.location.coordinates[1]),
            ]}
            icon={<Handbag className="text-blue-500" />}
          >
            <MapTooltip side="bottom">
              <div>
                <strong>{deliveryAddress?.contactName} </strong>
                Phone: {deliveryAddress?.contactPhone}
              </div>
            </MapTooltip>
          </MapMarker>
          <MapTileLayer />
          <MapZoomControl />
        </Map>
      </CardContent>
    </Card>
  );
};

export default ParcelLiveTrackingMap;
