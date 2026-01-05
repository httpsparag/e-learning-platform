import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess, sendError } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth.middleware';

const authService = new AuthService();

export class AuthController {
  // POST /api/auth/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      return sendSuccess(res, 201, result.message, {
        userId: result.userId,
        name: result.name,
        email: result.email,
      });
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/verify-email
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.verifyEmail(req.body);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/resend-otp
  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const result = await authService.resendOtp(userId);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return sendSuccess(res, 200, 'Login successful', {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error: any) {
      return sendError(res, 401, error.message);
    }
  }

  // POST /api/auth/refresh-token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return sendError(res, 401, 'Refresh token not provided');
      }

      const result = await authService.refreshToken({ refreshToken });
      return sendSuccess(res, 200, 'Token refreshed', {
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      return sendError(res, 401, error.message);
    }
  }

  // POST /api/auth/logout
  async logout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, 401, 'Not authenticated');
      }

      await authService.logout(req.user.userId);

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      return sendSuccess(res, 200, 'Logged out successfully');
    } catch (error: any) {
      return sendError(res, 500, error.message);
    }
  }

  // POST /api/auth/forgot-password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.forgotPassword(req.body);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 500, error.message);
    }
  }

  // POST /api/auth/reset-password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.resetPassword(req.body);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // GET /api/auth/me (Protected route example)
  async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, 401, 'Not authenticated');
      }

      const user = await authService.getMe(req.user.userId);
      return sendSuccess(res, 200, 'User fetched successfully', { user });
    } catch (error: any) {
      return sendError(res, 500, error.message);
    }
  }
}
