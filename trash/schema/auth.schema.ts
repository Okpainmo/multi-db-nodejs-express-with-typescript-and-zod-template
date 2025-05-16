// import { z } from 'zod';
// import { userSchema } from '../../src/domains/user/schema/user.schema.js';

// // Extend the user schema for registration, omitting fields that are set by the system
// export const registerUserSchema = userSchema
//   .omit({
//     id: true,
//     isAdmin: true,
//     isActive: true,
//     createdAt: true,
//     updatedAt: true
//   })
//   .extend({
//     confirmPassword: z.string()
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword']
//   });

// export type RegisterUserInput = z.infer<typeof registerUserSchema>;

// export type RegisterUserResponse = {
//   error?: string;
//   responseMessage: string;
//   response?: {
//     user: {
//       id: number;
//       name: string;
//       email: string;
//       isAdmin: boolean;
//       isActive: boolean;
//       createdAt: Date;
//       updatedAt: Date;
//     };
//   };
// };
