// sample domain router
import express from 'express';
import { validateData } from '../../../middlewares/validateData.middleware.js';
import { ObjectId } from 'mongodb';
import * as z from 'zod';
import log from '../../../utils/logger.js';
import { getUserProfile } from '../controllers/user.getUserProfile.controller.js';
import sessionsMiddleware from '../../../middlewares/auth.sessions.middleware.js';
import accessMiddleware from '../../../middlewares/auth.access.middleware.js';
export const mongoParamsSchema = z.object({
    userId: z
        .string()
        .min(1)
        .refine((val) => {
        try {
            //   console.log(new ObjectId(val));
            return new ObjectId(val);
        }
        catch (error) {
            log.error(`params schema validation error: ${error}`);
            return false;
        }
    }, {
        message: 'Invalid ObjectId'
    })
});
export const postgresParamsSchema = z.object({
    userId: z
        .string()
        .min(1)
        .refine((val) => {
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
    }, {
        message: 'Invalid Postgres ID - must be a positive number'
    })
});
export const combinedParamsSchema = z.object({
    userId: z
        .string()
        .min(1)
        .refine((val) => {
        try {
            new ObjectId(val);
            return true;
        }
        catch {
            const num = parseInt(val);
            return !isNaN(num) && num > 0;
        }
    }, {
        message: 'Invalid ID format - must be either a valid MongoDB ObjectId or a positive number'
    })
});
// express router init
const router = express.Router();
// routes
router.route('/:userId').get(validateData({ params: combinedParamsSchema }), sessionsMiddleware, accessMiddleware, getUserProfile);
export default router;
