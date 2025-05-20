import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateTokens = async ({ tokenType, user }: { tokenType: string; user: { id: string | number; email: string } }) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const accessExpiry = process.env.JWT_ACCESS_EXPIRATION_TIME || '1h';
  const sessionExpiry = process.env.JWT_SESSION_EXPIRATION_TIME || '24h';
  const oneTimePasswordExpiry = process.env.JWT_ONE_TIME_PASSWORD_LIFETIME || '5m';

  if (tokenType == 'auth' && user) {
    if (!user.id || !user.email) {
      throw new Error('Generate token error: the provided user object does not contain an email or userId or both');
    }

    const accessToken = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, { expiresIn: accessExpiry as jwt.SignOptions['expiresIn'] });
    const refreshToken = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, {
      expiresIn: sessionExpiry as jwt.SignOptions['expiresIn']
    });

    const salt = await bcrypt.genSalt(14);
    const authCookiePart_A = await bcrypt.hash(user.email, salt);
    const authCookiePart_B = jwtSecret;

    const authCookie = `MultiDB_NodeExpressTypescript_Template_____${authCookiePart_A}_____${authCookiePart_B}`;

    const tokens = {
      authCookie,
      accessToken,
      refreshToken
    };

    return tokens;
  }

  if (tokenType == 'oneTimePassword' && user.email && user.id) {
    if (!user.id || !user.email) {
      throw new Error('Invalid user object: the provided user object does not contain an email or userId or both');
    }

    const oneTimePasswordToken = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, {
      expiresIn: oneTimePasswordExpiry as jwt.SignOptions['expiresIn']
    });

    return oneTimePasswordToken;
  }

  return;
};
