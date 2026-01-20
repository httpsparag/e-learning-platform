import { Router, Request, Response, NextFunction } from 'express';
import InstructorAuthController from './instructor-auth.controller';
import { validateInstructorAuth } from '../../middlewares/validator.middleware';
import { instructorAuth } from '../../middlewares/auth.middleware';

const router = Router();

interface AuthRequest extends Request {
  instructorId?: string;
}

// Public routes
router.post(
  '/instructor/register',
  validateInstructorAuth('register'),
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.register(req, res, next)
);

router.post(
  '/instructor/verify-email',
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.verifyEmail(req, res, next)
);

router.post(
  '/instructor/resend-otp',
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.resendOtp(req, res, next)
);

router.post(
  '/instructor/login',
  validateInstructorAuth('login'),
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.login(req, res, next)
);

router.post(
  '/instructor/refresh-token',
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.refreshToken(req, res, next)
);

router.post(
  '/instructor/forgot-password',
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.forgotPassword(req, res, next)
);

router.post(
  '/instructor/reset-password',
  (req: Request, res: Response, next: NextFunction) =>
    InstructorAuthController.resetPassword(req, res, next)
);

// Protected routes
router.get(
  '/instructor/me',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    InstructorAuthController.getMe(req, res, next)
);

router.get(
  '/instructor/:id',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    InstructorAuthController.getInstructorProfile(req, res, next)
);

router.patch(
  '/instructor/profile',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    InstructorAuthController.updateProfile(req, res, next)
);

export default router;
