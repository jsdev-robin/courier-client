import {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON,
  type PublicKeyCredentialCreationOptionsJSON,
} from '@simplewebauthn/browser';
import { SuccessResponse } from '../../../types/api-response';

export type Role = 'passenger';

export interface Session {
  token: string;
  deviceInfo?: {
    deviceType?: string;
    os?: string;
    browser?: string;
    userAgent?: string;
  };
  ip?: string;
  location?: {
    city?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };
  loggedInAt: Date;
  expiresAt: Date;
  revoked: boolean;
  revokedAt: Date;
  lastActivityAt: Date;
  riskScore: number;
  trustedDevice: boolean;
  status: boolean;
}

export interface User {
  _id: string;
  id: string;
  personalInfo: {
    familyName: string;
    givenName: string;
    displayName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    nationality?: string;
    address?: string;
    avatar?: {
      url: string;
    };
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
    emergencyContacts?: { name: string; phone: string; relation: string }[];
  };
  authentication: {
    password?: string;
    isVerified: boolean;
    passKeys: {
      hasPasskeys: boolean;
      passkeyCount: number;
      lastPasskeyUsed: Date;
    };
    twoFA: {
      enabled: boolean;
      backupCodes: Decipheriv[];
      secret: Decipheriv;
    };
    oauth: {
      provider:
        | 'google'
        | 'github'
        | 'twitter'
        | 'facebook'
        | 'discord'
        | 'linkedin';
      email: string;
    }[];
  };
  role: Role;
  sessions?: Session;
}

// Get Profile
export interface GetProfileResponse extends SuccessResponse {
  data: {
    user: User;
  };
}

export interface SessionsResponse extends SuccessResponse {
  data: {
    sessions: Session[];
  };
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

// Sign-up
export interface SignupResponse extends SuccessResponse {
  data: {
    token: string;
  };
}

export interface SingupRequest {
  familyName: string;
  givenName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Verify
export interface VerifyRequest {
  token: string;
  otp: number;
}

// Sign-in
export interface SinginResponse extends SuccessResponse {
  data: {
    role: Role;
    enable2fa: boolean;
  };
}

export interface SinginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

// Start passkeys registration
export interface StartRegistrationResponse extends SuccessResponse {
  data: PublicKeyCredentialCreationOptionsJSON;
}

export interface StartAuthenticationResponse extends SuccessResponse {
  data: {
    options: PublicKeyCredentialRequestOptionsJSON;
    email: string;
  };
}

export interface StartAuthenticationRequest {
  email: string;
}

export interface FinishPasskeysAuthenticationRequest {
  credential: AuthenticationResponseJSON;
  email: string;
}

export interface StartPasswordResetRequest {
  email: string;
}

export interface FinishPasswordResetRequest {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

export interface SpyPasskeysResponse extends SuccessResponse {
  data: {
    passkeys: {
      _id: string;
      device: string;
      browser: string;
      formFactor: 'desktop' | 'mobile' | 'tablet' | 'tv';
      createdAt: string;
    }[];
  };
}

export interface Start2FASetupResponse extends SuccessResponse {
  data: {
    secret: string;
    otpauth_url: string;
    qrCodeDataUrl: string;
  };
}

export interface Verify2FAOnSignRequest {
  totp: string;
}

export interface VerifyBackupCodeRequest {
  code: string;
}

export interface Finish2FASetupRequest {
  totp: string;
  secret?: string;
}

export interface RecoverBackupCodesResponse extends SuccessResponse {
  data: {
    codes: string[];
  };
}

export interface StartEmailChangeRequest {
  newEmail: string;
  confirmEmail: string;
  password: string;
}

export interface FinishEmailChangeRequest {
  code: string;
  token: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface DisconnectOauthRequest {
  provider: string;
  email: string;
}
