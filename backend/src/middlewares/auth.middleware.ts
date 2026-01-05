import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import { User } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyAccessToken(token);

    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return sendError(res, 401, 'User no longer exists');
    }

    if (!user.isEmailVerified) {
      return sendError(res, 403, 'Please verify your email first');
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Token expired');
    }
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, 401, 'Invalid token');
    }
    return sendError(res, 500, 'Authentication failed');
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 403, 'You do not have permission to access this resource');
    }
    next();
  };
};
