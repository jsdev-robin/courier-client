import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: 'include',
});

const SKIP_REFRESH_ENDPOINTS = [
  '/auth/admin/signin',
  '/auth/admin/verify-2fa',
  '/auth/admin/signup',
  '/auth/admin/verify',
  '/auth/admin/forgot-password',
  '/auth/admin/reset-password',
  '/auth/admin/xxx',
  '/auth/admin/2fa/verify/recovery',
];

const MAX_RETRIES = 5;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);
  let retryCount = 0;

  const shouldSkipRefresh =
    typeof args !== 'string' &&
    args.url &&
    SKIP_REFRESH_ENDPOINTS.some((endpoint) => args.url.startsWith(endpoint));

  if (result.error && result.error.status === 401 && !shouldSkipRefresh) {
    while (retryCount < MAX_RETRIES) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await rawBaseQuery(
            { url: '/auth/admin/refresh-token', method: 'POST' },
            api,
            extraOptions,
          );

          if (refreshResult.error) {
            if (refreshResult.error.status === 403) {
              if (typeof window !== 'undefined') {
                window.location.href = '/sign-in';
              }
              return refreshResult;
            }
            break;
          }

          result = await rawBaseQuery(args, api, extraOptions);
          if (!result.error) break;
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
        if (!result.error) break;
      }
      retryCount++;
    }
  }

  if (result.error && result.error.status === 403) {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in';
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Sessions',
    'BackupCodes',
    'Passkeys',
    'Parcels',
    'Parcel',
    'ParcelsGeoNear',
    'AvailableAgent',
    'StatsMetrics',
    'Last7DaysMetrics',
  ],
  endpoints: () => ({}),
});
