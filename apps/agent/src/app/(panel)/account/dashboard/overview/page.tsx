'use client';

import { useRealTimeLocation } from '@/hooks/useRealTimeLocation';
import { createSocket } from '@/libs/socket/socket';
import { useEffect } from 'react';

const customerSocket = createSocket('agent/location');

const Overview = () => {
  const { location } = useRealTimeLocation();

  useEffect(() => {
    if (location) {
      customerSocket.emit('agentLiveLocation', {
        longitude: location.longitude,
        latitude: location.latitude,
      });
    }
  }, [location]);

  return <div>Overview</div>;
};

export default Overview;
