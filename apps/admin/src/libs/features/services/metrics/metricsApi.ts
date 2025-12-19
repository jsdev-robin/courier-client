import { apiSlice } from '../../api/api';
import {
  FindPaymentTypeMetricsResponse,
  FindProfitLossMetricsResponse,
  FindStatusDistributionMetricsResponse,
  FindStatusMonthlyMetricsResponse,
} from './types';

export const metricsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findPaymentTypeMetrics: builder.query<
      FindPaymentTypeMetricsResponse,
      { from?: string; to?: string } | undefined
    >({
      query: (date) => ({
        url: `/analytics/admin/metrics/parcel/payment`,
        method: 'GET',
        params: {
          from: date?.from,
          to: date?.to,
        },
      }),
      providesTags: ['RangePaymentMetrics'],
    }),

    findStatusDistributionMetrics: builder.query<
      FindStatusDistributionMetricsResponse,
      { from?: string; to?: string } | undefined
    >({
      query: (date) => ({
        url: `/analytics/admin/metrics/parcel/status/distribution`,
        method: 'GET',
        params: {
          from: date?.from,
          to: date?.to,
        },
      }),
      providesTags: ['RangeStatusMetrics'],
    }),

    findStatusMonthlyMetrics: builder.query<
      FindStatusMonthlyMetricsResponse,
      void
    >({
      query: () => ({
        url: `/analytics/admin/metrics/parcel/status/monthly`,
        method: 'GET',
      }),
      providesTags: ['StatusMonthlyMetrics'],
    }),

    findProfitLossMonthlyMetrics: builder.query<
      FindStatusMonthlyMetricsResponse,
      void
    >({
      query: () => ({
        url: `/analytics/admin/metrics/parcel/profit/monthly`,
        method: 'GET',
      }),
      providesTags: ['ProfitLossMonthlyMetrics'],
    }),

    findProfitLossMetrics: builder.query<
      FindProfitLossMetricsResponse,
      { from?: string; to?: string } | undefined
    >({
      query: (date) => ({
        url: `/analytics/admin/metrics/parcel/profit/lose`,
        method: 'GET',
        params: {
          from: date?.from,
          to: date?.to,
        },
      }),
      providesTags: ['ProfitLossMetrics'],
    }),
  }),
});

export const {
  useFindPaymentTypeMetricsQuery,
  useFindStatusDistributionMetricsQuery,
  useFindStatusMonthlyMetricsQuery,
  useFindProfitLossMonthlyMetricsQuery,
  useFindProfitLossMetricsQuery,
} = metricsApi;
