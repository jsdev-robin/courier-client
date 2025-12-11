import { apiSlice } from '../../api/api';
import {
  AIMetaProductDescriptionResponse,
  AIMetaProductFieldRequest,
  AIMetaProductSeoResponse,
} from './types';

export const apiMetaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateProductSeoMeta: builder.mutation<
      AIMetaProductSeoResponse,
      AIMetaProductFieldRequest
    >({
      query: (data) => ({
        url: '/aimeta/product/seo',
        method: 'POST',
        body: data,
      }),
    }),
    generateProductDescriptionMeta: builder.mutation<
      AIMetaProductDescriptionResponse,
      AIMetaProductFieldRequest
    >({
      query: (data) => ({
        url: '/aimeta/product/description',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGenerateProductSeoMetaMutation,
  useGenerateProductDescriptionMetaMutation,
} = apiMetaApi;
