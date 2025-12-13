import { apiSlice } from '../../api/api';
import { FindPaymentTypeStatsResponse } from './types';

export const parcelAnalyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findPaymentTypeStatsParcel: builder.query<
      FindPaymentTypeStatsResponse,
      void
    >({
      query: () => ({
        url: `/analytics/parcel/payment-type-stats`,
        method: 'GET',
      }),
      providesTags: ['PaymentTypeStats'],
    }),
  }),
});

export const { useFindPaymentTypeStatsParcelQuery } = parcelAnalyticsApi;
