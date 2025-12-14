import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types/api-response';
import {
  FindOneAndUpdateStatusBytrackingNumberRequest,
  FindParcelResponse,
} from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findParcel: builder.query<FindParcelResponse, void>({
      query: () => ({
        url: `/parcel/agent`,
        method: 'GET',
      }),
      providesTags: ['AssignedParcel'],
    }),

    findOneAndUpdateStatusBytrackingNumberParcel: builder.mutation<
      SuccessResponse,
      FindOneAndUpdateStatusBytrackingNumberRequest
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

export const {
  useFindParcelQuery,
  useFindOneAndUpdateStatusBytrackingNumberParcelMutation,
} = parcelApi;
