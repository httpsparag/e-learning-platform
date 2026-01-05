import crypto from 'crypto';
import { User, IUser } from '../../models/user.model';
import redisClient from '../../config/redis';
import { sendEmail, getVerificationEmailTemplate, getPasswordResetEmailTemplate } from '../../utils/email';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { validatePassword } from '../../utils/password';
import {
  RegisterDTO,
  LoginDTO,
  VerifyEmailDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  RefreshTokenDTO,
} from './auth.types';

export class AuthService {
  // REGISTER
  async register(data: RegisterDTO) {
    const { name, email, password, confirmPassword } = data;

    // Check if passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
      isEmailVerified: false,
    });

    // Generate OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in Redis (expires in 10 minutes)
    await redisClient.setex(
      `verify_email:${user._id}`,
      parseInt(process.env.OTP_EXPIRY || '600'),
      otp
    );

    // Send verification email
    await sendEmail({
      to: user.email,
      subject: 'Verify Your Email - EduLearn',
      html: getVerificationEmailTemplate(otp, user.name),
    });

    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      message: 'Registration successful. Please check your email for verification code.',
    };
  }

  // VERIFY EMAIL
  async verifyEmail(data: VerifyEmailDTO) {
    const { userId, otp } = data;

    // Get OTP from Redis
    const storedOtp = await redisClient.get(`verify_email:${userId}`);

    if (!storedOtp) {
      throw new Error('OTP expired or invalid');
    }

    if (storedOtp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { isEmailVerified: true },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Delete OTP from Redis
    await redisClient.del(`verify_email:${userId}`);

    return {
      message: 'Email verified successfully',
    };
  }

  // RESEND OTP
  async resendOtp(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isEmailVerified) {
      throw new Error('Email already verified');
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store in Redis
    await redisClient.setex(
      `verify_email:${user._id}`,
      parseInt(process.env.OTP_EXPIRY || '600'),
      otp
    );

    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Verify Your Email - EduLearn',
      html: getVerificationEmailTemplate(otp, user.name),
    });

    return {
      message: 'Verification code resent',
    };
  }

  // LOGIN
  async login(data: LoginDTO) {
    const { email, password } = data;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Check email verification
    if (!user.isEmailVerified) {
      throw new Error('Please verify your email first');
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      role: user.role,
    });

    // Store refresh token in Redis (expires in 7 days)
    await redisClient.setex(
      `session:${user._id}`,
      7 * 24 * 60 * 60,
      refreshToken
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  // REFRESH TOKEN
  async refreshToken(data: RefreshTokenDTO) {
    const { refreshToken } = data;

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Check if refresh token exists in Redis
    const storedToken = await redisClient.get(`session:${decoded.userId}`);

    if (!storedToken || storedToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    return {
      accessToken: newAccessToken,
    };
  }

  // LOGOUT
  async logout(userId: string) {
    // Delete session from Redis
    await redisClient.del(`session:${userId}`);

    return {
      message: 'Logged out successfully',
    };
  }

  // GET ME
  async getMe(userId: string) {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // FORGOT PASSWORD
  async forgotPassword(data: ForgotPasswordDTO) {
    const { email } = data;

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if email exists
      return {
        message: 'If your email is registered, you will receive a password reset link',
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Store in Redis (expires in 15 minutes)
    await redisClient.setex(
      `reset_password:${resetToken}`,
      15 * 60,
      user._id.toString()
    );

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request - EduLearn',
      html: getPasswordResetEmailTemplate(resetUrl, user.name),
    });

    return {
      message: 'If your email is registered, you will receive a password reset link',
    };
  }

  // RESET PASSWORD
  async resetPassword(data: ResetPasswordDTO) {
    const { token, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    // Get user ID from Redis
    const userId = await redisClient.get(`reset_password:${token}`);

    if (!userId) {
      throw new Error('Invalid or expired reset token');
    }

    // Update password
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.password = password;
    await user.save();

    // Delete reset token
    await redisClient.del(`reset_password:${token}`);

    // Delete all sessions (logout from all devices)
    await redisClient.del(`session:${userId}`);

    return {
      message: 'Password reset successful',
    };
  }
}
