import crypto from 'crypto';
import { Instructor, IInstructor } from '../../models/instructor.model';
import { Organization } from '../../models/organization.model';
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

export class InstructorAuthService {
  // REGISTER INSTRUCTOR
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

    // Check if instructor already exists
    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      throw new Error('Email already registered as instructor');
    }

    // Create instructor
    const instructor = await Instructor.create({
      name,
      email,
      password,
      isEmailVerified: false,
      status: 'active',
    });

    // Generate OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in Redis (expires in 10 minutes)
    await redisClient.setex(
      `verify_instructor:${instructor._id}`,
      parseInt(process.env.OTP_EXPIRY || '600'),
      otp
    );

    // Send verification email
    await sendEmail({
      to: instructor.email,
      subject: 'Verify Your Email - EduLearn Instructor',
      html: getVerificationEmailTemplate(otp, instructor.name),
    });

    return {
      instructorId: instructor._id,
      name: instructor.name,
      email: instructor.email,
      message: 'Instructor registration successful. Please check your email for verification code.',
    };
  }

  // VERIFY EMAIL FOR INSTRUCTOR
  async verifyEmail(data: VerifyEmailDTO) {
    const { userId, otp } = data;

    // Get OTP from Redis
    const storedOtp = await redisClient.get(`verify_instructor:${userId}`);

    if (!storedOtp) {
      throw new Error('OTP expired or invalid');
    }

    if (storedOtp !== otp) {
      throw new Error('Incorrect OTP');
    }

    // Update instructor
    const instructor = await Instructor.findByIdAndUpdate(
      userId,
      { isEmailVerified: true },
      { new: true }
    );

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Delete OTP from Redis
    await redisClient.del(`verify_instructor:${userId}`);

    return {
      message: 'Email verified successfully',
    };
  }

  // RESEND OTP
  async resendOtp(instructorId: string) {
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Generate OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in Redis (expires in 10 minutes)
    await redisClient.setex(
      `verify_instructor:${instructorId}`,
      parseInt(process.env.OTP_EXPIRY || '600'),
      otp
    );

    // Send verification email
    await sendEmail({
      to: instructor.email,
      subject: 'Your Verification Code - EduLearn Instructor',
      html: getVerificationEmailTemplate(otp, instructor.name),
    });

    return {
      message: 'OTP sent to your email',
    };
  }

  // LOGIN INSTRUCTOR - Organization Invitation Based
  // Flow: Organization sends email with temporary password to instructor
  // Instructor logs in with email + temporary password from email
  async login(data: LoginDTO) {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find instructor by email
    const instructor = await Instructor.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!instructor) {
      throw new Error('Instructor not found. Please check your email and try again.');
    }

    // Verify password (temporary password from invitation email)
    const isPasswordValid = await instructor.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new Error('Incorrect password. Please use the password from your invitation email.');
    }

    // Allow login for both active and inactive instructors (newly invited)
    if (instructor.status === 'suspended') {
      throw new Error('Your instructor account has been suspended');
    }

    // Update status to active on first successful login if inactive
    if (instructor.status === 'inactive') {
      instructor.status = 'active';
      instructor.isEmailVerified = true;
      await instructor.save();

      // Also update the status in the organization's instructor list
      await Organization.findOneAndUpdate(
        { 'instructors.instructorId': instructor._id },
        { 
          $set: { 
            'instructors.$.status': 'active',
            'instructors.$.joinedAt': new Date()
          } 
        }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: instructor._id.toString(),
      role: 'instructor',
    });

    const refreshToken = generateRefreshToken({
      id: instructor._id.toString(),
      role: 'instructor',
    });

    // Return user data
    const instructorData = {
      id: instructor._id.toString(),
      name: instructor.name,
      email: instructor.email,
      role: 'instructor',
      avatar: instructor.avatar,
      status: instructor.status,
    };

    return {
      accessToken,
      refreshToken,
      user: instructorData,
      message: 'Login successful',
    };
  }

  // REFRESH TOKEN
  async refreshToken(data: RefreshTokenDTO) {
    const { refreshToken } = data;

    try {
      const decoded = verifyRefreshToken(refreshToken);

      const instructorId = decoded.id || decoded.userId;
      const instructor = await Instructor.findById(instructorId);

      if (!instructor || instructor.status !== 'active') {
        throw new Error('Instructor not found or inactive');
      }

      // Generate new access token
      const newAccessToken = generateAccessToken({
        id: instructor._id.toString(),
        role: 'instructor',
      });

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // GET INSTRUCTOR PROFILE
  async getInstructorProfile(instructorId: string) {
    const instructor = await Instructor.findById(instructorId).select('-password');

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    return {
      instructor,
    };
  }

  // UPDATE INSTRUCTOR PROFILE
  async updateInstructorProfile(instructorId: string, updateData: any) {
    const allowedFields = [
      'name',
      'phone',
      'bio',
      'expertise',
      'qualifications',
      'avatar',
      'bankDetails',
    ];

    const filteredData = Object.keys(updateData)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    const instructor = await Instructor.findByIdAndUpdate(
      instructorId,
      filteredData,
      { new: true }
    );

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    return {
      message: 'Profile updated successfully',
      instructor,
    };
  }

  // FORGOT PASSWORD
  async forgotPassword(data: ForgotPasswordDTO) {
    const { email } = data;

    const instructor = await Instructor.findOne({ email });

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Store hashed token in Redis (expires in 1 hour)
    await redisClient.setex(
      `reset_password_instructor:${hashedToken}`,
      3600,
      instructor._id.toString()
    );

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/auth/instructor/reset-password?token=${resetToken}`;

    await sendEmail({
      to: instructor.email,
      subject: 'Reset Your Password - EduLearn Instructor',
      html: getPasswordResetEmailTemplate(resetUrl, instructor.name),
    });

    return {
      message: 'Password reset link sent to your email',
    };
  }

  // RESET PASSWORD
  async resetPassword(data: ResetPasswordDTO) {
    const { token, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Get instructor ID from Redis
    const instructorId = await redisClient.get(
      `reset_password_instructor:${hashedToken}`
    );

    if (!instructorId) {
      throw new Error('Invalid or expired reset token');
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    // Update password
    const instructor = await Instructor.findByIdAndUpdate(
      instructorId,
      { password },
      { new: true }
    );

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Delete token from Redis
    await redisClient.del(`reset_password_instructor:${hashedToken}`);

    return {
      message: 'Password reset successfully',
    };
  }

  // GET ME (for authenticated instructor)
  async getMe(instructorId: string) {
    const instructor = await Instructor.findById(instructorId).select('-password');

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    return {
      instructor: {
        id: instructor._id.toString(),
        name: instructor.name,
        email: instructor.email,
        role: 'instructor',
        avatar: instructor.avatar,
        phone: instructor.phone,
        bio: instructor.bio,
        expertise: instructor.expertise,
        qualifications: instructor.qualifications,
        totalStudents: instructor.totalStudents,
        totalCourses: instructor.totalCourses,
        avgRating: instructor.avgRating,
        totalEarnings: instructor.totalEarnings,
        status: instructor.status,
      },
    };
  }
}

export default new InstructorAuthService();
