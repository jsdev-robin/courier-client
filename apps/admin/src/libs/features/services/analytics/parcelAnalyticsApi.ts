import { apiSlice } from '../../api/api';
import {
  FindLast7DaysMetricsResponse,
  FindStatsMetricsResponse,
} from './types';

export const parcelAnalyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findStatsMetricsParcel: builder.query<FindStatsMetricsResponse, void>({
      query: () => ({
        url: `/analytics/admin/parcel/metrics/stats`,
        method: 'GET',
      }),
      providesTags: ['StatsMetrics'],
    }),

    findLast7DaysMetricsParcel: builder.query<
      FindLast7DaysMetricsResponse,
      void
    >({
      query: () => ({
        url: `/analytics/admin/parcel/metrics/last7days`,
        method: 'GET',
      }),
      providesTags: ['Last7DaysMetrics'],
    }),
  }),
});

export const {
  useFindStatsMetricsParcelQuery,
  useFindLast7DaysMetricsParcelQuery,
} = parcelAnalyticsApi;
