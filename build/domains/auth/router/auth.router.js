import { Router } from 'express';
import { registerUser } from '../controllers/auth.registerUser.controller.js';
import { validateData } from '../../../middlewares/validateData.middleware.js';
import { userSchema } from '../../user/schema/user.schema.js';
const router = Router();
router.post('/profile', validateData({ body: userSchema }), registerUser);
export default router;
