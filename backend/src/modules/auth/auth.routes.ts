import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validator.middleware';
import instructorAuthRoutes from './instructor-auth.routes';

const router = Router();
const authController = new AuthController();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
    validate,
  ],
  authController.register.bind(authController)
);

// POST /api/auth/verify-email
router.post(
  '/verify-email',
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('otp')
      .notEmpty()
      .withMessage('OTP is required')
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits'),
    validate,
  ],
  authController.verifyEmail.bind(authController)
);

// POST /api/auth/resend-otp
router.post(
  '/resend-otp',
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    validate,
  ],
  authController.resendOtp.bind(authController)
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  authController.login.bind(authController)
);

// POST /api/auth/refresh-token
router.post('/refresh-token', authController.refreshToken.bind(authController));

// POST /api/auth/logout (Protected)
router.post('/logout', authenticate, authController.logout.bind(authController));

// POST /api/auth/forgot-password
router.post(
  '/forgot-password',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    validate,
  ],
  authController.forgotPassword.bind(authController)
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
    validate,
  ],
  authController.resetPassword.bind(authController)
);

// GET /api/auth/me (Protected)
router.get('/me', authenticate, authController.getMe.bind(authController));

// Instructor Auth Routes
router.use('/', instructorAuthRoutes);

export default router;
