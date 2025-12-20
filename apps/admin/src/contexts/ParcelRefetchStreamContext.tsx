'use client';

import { createContext, ReactNode, useContext, useEffect } from 'react';
import { apiSlice } from '../libs/features/api/api';
import { useAppDispatch } from '../libs/features/store';
import { createSocket } from '../libs/socket/socket';

const ns = createSocket('stream/agentToAdmin');

const ParcelRefetchStreamContext = createContext<null>(null);

export const ParcelRefetchStreamProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    ns.connect();
    ns.on('updateRefetch', (data) => {
      console.log(data);
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
      }
    });

    return () => {
      ns.off('updateRefetch');
      ns.disconnect();
    };
  }, [dispatch]);

  return (
    <ParcelRefetchStreamContext.Provider value={null}>
      {children}
    </ParcelRefetchStreamContext.Provider>
  );
};

export const useParcelStream = () => useContext(ParcelRefetchStreamContext);
