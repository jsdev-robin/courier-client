'use client';

import { createSocket } from '@/libs/socket/socket';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  Map,
  MapMarker,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from '@repo/ui/components/map';
import { Car } from 'lucide-react';
import { useEffect, useState } from 'react';

const ns = createSocket('agent/stream/location');

type AgentData = {
  location: { longitude: number; latitude: number };
  speed: number;
  agent: {
    id: string;
    fullName?: string;
    email?: string;
    phone?: string;
    avatar: { url: string };
  };
};

const LiveTrackingMap = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);

  useEffect(() => {
    ns.connect();
    ns.on('allAgents', (data: AgentData[]) => {
      if (data) setAgents(data);
    });

    return () => {
      ns.off('allAgents');
      ns.disconnect();
    };
  }, []);

  return (
    <Map center={[23.8617, 90.0003]} zoom={7} className="min-h-[80vh]">
      <MapTileLayer />
      <MapZoomControl />
      {agents.map((agentData) => (
        <MapMarker
          key={agentData.agent.id}
          position={[agentData.location.latitude, agentData.location.longitude]}
          icon={<Car className="fill-blue-500" />}
        >
          <MapTooltip side="bottom">
            <div>
              <div className="flex items-center gap-2">
                <strong>{agentData.agent.fullName}</strong>
                {agentData.agent.avatar && (
                  <Avatar className="size-5">
                    <AvatarImage src={agentData.agent.avatar.url} />
                    <AvatarFallback>{agentData.agent.fullName}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              Email: {agentData.agent.email}
              <br />
              Phone: {agentData.agent.phone}
              <br />
              Vehicle Speed: {agentData.speed} km/h
            </div>
          </MapTooltip>
        </MapMarker>
      ))}
    </Map>
  );
};

export default LiveTrackingMap;
