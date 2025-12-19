import { apiSlice } from '../../api/api';
import { GetQueryParams, SuccessResponse } from '../../types/api-response';
import {
  FindGeoNearParcelResponse,
  FindOneAndUpdateAssignParcel,
  FindOneParcel,
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

    findOneParcel: builder.query<FindOneParcel, string>({
      query: (id) => ({
        url: `/parcel/admin/${id}`,
        method: 'GET',
      }),
      providesTags: ['Parcel'],
    }),

    findGeoNearParcel: builder.query<FindGeoNearParcelResponse, void>({
      query: () => ({
        url: `/parcel/admin/near`,
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
      invalidatesTags: [
        'Parcels',
        'Parcel',
        'ParcelsGeoNear',
        'AvailableAgent',
        'StatsMetrics',
        'Last7DaysMetrics',
        'MapMetrics',
        'TodayStatusDistributionMetrics',
      ],
    }),

    findOneAndUpdateAssignAutoParcel: builder.mutation<SuccessResponse, string>(
      {
        query: (id) => ({
          url: `/parcel/admin/${id}/auto`,
          method: 'PATCH',
        }),
        invalidatesTags: [
          'Parcels',
          'Parcel',
          'ParcelsGeoNear',
          'AvailableAgent',
          'StatsMetrics',
          'Last7DaysMetrics',
          'MapMetrics',
          'TodayStatusDistributionMetrics',
        ],
      },
    ),
  }),
});

export const {
  useFindParcelsQuery,
  useFindOneParcelQuery,
  useFindGeoNearParcelQuery,
  useFindOneAndUpdateAssignParcelMutation,
  useFindOneAndUpdateAssignAutoParcelMutation,
} = parcelApi;
