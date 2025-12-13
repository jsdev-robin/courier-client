import { apiSlice } from '../../api/api';
import { FindGeoNearParcelResponse } from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findGeoNearParcel: builder.query<FindGeoNearParcelResponse, void>({
      query: () => ({
        url: `/parcel/admin/geo-near`,
        method: 'GET',
      }),
      providesTags: ['ParcelsGeoNear'],
    }),
  }),
});

export const { useFindGeoNearParcelQuery } = parcelApi;
