import { apiSlice } from '../../api/api';
import {
  FindDurationRequest,
  FindDurationResponse,
  FindNavigateResponse,
} from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FindNavigate: builder.query<FindNavigateResponse, FindDurationRequest>({
      query: ({ location }) => ({
        url: `/resources/navigation/navigate`,
        method: 'GET',
        params: {
          location: location,
        },
      }),
    }),
    FindDuration: builder.query<FindDurationResponse, FindDurationRequest>({
      query: ({ location }) => ({
        url: `/resources/navigation/duration`,
        method: 'GET',
        params: {
          location: location,
        },
      }),
    }),
  }),
});

export const { useFindNavigateQuery, useFindDurationQuery } = parcelApi;
