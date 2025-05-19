// import log from './logger.js';
import type { Response } from 'express';

export const deployAuthCookie = ({ authCookie }: { authCookie: string }, res: Response) => {
  res.cookie(`MultiDB_NodeExpressTypescript_Template__Auth_Cookie`, authCookie, {
    // domain: "localhost",
    // path: ""/,
    httpOnly: true,
    secure: true, // prevents man-in-the-middle attack
    sameSite: 'strict', // prevents CSRF attacks
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  // log.info(`authCookie: '${authCookie}' \n \n auth cookie deployed successfully`);
};
