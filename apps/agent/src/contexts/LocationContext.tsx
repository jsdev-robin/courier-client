'use client';

import { createSocket } from '@/libs/socket/socket';
import { createContext, useContext } from 'react';
import type { Socket } from 'socket.io-client';

interface LocationContextValue {
  socket: Socket;
}

const LocationContext = createContext<LocationContextValue | null>(null);

const agentSocket = createSocket('agent/location');

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const { location } = useRealTimeLocation();

  // useEffect(() => {
  //   if (location) {
  //     agentSocket.emit('agentLiveLocation', {
  //       longitude: location.longitude,
  //       latitude: location.latitude,
  //     });
  //   }
  // }, [location]);

  return (
    <LocationContext.Provider value={{ socket: agentSocket }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useAgentLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('LocationProvider missing');
  return context;
};
