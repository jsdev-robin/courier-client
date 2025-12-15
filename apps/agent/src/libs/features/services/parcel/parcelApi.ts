import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types/api-response';
import { findOneAndUpdateStatusParcel, FindParcelResponse } from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findParcel: builder.query<FindParcelResponse, void>({
      query: () => ({
        url: `/parcel/agent`,
        method: 'GET',
      }),
      providesTags: ['AssignedParcel'],
    }),

    findOneAndUpdateStatusParcel: builder.mutation<
      SuccessResponse,
      findOneAndUpdateStatusParcel
    >({
      query: ({ trackingNumber, status }) => ({
        url: `/parcel/agent/${trackingNumber}/qr`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['AssignedParcel'],
    }),
  }),
});

export const { useFindParcelQuery, useFindOneAndUpdateStatusParcelMutation } =
  parcelApi;
