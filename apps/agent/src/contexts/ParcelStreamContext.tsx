'use client';

import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { apiSlice } from '../libs/features/api/api';
import { useAppDispatch } from '../libs/features/store';
import { createSocket } from '../libs/socket/socket';
import useUser from '../store/useUser';

const ns = createSocket('stream/admintToAgent');

const ParcelStreamContext = createContext<null>(null);

export const ParcelStreamProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const beepAudio = useRef<HTMLAudioElement | null>(null);
  const user = useUser();

  useEffect(() => {
    beepAudio.current = new Audio('/sounds/notification.mp3');

    ns.connect();
    if (user) {
      ns.on(`agent/${user._id}`, (data) => {
        console.log(data);

        if (data) {
          dispatch(
            apiSlice.util.invalidateTags([
              'AssignedParcel',
              'PerformanceMetrics',
              'StatsMetrics',
              'Last7DaysMetrics',
              'MapMetrics',
              'TodayStatusDistributionMetrics',
            ]),
          );

          toast(
            `${data.trackingNumber} booked. Category: ${data.parcelDetails.category}, Weight: ${data.parcelDetails.weight}kg`,
            { position: 'top-right' },
          );

          if (beepAudio.current) {
            beepAudio.current.currentTime = 0;
            beepAudio.current.play().catch(() => {});
          }
        }
      });
    }

    return () => {
      ns.off(`agent/${user?._id}`);
      ns.disconnect();
    };
  }, [dispatch, user]);

  return (
    <ParcelStreamContext.Provider value={null}>
      {children}
    </ParcelStreamContext.Provider>
  );
};

export const useParcelStream = () => useContext(ParcelStreamContext);
