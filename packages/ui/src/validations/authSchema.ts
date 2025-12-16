import { z } from 'zod';

const signin = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean().default(false).optional(),
});

const signup = z
  .object({
    familyName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' })
      .max(32, { message: 'First name cannot exceed 32 characters' }),
    givenName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters' })
      .max(32, { message: 'Last name cannot exceed 32 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
          'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

const verify = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

const emailOnly = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

const updatePassword = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

const finishPasswordReset = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

const finish2FASetup = z.object({
  totp: z
    .string()
    .length(6, { message: 'Code must be exactly 6 digits' })
    .regex(/^\d{6}$/, { message: 'Invalid code format. Must be 6 digits.' }),
});

const verify2FASignIn = z.object({
  totp: z
    .string()
    .min(6, { message: 'Code must be 6 digits' })
    .max(6, { message: 'Code must be 6 digits' })
    .regex(/^\d{6}$/, { message: 'Invalid verification code' }),
});

const verify2FARecovery = z.object({
  code: z.string(),
});

const startEmailChange = z
  .object({
    newEmail: z.string().email('Enter a valid email address'),
    confirmEmail: z.string().email('Enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    path: ['confirmEmail'],
    message: 'Emails do not match',
  });

const finishEmailChange = z.object({
  code: z.string(),
});

const changePassword = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

const updateProfile = z.object({
  img: z
    .custom<File>()
    .refine((file) => file instanceof File, 'File is required')
    .refine(
      (file) => file.type.startsWith('image/'),
      'Only image files are allowed (jpg, png, etc.)',
    )
    .optional(),
  personalInfo: z.object({
    familyName: z.string().min(1).max(100),
    givenName: z.string().min(1).max(100),
    phone: z.string().nonempty({ message: 'Phone is required' }).optional(),
    dateOfBirth: z
      .string()
      .nonempty({ message: 'Date of Birth is required' })
      .optional(),
    gender: z.string().nonempty({ message: 'Gender is required' }).optional(),
    nationality: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z
      .object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
      })
      .optional(),
  }),
});

export const authSchema = {
  signin,
  signup,
  verify,
  updatePassword,
  emailOnly,
  finishPasswordReset,
  finish2FASetup,
  verify2FASignIn,
  verify2FARecovery,
  startEmailChange,
  finishEmailChange,
  changePassword,
  updateProfile,
} as const;
