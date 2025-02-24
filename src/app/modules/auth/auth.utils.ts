import jwt, { SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secretKey: string,
  expiresIn: string, // '1h' | '1d' | '1w' | '1y' | 3600 | 86400 | 604800 | 31536000
) => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  };
  return jwt.sign(jwtPayload, secretKey, options);
};
