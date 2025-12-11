import { apiSlice } from '../../api/api';
import { GetQueryParams, SuccessResponse } from '../../types/api-response';
import {
  FindOneAndUpdateStatusRequest,
  FindProductResponse,
  FindProductsResponse,
  ProductCreateRequest,
  ProductUpdateRequest,
} from './types';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<SuccessResponse, ProductCreateRequest>({
      query: (data) => ({
        url: '/store/seller/product',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    findProduct: builder.query<FindProductsResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/store/seller/product?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Products'],
    }),

    findOneProduct: builder.query<FindProductResponse, string>({
      query: (id) => ({
        url: `/store/seller/product/${id}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),

    findOneAndUpdate: builder.mutation<SuccessResponse, ProductUpdateRequest>({
      query: ({ id, ...data }) => ({
        url: `/store/seller/product/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    findOneAndUpdateMediaImage: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/seller/product/${id}/image`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    findOneAndUpdateMediaVideo: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/seller/product/${id}/video`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    findOneAndUpdateStatusArchived: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/seller/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    findOneAndUpdateStatus: builder.mutation<
      SuccessResponse,
      FindOneAndUpdateStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/store/seller/product/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Products', 'Product'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useFindProductQuery,
  useFindOneProductQuery,
  useFindOneAndUpdateMutation,
  useFindOneAndUpdateMediaImageMutation,
  useFindOneAndUpdateMediaVideoMutation,
  useFindOneAndUpdateStatusArchivedMutation,
  useFindOneAndUpdateStatusMutation,
} = productApi;
