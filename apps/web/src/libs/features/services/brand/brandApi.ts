import { apiSlice } from "../../api/api";
import { BrandOptions } from "./types";

export const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findBrandOptions: builder.query<BrandOptions, void>({
      query: () => ({
        url: `/store/seller/brand/options`,
        method: "GET",
      }),
      providesTags: ["Brands"],
    }),
  }),
});

export const { useFindBrandOptionsQuery } = brandApi;
