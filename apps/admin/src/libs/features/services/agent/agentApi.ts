import { apiSlice } from '../../api/api';
import { GetQueryParams } from '../../types/api-response';
import { FindAgentsResponse, FindAvailableAgentResponse } from './types';

export const agentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAgents: builder.query<FindAgentsResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/resources/admin/agent?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Agents'],
    }),
    findAvailableAgent: builder.query<FindAvailableAgentResponse, void>({
      query: () => ({
        url: `/resources/admin/agent/available`,
        method: 'GET',
      }),
      providesTags: ['AvailableAgent'],
    }),
  }),
});

export const { useFindAgentsQuery, useFindAvailableAgentQuery } = agentApi;
