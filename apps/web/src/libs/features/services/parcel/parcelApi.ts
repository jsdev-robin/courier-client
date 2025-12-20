import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types/api-response';
import {
  FindOneParcel,
  FindParcelResponse,
  ParcelCreateRequest,
} from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation<SuccessResponse, ParcelCreateRequest>({
      query: (data) => ({
        url: '/parcel/customer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Parcels', 'Parcel'],
    }),

    findParcel: builder.query<FindParcelResponse, number>({
      query: (page) => ({
        url: `/parcel/customer?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Parcels'],
    }),

    findOneParcel: builder.query<FindOneParcel, string>({
      query: (id) => ({
        url: `/parcel/customer/${id}`,
        method: 'GET',
      }),
      providesTags: ['Parcel'],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useFindOneParcelQuery,
  useFindParcelQuery,
} = parcelApi;
