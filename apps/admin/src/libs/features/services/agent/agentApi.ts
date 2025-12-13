import { apiSlice } from '../../api/api';
import { FindAvailableAgentResponse } from './types';

export const agentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAvailableAgent: builder.query<FindAvailableAgentResponse, void>({
      query: () => ({
        url: `/resources/agent/available`,
        method: 'GET',
      }),
      providesTags: ['AvailableAgent'],
    }),
  }),
});

export const { useFindAvailableAgentQuery } = agentApi;
