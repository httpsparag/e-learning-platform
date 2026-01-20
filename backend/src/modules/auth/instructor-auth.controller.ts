import { Request, Response, NextFunction } from 'express';
import InstructorAuthService from './instructor-auth.service';
import { sendSuccess, sendError } from '../../utils/response';

interface AuthRequest extends Request {
  instructorId?: string;
}

export class InstructorAuthController {
  // POST /api/auth/instructor/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await InstructorAuthService.register(req.body);
      return sendSuccess(res, 201, result.message, {
        instructorId: result.instructorId,
        name: result.name,
        email: result.email,
      });
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/instructor/verify-email
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await InstructorAuthService.verifyEmail(req.body);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/instructor/resend-otp
  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { instructorId } = req.body;
      const result = await InstructorAuthService.resendOtp(instructorId);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/instructor/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await InstructorAuthService.login(req.body);

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

  // POST /api/auth/instructor/refresh-token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return sendError(res, 401, 'Refresh token not provided');
      }

      const result = await InstructorAuthService.refreshToken({ refreshToken });
      return sendSuccess(res, 200, 'Token refreshed', {
        accessToken: result.accessToken,
      });
    } catch (error: any) {
      return sendError(res, 401, error.message);
    }
  }

  // POST /api/auth/instructor/forgot-password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await InstructorAuthService.forgotPassword(req.body);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/auth/instructor/reset-password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await InstructorAuthService.resetPassword(req.body);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // GET /api/instructor/me
  async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.instructorId) {
        return sendError(res, 401, 'Instructor ID not found in token');
      }

      const result = await InstructorAuthService.getMe(req.instructorId);
      return sendSuccess(res, 200, 'Instructor profile retrieved', result.instructor);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // GET /api/instructor/:id
  async getInstructorProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return sendError(res, 400, 'Instructor ID is required');
      }

      const result = await InstructorAuthService.getMe(id);
      if (!result.instructor) {
        return sendError(res, 404, 'Instructor profile not found');
      }
      return sendSuccess(res, 200, 'Instructor profile retrieved', result.instructor);
    } catch (error: any) {
      return sendError(res, 404, 'Instructor profile not found');
    }
  }

  // PATCH /api/instructor/profile
  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.instructorId) {
        return sendError(res, 401, 'Instructor ID not found in token');
      }

      const result = await InstructorAuthService.updateInstructorProfile(
        req.instructorId,
        req.body
      );
      return sendSuccess(res, 200, result.message, result.instructor);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }
}

export default new InstructorAuthController();
