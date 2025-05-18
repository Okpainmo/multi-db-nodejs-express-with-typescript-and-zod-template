// import jwt from 'jsonwebtoken';
// import type { UserSpecs } from '../domains/user/schema/user.schema.js';
// import bcrypt from 'bcryptjs';
export {};
// export const generateTokens = ({ tokenType, user }: { tokenType: string; user: UserSpecs }) => {
//   const jwtSecret = process.env.JWT_SECRET as string;
//   if (tokenType == 'auth') {
//     if (!user.id || !user.email) {
//       throw new Error('Invalid user object: the provided user object does not contain an email or userId or both');
//     }
//     const accessToken = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, { expiresIn: process.env.JWT_ACCESS_LIFETIME });
//     const refreshToken = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, { expiresIn: process.env.JWT_REFRESH_LIFETIME });
//     const salt = await bcrypt.genSalt(14);
//     const authCookiePart_A = await bcrypt.hash(user.email, salt);
//     const authCookiePart_B = jwtSecret;
//     const authCookie = `MultiDB_NodeExpressTypescript_Project_${authCookiePart_A}_${authCookiePart_B}`;
//     const tokens = {
//       authCookie,
//       accessToken,
//       refreshToken
//     };
//     return tokens;
//   }
// };
