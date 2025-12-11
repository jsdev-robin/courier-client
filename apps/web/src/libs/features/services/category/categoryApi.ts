import { apiSlice } from "../../api/api";
import { Attributes, CategoryOptions } from "./types";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrimaryOptions: builder.query<CategoryOptions, void>({
      query: () => ({
        url: "/store/seller/category/options/primary",
        method: "GET",
      }),
      providesTags: ["PrimaryCategoryOptions"],
    }),
    getSecondaryOptions: builder.query<CategoryOptions, string | undefined>({
      query: (s) => ({
        url: `/store/seller/category/options/secondary/${s}`,
        method: "GET",
      }),
      providesTags: ["SecondaryCategoryOptions"],
    }),
    getTertiaryOptions: builder.query<CategoryOptions, string | undefined>({
      query: (s) => ({
        url: `/store/seller/category/options/tertiary/${s}`,
        method: "GET",
      }),
      providesTags: ["TertiaryCategoryOptions"],
    }),
    getAttributes: builder.query<Attributes, string | undefined>({
      query: (s) => ({
        url: `/store/seller/category/tertiary/attributes/${s}`,
        method: "GET",
      }),
      providesTags: ["CategoryAttributes"],
    }),
  }),
});

export const {
  useGetPrimaryOptionsQuery,
  useGetSecondaryOptionsQuery,
  useGetTertiaryOptionsQuery,
  useGetAttributesQuery,
} = categoryApi;
