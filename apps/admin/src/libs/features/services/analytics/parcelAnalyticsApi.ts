import { apiSlice } from '../../api/api';
import {
  FindLast7DaysMetricsResponse,
  FindMapMetricsResponse,
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

    findMapMetricsToday: builder.query<FindMapMetricsResponse, void>({
      query: () => ({
        url: `/analytics/admin/parcel/metrics/locations/today`,
        method: 'GET',
      }),
      providesTags: ['MapMetricsToday'],
    }),

    findMapMetrics: builder.query<FindMapMetricsResponse, void>({
      query: () => ({
        url: `/analytics/admin/parcel/metrics/locations`,
        method: 'GET',
      }),
      providesTags: ['MapMetrics'],
    }),

    findTodayStatusDistributionMetricsParcel: builder.query<
      FindMapMetricsResponse,
      void
    >({
      query: () => ({
        url: `/analytics/admin/parcel/metrics/today/status/distribution`,
        method: 'GET',
      }),
      providesTags: ['TodayStatusDistributionMetrics'],
    }),
  }),
});

export const {
  useFindStatsMetricsParcelQuery,
  useFindLast7DaysMetricsParcelQuery,
  useFindMapMetricsTodayQuery,
  useFindMapMetricsQuery,
  useFindTodayStatusDistributionMetricsParcelQuery,
} = parcelAnalyticsApi;
