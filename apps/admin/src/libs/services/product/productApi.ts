import { apiSlice } from '../../api/api';
import { GetQueryParams, SuccessResponse } from '../../types/api-response';
import { FindProductResponse } from './types';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findProduct: builder.query<FindProductResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/store/admin/product?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Products'],
    }),

    findOneAndUpdateActiveProduct: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/admin/product/${id}/activate`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    findOneAndUpdateDeactiveProduct: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/admin/product/${id}/deactivate`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    findOneAndUpdateStatusRecycleBinProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/store/admin/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),
  }),
});

export const {
  useFindProductQuery,
  useFindOneAndUpdateActiveProductMutation,
  useFindOneAndUpdateDeactiveProductMutation,
  useFindOneAndUpdateStatusRecycleBinProductMutation,
} = productApi;
