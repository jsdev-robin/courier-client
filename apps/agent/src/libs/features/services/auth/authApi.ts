import { type RegistrationResponseJSON } from '@simplewebauthn/browser';
import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types/api-response';
import { signup } from './authSlice';
import {
  ChangePasswordRequest,
  DisconnectOauthRequest,
  Finish2FASetupRequest,
  FinishEmailChangeRequest,
  FinishPasskeysAuthenticationRequest,
  FinishPasswordResetRequest,
  GetProfileResponse,
  RecoverBackupCodesResponse,
  SessionsResponse,
  SignupResponse,
  SinginRequest,
  SinginResponse,
  SingupRequest,
  SpyPasskeysResponse,
  Start2FASetupResponse,
  StartAuthenticationRequest,
  StartAuthenticationResponse,
  StartEmailChangeRequest,
  StartPasswordResetRequest,
  StartRegistrationResponse,
  Verify2FAOnSignRequest,
  VerifyBackupCodeRequest,
  VerifyRequest,
} from './types';

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SingupRequest>({
      query: (body) => ({
        url: '/auth/agent/signup',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(signup({ token: data.data.token }));
        } catch (error) {
          console.log('Signup error:', error);
        }
      },
    }),

    verify: builder.mutation<SuccessResponse, VerifyRequest>({
      query: ({ token, otp }) => ({
        url: '/auth/agent/signup/verify',
        method: 'POST',
        body: { token, otp },
      }),
    }),

    signin: builder.mutation<SinginResponse, SinginRequest>({
      query: ({ email, password, remember }) => ({
        url: '/auth/agent/signin',
        method: 'POST',
        body: { email, password, remember },
      }),
      invalidatesTags: ['User'],
    }),

    signout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/agent/signout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    signoutSession: builder.mutation<SuccessResponse, string>({
      query: (token) => ({
        url: `/auth/agent/signout/${token}`,
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    signoutAllSession: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/agent/signout-all',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Sessions'],
    }),

    refreshToken: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/agent/refresh-token',
        method: 'POST',
      }),
    }),

    getProfile: builder.query<GetProfileResponse, void>({
      query: () => '/auth/agent/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<SessionsResponse, FormData>({
      query: (data) => ({
        url: '/auth/agent/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getSessions: builder.query<SessionsResponse, void>({
      query: () => ({
        url: '/auth/agent/sessions',
        method: 'GET',
      }),
      providesTags: ['Sessions'],
    }),

    startPasskeysRegistration: builder.mutation<
      StartRegistrationResponse,
      void
    >({
      query: () => ({
        url: '/auth/agent/registration/start',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    finishPasskeysRegistration: builder.mutation<
      SuccessResponse,
      {
        credential: RegistrationResponseJSON;
      }
    >({
      query: ({ credential }) => ({
        url: '/auth/agent/registration/finish',
        method: 'POST',
        body: { credential },
      }),
      invalidatesTags: ['User', 'Passkeys'],
    }),

    startPasskeysAuthentication: builder.mutation<
      StartAuthenticationResponse,
      StartAuthenticationRequest
    >({
      query: ({ email }) => ({
        url: '/auth/agent/authentication/start',
        method: 'POST',
        body: { email },
      }),
    }),

    finishPasskeysAuthentication: builder.mutation<
      SuccessResponse,
      FinishPasskeysAuthenticationRequest
    >({
      query: ({ credential, email }) => ({
        url: '/auth/agent/authentication/finish',
        method: 'POST',
        body: { credential, email },
      }),
    }),

    spyPasskeys: builder.query<SpyPasskeysResponse, void>({
      query: () => ({
        url: '/auth/agent/passkeys',
        method: 'GET',
      }),
      providesTags: ['Passkeys'],
    }),

    unregisterPasskey: builder.mutation<void, string>({
      query: (id) => ({
        url: `/auth/agent/passkeys/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Passkeys', 'User'],
    }),

    startPasswordReset: builder.mutation<
      SinginResponse,
      StartPasswordResetRequest
    >({
      query: ({ email }) => ({
        url: '/auth/agent/password/reset/start',
        method: 'POST',
        body: { email },
      }),
    }),

    finishPasswordReset: builder.mutation<
      SinginResponse,
      FinishPasswordResetRequest
    >({
      query: ({ newPassword, confirmNewPassword, token }) => ({
        url: `/auth/agent/password/reset/finish/${token}`,
        method: 'PATCH',
        body: { newPassword, confirmNewPassword },
      }),
    }),

    start2FASetup: builder.query<Start2FASetupResponse, void>({
      query: () => ({
        url: '/auth/agent/2fa/setup/start',
        method: 'GET',
      }),
    }),

    finish2FASetup: builder.mutation<SinginResponse, Finish2FASetupRequest>({
      query: ({ totp, secret }) => ({
        url: '/auth/agent/2fa/setup/finish',
        method: 'PATCH',
        body: { totp, secret },
      }),
      invalidatesTags: ['User', 'BackupCodes'],
    }),

    verify2FASignIn: builder.mutation<SuccessResponse, Verify2FAOnSignRequest>({
      query: ({ totp }) => ({
        url: '/auth/agent/2fa/verify/app',
        method: 'POST',
        body: { totp },
      }),
    }),

    remove2fa: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: `/auth/agent/2fa/remove`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User', 'BackupCodes'],
    }),

    verifyBackupCode: builder.mutation<
      SuccessResponse,
      VerifyBackupCodeRequest
    >({
      query: (data) => ({
        url: '/auth/agent/2fa/verify/recovery',
        method: 'POST',
        body: data,
      }),
    }),

    recoverBackupCodes: builder.query<RecoverBackupCodesResponse, void>({
      query: () => ({
        url: '/auth/agent/2fa/backup-codes/recover',
        method: 'GET',
      }),

      providesTags: ['BackupCodes'],
    }),

    startBackupCodesSetup: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: '/auth/agent/2fa/backup-codes/generate',
        method: 'POST',
      }),
      invalidatesTags: ['BackupCodes'],
    }),

    startEmailChange: builder.mutation<SinginResponse, StartEmailChangeRequest>(
      {
        query: ({ newEmail, confirmEmail, password }) => ({
          url: '/auth/agent/email/change/start',
          method: 'POST',
          body: { newEmail, confirmEmail, password },
        }),
      },
    ),

    finishEmailChange: builder.mutation<
      SinginResponse,
      FinishEmailChangeRequest
    >({
      query: ({ code, token }) => ({
        url: `/auth/agent/email/change/finish/${token}`,
        method: 'PATCH',
        body: { code },
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<SinginResponse, ChangePasswordRequest>({
      query: ({ currentPassword, newPassword, confirmNewPassword }) => ({
        url: '/auth/agent/password/change',
        method: 'PATCH',
        body: { currentPassword, newPassword, confirmNewPassword },
      }),
    }),

    disconnectOauth: builder.mutation<SinginResponse, DisconnectOauthRequest>({
      query: ({ email, provider }) => ({
        url: '/auth/agent/disconnect/oauth',
        method: 'PATCH',
        body: { email, provider },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyMutation,
  useSigninMutation,
  useSignoutMutation,
  useSignoutSessionMutation,
  useSignoutAllSessionMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetSessionsQuery,
  useStartPasskeysRegistrationMutation,
  useFinishPasskeysRegistrationMutation,
  useStartPasskeysAuthenticationMutation,
  useFinishPasskeysAuthenticationMutation,
  useSpyPasskeysQuery,
  useUnregisterPasskeyMutation,
  useStartPasswordResetMutation,
  useFinishPasswordResetMutation,
  useStart2FASetupQuery,
  useVerify2FASignInMutation,
  useRemove2faMutation,
  useVerifyBackupCodeMutation,
  useFinish2FASetupMutation,
  useRecoverBackupCodesQuery,
  useStartBackupCodesSetupMutation,
  useStartEmailChangeMutation,
  useFinishEmailChangeMutation,
  useChangePasswordMutation,
  useDisconnectOauthMutation,
} = userAuthApi;
