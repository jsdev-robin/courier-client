import { apiSlice } from '../../api/api';
import { FindDurationRequest, FindDurationResponse } from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useFindDurationQuery } = parcelApi;
