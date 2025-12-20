'use client';

import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { apiSlice } from '../libs/features/api/api';
import { useAppDispatch } from '../libs/features/store';
import { createSocket } from '../libs/socket/socket';

const ns = createSocket('stream/userToAdmin');

const ParcelStreamContext = createContext<null>(null);

export const ParcelStreamProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const beepAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beepAudio.current = new Audio('/sounds/notification.mp3');

    ns.connect();
    ns.on('insertParcel', (data) => {
      if (data) {
        dispatch(
          apiSlice.util.invalidateTags([
            'Parcels',
            'Parcel',
            'NearestToday',
            'Nearest',
            'Agents',
            'AvailableAgent',
            'StatsMetrics',
            'Last7DaysMetrics',
            'MapMetricsToday',
            'MapMetrics',
            'TodayStatusDistributionMetrics',
            'RangePaymentMetrics',
            'RangeStatusMetrics',
            'StatusMonthlyMetrics',
            'ProfitLossMonthlyMetrics',
            'ProfitLossMetrics',
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

    return () => {
      ns.off('insertParcel');
      ns.disconnect();
    };
  }, [dispatch]);

  return (
    <ParcelStreamContext.Provider value={null}>
      {children}
    </ParcelStreamContext.Provider>
  );
};

export const useParcelStream = () => useContext(ParcelStreamContext);
