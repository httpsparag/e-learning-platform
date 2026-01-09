import jwt, { SignOptions } from 'jsonwebtoken';

export interface JWTPayload {
  userId?: string;
  id?: string;
  role: string;
}

export const generateAccessToken = (payload: JWTPayload): string => {
  const expiryString = process.env.JWT_ACCESS_EXPIRY || '15m';
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: expiryString,
  } as any);
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  const expiryString = process.env.JWT_REFRESH_EXPIRY || '7d';
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: expiryString,
  } as any);
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JWTPayload;
};
