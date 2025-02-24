import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
  email: z
    .string({
      required_error: 'Please provide an email address',
    })
    .email(),
  password: z
    .string({
      required_error: 'Please provide a password',
    })
    .min(4)
    .max(20),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z
      .string({
        required_error: 'Please provide a refresh token',
      })
      .min(1),
  }),
});

export const authValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
