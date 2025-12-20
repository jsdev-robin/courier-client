'use client';

import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useRealTimeLocation } from '../hooks/useRealTimeLocation';
import { createSocket } from '../libs/socket/socket';
import useUser from '../store/useUser';

const ns = createSocket('agent/stream/location');

const StreamLiveLocationContext = createContext<null>(null);

export const StreamLiveLocationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { location, speed } = useRealTimeLocation();
  const user = useUser();

  useEffect(() => {
    if (location && user) {
      ns.emit('agentLocationStream', {
        location: {
          longitude: location.longitude,
          latitude: location.latitude,
        },
        speed: speed ?? 0,
        agent: {
          id: user._id,
          fullName: user?.personalInfo.displayName,
          email: user?.personalInfo.email,
          phone: user?.personalInfo.phone,
          avatar: {
            url: user?.personalInfo.avatar?.url,
          },
        },
      });
    }
  }, [location, user]);

  return (
    <StreamLiveLocationContext.Provider value={null}>
      {children}
    </StreamLiveLocationContext.Provider>
  );
};

export const useParcelStream = () => useContext(StreamLiveLocationContext);
