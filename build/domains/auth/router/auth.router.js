import { Router } from 'express';
import { registerUser } from '../controllers/auth.registerUser.controller.js';
import { validateData } from '../../../middlewares/validateData.middleware.js';
// import { userSchema } from '../../user/schema/user.schema.js';
import * as z from 'zod';
const router = Router();
/* create a special registration requestBody schema that makes adding email, password, and name to be
compulsory unlike in the general schema: userSchema and in the user model */
export const authSchema = z.object({
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
router.post('/profile', validateData({ body: authSchema }), registerUser);
export default router;
