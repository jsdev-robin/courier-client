import { apiSlice } from "../../api/api";
import { GetQueryParams, SuccessResponse } from "../../types/api-response";
import {
  BrandUpdateRequest,
  FindBrandsResponse,
  FindByIdAndUpdateBrandResponse,
  FindByIdBrandResponse,
} from "./types";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation<SuccessResponse, FormData>({
      query: (data) => ({
        url: "/store/admin/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),

    findBrands: builder.query<FindBrandsResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/store/admin/brand?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams.toLowerCase()}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: "GET" };
      },
      providesTags: ["Brands"],
    }),

    findByIdBrand: builder.query<FindByIdBrandResponse, string>({
      query: (id) => ({
        url: `/store/admin/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    findByIdAndUpdateBrand: builder.mutation<
      FindByIdAndUpdateBrandResponse,
      BrandUpdateRequest
    >({
      query: ({ id, ...data }) => ({
        url: `/store/admin/brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Brands", "Brand"],
    }),

    findByIdAndDeleteBrand: builder.mutation<void, string>({
      query: (id) => ({
        url: `/store/admin/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands", "Brand"],
    }),

    findByIdAndUpdateImageBrand: builder.mutation<
      FindByIdAndUpdateBrandResponse,
      FormData
    >({
      query: (body) => ({
        url: `/store/admin/brand/${body.get("id")}/image`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Brands", "Brand"],
    }),

    findByIdAndUpdateStatusBrand: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/admin/brand/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Brands", "Brand"],
    }),
  }),
});

export const {
  useFindBrandsQuery,
  useCreateBrandMutation,
  useFindByIdBrandQuery,
  useFindByIdAndUpdateBrandMutation,
  useFindByIdAndDeleteBrandMutation,
  useFindByIdAndUpdateImageBrandMutation,
  useFindByIdAndUpdateStatusBrandMutation,
} = categoryApi;
