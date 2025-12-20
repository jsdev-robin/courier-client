'use client';

import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useRealTimeLocation } from '../hooks/useRealTimeLocation';
import { createSocket } from '../libs/socket/socket';
import useUser from '../store/useUser';

const ns = createSocket('agent/sharing/location');

const LocationSharingRoomContext = createContext<null>(null);

export const LocationSharingRoomProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { location, speed } = useRealTimeLocation();
  const user = useUser();

  useEffect(() => {
    if (user?._id) {
      ns.emit('joinAgentRoom', user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    if (location && user) {
      ns.emit('agentSharingLocation', {
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
  }, [location, user, speed]);

  return (
    <LocationSharingRoomContext.Provider value={null}>
      {children}
    </LocationSharingRoomContext.Provider>
  );
};

export const useParcelStream = () => useContext(LocationSharingRoomContext);
