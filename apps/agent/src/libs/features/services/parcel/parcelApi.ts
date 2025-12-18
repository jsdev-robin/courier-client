import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types/api-response';
import { findOneAndUpdateStatusParcel, FindParcelResponse } from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findParcel: builder.query<FindParcelResponse, number>({
      query: (page) => ({
        url: `/parcel/agent?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['AssignedParcel'],
    }),

    findOneAndUpdateStatusParcel: builder.mutation<
      SuccessResponse,
      findOneAndUpdateStatusParcel
    >({
      query: ({ trackingNumber, status }) => ({
        url: `/parcel/agent/${trackingNumber}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: [
        'AssignedParcel',
        'PerformanceMetrics',
        'StatsMetrics',
        'Last7DaysMetrics',
        'MapMetrics',
        'TodayStatusDistributionMetrics',
      ],
    }),
  }),
});

export const { useFindParcelQuery, useFindOneAndUpdateStatusParcelMutation } =
  parcelApi;
