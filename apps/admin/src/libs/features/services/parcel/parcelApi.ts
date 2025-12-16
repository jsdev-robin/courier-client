import { apiSlice } from '../../api/api';
import { GetQueryParams, SuccessResponse } from '../../types/api-response';
import {
  FindGeoNearParcelResponse,
  FindOneAndUpdateAssignParcel,
  FindParcelsResponse,
} from './types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findParcels: builder.query<FindParcelsResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/parcel/admin?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Parcels'],
    }),

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
  useFindParcelsQuery,
  useFindGeoNearParcelQuery,
  useFindOneAndUpdateAssignParcelMutation,
  useFindOneAndUpdateAssignAutoParcelMutation,
} = parcelApi;
