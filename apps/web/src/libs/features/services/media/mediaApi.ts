import { apiSlice } from "../../api/api";
import { SuccessResponse } from "../../types/api-response";
import { CloudinarySignatureResponse, CreateMediaRequest } from "./types";

export const mediaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSignature: builder.query<CloudinarySignatureResponse, void>({
      query: () => ({
        url: "/store/seller/media/signature",
        method: "GET",
      }),
    }),

    deleteImage: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/seller/media/cloudinary/image/${id}`,
        method: "DELETE",
      }),
    }),

    deleteVideo: builder.mutation<SuccessResponse, string>({
      query: (id) => ({
        url: `/store/seller/media/cloudinary/video/${id}`,
        method: "DELETE",
      }),
    }),

    createMedia: builder.mutation<SuccessResponse, CreateMediaRequest>({
      query: (data) => ({
        url: `/store/seller/media`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSignatureQuery,
  useDeleteImageMutation,
  useDeleteVideoMutation,
  useCreateMediaMutation,
} = mediaApi;
