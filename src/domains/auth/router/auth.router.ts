import { Router } from 'express';
import { registerUser } from '../controllers/auth.registerUser.controller.js';
import { validateData } from '../../../middlewares/validateData.middleware.js';
// import { userSchema } from '../../user/schema/user.schema.js';
import { authSchema__register, authSchema__logIn } from '../schema/auth.schema.js';
import { LogIn } from '../controllers/auth.logIn.controller.js';

const router = Router();

/* 
The access and session - auth middleware are not needed for the sign-up and registration routes. 
This is because these routes are the ones that start/create sessions. Adding those auth middlewares here, do 
not make any sense, since by the time these requests are being made, there will be no request in session.

Only the data validation is necessary.
*/
router.post('/register', validateData({ body: authSchema__register }), registerUser);
router.post('/log-in', validateData({ body: authSchema__logIn }), LogIn);

export default router;
