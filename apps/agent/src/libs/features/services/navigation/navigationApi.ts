import { apiSlice } from '../../api/api';
import {
  FindDurationRequest,
  FindDurationResponse,
  FindNavigateResponse,
} from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FindNavigate: builder.query<FindNavigateResponse, FindDurationRequest>({
      query: ({ parcel, agent }) => ({
        url: `/resources/navigation/navigate`,
        method: 'GET',
        params: {
          endLat: parcel.lat,
          endLng: parcel.lng,
          startLat: agent.lat,
          startLng: agent.lng,
        },
      }),
    }),
    FindDuration: builder.query<FindDurationResponse, FindDurationRequest>({
      query: ({ parcel, agent }) => ({
        url: `/resources/navigation/duration`,
        method: 'GET',
        params: {
          endLat: parcel.lat,
          endLng: parcel.lng,
          startLat: agent.lat,
          startLng: agent.lng,
        },
      }),
    }),
  }),
});

export const { useFindNavigateQuery, useFindDurationQuery } = parcelApi;
