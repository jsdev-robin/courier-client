import { apiSlice } from "../../api/api";
import { SuccessResponse } from "../../types/api-response";
import { CategoryOptions, CategoryRequest } from "./types";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPrimaryCategory: builder.mutation<SuccessResponse, FormData>({
      query: (data) => ({
        url: "/store/admin/category/primary",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PrimaryCategoryOptions"],
    }),
    addSecondary: builder.mutation<SuccessResponse, CategoryRequest>({
      query: ({
        p,
        name,
        description,
        metaTitle,
        metaDescription,
        searchTags,
      }) => ({
        url: `/store/admin/category/secondary/${p}`,
        method: "PATCH",
        body: { name, description, metaTitle, metaDescription, searchTags },
      }),
      invalidatesTags: ["SecondaryCategoryOptions"],
    }),
    addTertiary: builder.mutation<SuccessResponse, CategoryRequest>({
      query: ({
        p,
        s,
        name,
        description,
        metaTitle,
        metaDescription,
        searchTags,
      }) => ({
        url: `/store/admin/category/tertiary/${p}/${s}`,
        method: "PATCH",
        body: { name, description, metaTitle, metaDescription, searchTags },
      }),
      invalidatesTags: ["TertiaryCategoryOptions"],
    }),
    getPrimaryOptions: builder.query<CategoryOptions, void>({
      query: () => ({
        url: "/store/admin/category/primary",
        method: "GET",
      }),
      providesTags: ["PrimaryCategoryOptions"],
    }),
    getSecondaryOptions: builder.query<CategoryOptions, string | undefined>({
      query: (slug) => ({
        url: `/store/admin/category/secondary/${slug}`,
        method: "GET",
      }),
      providesTags: ["SecondaryCategoryOptions"],
    }),
    getTertiaryOptions: builder.query<CategoryOptions, string | undefined>({
      query: (slug) => ({
        url: `/store/admin/category/tertiary/${slug}`,
        method: "GET",
      }),
      providesTags: ["TertiaryCategoryOptions"],
    }),
  }),
});

export const {
  useCreatePrimaryCategoryMutation,
  useAddSecondaryMutation,
  useAddTertiaryMutation,
  useGetPrimaryOptionsQuery,
  useGetSecondaryOptionsQuery,
  useGetTertiaryOptionsQuery,
} = categoryApi;
