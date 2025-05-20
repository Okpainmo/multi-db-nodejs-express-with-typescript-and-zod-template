// ts globals
import type { UserSpecs } from './src/domains/user/schema/user.schema.ts';

// Augment the Express Request type - more like extending express(with ts) globally
declare module 'express' {
  interface Request {
    userData?: {
      user: UserSpecs;
      sessionStatus?: string;
      newUserAccessToken?: string;
      newUserRefreshToken?: string;
    };
  }
}
