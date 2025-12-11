import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';
import { mediaApi } from './mediaApi';

export interface CloudinaryResponse {
  asset_id?: string;
  public_id?: string;
  url?: string;
  secure_url?: string;
  type?: 'image' | 'video';
  resource_type?: 'image' | 'video';
  localUrl: string;
  loading: boolean;
}

interface MediaState {
  loading: boolean;
  error: string | null;
  media: CloudinaryResponse[];
  preview: CloudinaryResponse[];
}

const initialState: MediaState = {
  loading: false,
  error: null,
  media: [],
  preview: [],
};

export const uploadImages = createAsyncThunk<
  CloudinaryResponse[],
  File[],
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>('media/uploadImages', async (files, { rejectWithValue, dispatch }) => {
  try {
    const signatureResult = await dispatch(
      mediaApi.endpoints.createSignature.initiate(undefined, {
        forceRefetch: true,
      }),
    );

    const signatureData =
      'data' in signatureResult ? signatureResult.data : undefined;
    if (!signatureData) throw new Error('Failed to get signature');

    const { signature, timestamp, apiKey, cloudName } = signatureData.data;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      return { ...data, localUrl: URL.createObjectURL(file), loading: false };
    });

    const results = await Promise.all(uploadPromises);

    const payload = {
      files: results.map((file) => ({
        resource_type: file.resource_type ?? 'image',
        public_id: file.public_id!,
        url: file.url!,
        secure_url: file.secure_url!,
      })),
    };

    await dispatch(mediaApi.endpoints.createMedia.initiate(payload));

    return results;
  } catch (err) {
    let message = 'Unknown error occurred';
    if (err instanceof Error) message = err.message;
    return rejectWithValue(message);
  }
});

export const uploadVideos = createAsyncThunk<
  CloudinaryResponse[],
  File[],
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>('media/uploadVideos', async (files, { rejectWithValue, dispatch }) => {
  try {
    const signatureResult = await dispatch(
      mediaApi.endpoints.createSignature.initiate(undefined, {
        forceRefetch: true,
      }),
    );

    const signatureData =
      'data' in signatureResult ? signatureResult.data : undefined;
    if (!signatureData) throw new Error('Failed to get signature');

    const { signature, timestamp, apiKey, cloudName } = signatureData.data;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      return { ...data, localUrl: URL.createObjectURL(file), loading: false };
    });

    const results = await Promise.all(uploadPromises);

    const payload = {
      files: results.map((file) => ({
        resource_type: file.resource_type ?? 'video',
        public_id: file.public_id!,
        url: file.url!,
        secure_url: file.secure_url!,
      })),
    };

    await dispatch(mediaApi.endpoints.createMedia.initiate(payload));

    return results;
  } catch (err) {
    let message = 'Unknown error occurred';
    if (err instanceof Error) message = err.message;
    return rejectWithValue(message);
  }
});

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    removeMedia: (state, action: { payload: string }) => {
      state.media = state.media.filter(
        (item) => item.public_id !== action.payload,
      );
      state.preview = state.preview.filter(
        (item) => item.public_id !== action.payload,
      );
    },
    resetMedia: (state) => {
      state.media = [];
      state.preview = [];
      state.loading = false;
      state.error = null;
    },
    setMedia: (state, action: PayloadAction<CloudinaryResponse[]>) => {
      state.media = state.media.map((item) => {
        const uploaded = action.payload.find(
          (p) => p.public_id === item.public_id,
        );
        return uploaded || item;
      });

      const newMedia = action.payload.filter(
        (p) => !state.media.some((f) => f.public_id === p.public_id),
      );

      state.media.push(...newMedia);
    },

    setFiles: (state, action: PayloadAction<CloudinaryResponse[]>) => {
      state.preview = state.preview.map((item) => {
        const uploaded = action.payload.find(
          (p) => p.localUrl === item.localUrl,
        );
        return uploaded || item;
      });
      const newPreviews = action.payload.filter(
        (p) => !state.preview.some((f) => f.localUrl === p.localUrl),
      );
      state.preview.push(...newPreviews);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.media = [...state.media, ...action.payload];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to upload media';
      })
      .addCase(uploadVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.media = [...state.media, ...action.payload];
      })
      .addCase(uploadVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to upload media';
      });
  },
});

export const { removeMedia, resetMedia, setFiles, setMedia } =
  mediaSlice.actions;
export default mediaSlice.reducer;
