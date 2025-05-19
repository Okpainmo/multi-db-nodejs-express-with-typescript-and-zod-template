import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  _id: z.string().optional(),
  name: z
    .string({
      required_error: 'Name is required.'
    })
    .nullable()
    .optional(),
  email: z
    .string({
      required_error: 'Email is required.'
    })
    .email('Please provide a valid email address')
    .refine((val) => !val.includes(' '), 'Email cannot contain spaces')
    .optional(),
  password: z
    .string({
      required_error: 'Password is required.'
    })
    .min(8, 'Password must be at least 8 characters.')
    .max(100, 'Password cannot exceed 100 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.')
    .optional(),
  isAdmin: z.boolean().default(false).optional(),
  isActive: z.boolean().default(true).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional()
});

export type UserSpecs = z.infer<typeof userSchema>;
