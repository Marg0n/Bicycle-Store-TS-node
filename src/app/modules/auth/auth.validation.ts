import { z } from 'zod';

const loginValidationSchema = z.object({
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
});


export const authValidation = {
  loginValidationSchema,
};