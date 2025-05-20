import { z } from 'zod';
/* create special registration and log-in requestBody schemas that make adding email, password, and
name(where applicable) to be compulsory unlike in the general schema(userSchema), and in the user model */
export const authSchema__register = z.object({
    name: z
        .string({
        required_error: 'Name is required.'
    })
        .nullable(),
    // .optional(),
    email: z
        .string({
        required_error: 'Email is required.'
    })
        .email('Please provide a valid email address')
        .refine((val) => !val.includes(' '), 'Email cannot contain spaces'),
    // .optional(),
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
    // .optional(),
});
export const authSchema__logIn = z.object({
    email: z
        .string({
        required_error: 'Email is required.'
    })
        .email('Please provide a valid email address')
        .refine((val) => !val.includes(' '), 'Email cannot contain spaces'),
    // .optional(),
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
    // .optional(),
});
