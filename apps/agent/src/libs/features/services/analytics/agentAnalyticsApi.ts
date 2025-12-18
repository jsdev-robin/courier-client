import { apiSlice } from '../../api/api';
import { FindPerformanceResponse } from './types';

export const agentAnalyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findPerformanceAgent: builder.query<FindPerformanceResponse, void>({
      query: () => ({
        url: `/analytics/agent/parcel/metrics/performance`,
        method: 'GET',
      }),
      providesTags: ['PerformanceMetrics'],
    }),
  }),
});

export const { useFindPerformanceAgentQuery } = agentAnalyticsApi;
