import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
}

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
  });
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
  });
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JWTPayload;
};
