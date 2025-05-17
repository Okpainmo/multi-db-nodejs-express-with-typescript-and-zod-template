// sample domain router
import { Router } from 'express';
// import { registerUser } from '../controllers/auth.registerUser.controller.js';
import { validateData } from '../../../middlewares/validateData.middleware.js';
import { userSchema } from '../../user/schema/user.schema.js';
import { deactivateUser } from '../controllers/admin.deactivateUser.controller.js';
import { ObjectId } from 'mongodb';
import * as z from 'zod';
import log from '../../../utils/logger.js';

export const mongoParamsSchema = z.object({
  userId: z
    .string()
    .min(1)
    .refine(
      (val) => {
        try {
          //   console.log(new ObjectId(val));
          return new ObjectId(val);
        } catch (error) {
          log.error(`params schema validation error: ${error}`);

          return false;
        }
      },
      {
        message: 'Invalid ObjectId'
      }
    )
});

export const postgresParamsSchema = z.object({
  userId: z
    .string()
    .min(1)
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: 'Invalid Postgres ID - must be a positive number'
      }
    )
});

export const combinedParamsSchema = z.object({
  userId: z
    .string()
    .min(1)
    .refine(
      (val) => {
        try {
          new ObjectId(val);
          return true;
        } catch {
          const num = parseInt(val);
          return !isNaN(num) && num > 0;
        }
      },
      {
        message: 'Invalid ID format - must be either a valid MongoDB ObjectId or a positive number'
      }
    )
});

export type MongoParamsSpecs = z.infer<typeof mongoParamsSchema>;
export type PostgresParamsSpecs = z.infer<typeof postgresParamsSchema>;
export type CombinedParamsSpecs = z.infer<typeof combinedParamsSchema>;

const router = Router();

router.patch('/profile/:userId', validateData({ params: combinedParamsSchema, body: userSchema }), deactivateUser);

export default router;
