import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types/api-response';
import {
  FindGeoNearParcelResponse,
  FindOneAndUpdateAssignParcel,
} from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findGeoNearParcel: builder.query<FindGeoNearParcelResponse, void>({
      query: () => ({
        url: `/parcel/admin/geo-near`,
        method: 'GET',
      }),
      providesTags: ['ParcelsGeoNear'],
    }),

    findOneAndUpdateAssignParcel: builder.mutation<
      SuccessResponse,
      FindOneAndUpdateAssignParcel
    >({
      query: ({ parcelId, agentId }) => ({
        url: `/parcel/admin/${parcelId}/${agentId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['ParcelsGeoNear'],
    }),

    findOneAndUpdateAssignAutoParcel: builder.mutation<SuccessResponse, string>(
      {
        query: (id) => ({
          url: `/parcel/admin/${id}/auto`,
          method: 'PATCH',
        }),
        invalidatesTags: ['ParcelsGeoNear'],
      },
    ),
  }),
});

export const {
  useFindGeoNearParcelQuery,
  useFindOneAndUpdateAssignParcelMutation,
  useFindOneAndUpdateAssignAutoParcelMutation,
} = parcelApi;
