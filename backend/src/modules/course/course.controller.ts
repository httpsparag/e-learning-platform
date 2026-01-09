import { Request, Response, NextFunction } from 'express';
import CourseService from './course.service';
import { sendSuccess, sendError } from '../../utils/response';
import crypto from 'crypto';

interface AuthRequest extends Request {
  instructorId?: string;
}

export class CourseController {
  // POST /api/courses/create
  async createCourse(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, description, videoUrl, videoPublicId, instructorName, instructorEmail, level } = req.body;
      const instructorId = req.instructorId;

      if (!title || !description || !videoUrl || !videoPublicId || !instructorName) {
        return sendError(res, 400, 'Missing required fields');
      }

      const courseData = {
        title,
        description,
        videoUrl,
        videoPublicId,
        instructorId,
        instructorName,
        instructorEmail,
        level: level || 'Beginner',
        status: 'Draft' as const,
        enrolledCount: 0,
        capacity: 300,
        rating: 0,
        reviewCount: 0,
        revenue: 0,
      };

      const result = await CourseService.createCourse(courseData);
      return sendSuccess(res, 201, result.message, result.course);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // GET /api/courses/instructor
  async getInstructorCourses(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const instructorId = req.instructorId;

      if (!instructorId) {
        return sendError(res, 401, 'Unauthorized');
      }

      const result = await CourseService.getInstructorCourses(instructorId);
      return sendSuccess(res, 200, 'Courses fetched successfully', result.courses);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // GET /api/courses/:courseId
  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      const result = await CourseService.getCourseById(courseId);
      return sendSuccess(res, 200, 'Course fetched successfully', result.course);
    } catch (error: any) {
      return sendError(res, 404, error.message);
    }
  }

  // PATCH /api/courses/:courseId
  async updateCourse(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      const updateData = req.body;

      const result = await CourseService.updateCourse(courseId, updateData);
      return sendSuccess(res, 200, result.message, result.course);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // DELETE /api/courses/:courseId
  async deleteCourse(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      const result = await CourseService.deleteCourse(courseId);
      return sendSuccess(res, 200, result.message);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // PATCH /api/courses/:courseId/publish
  async publishCourse(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      if (!courseId) {
        return sendError(res, 400, 'Course ID is required');
      }

      const result = await CourseService.updateCourse(courseId, { status: 'Active' });
      return sendSuccess(res, 200, 'Course published successfully', result.course);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // GET /api/courses
  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CourseService.getAllCourses();
      return sendSuccess(res, 200, 'Courses fetched successfully', result.courses);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }

  // POST /api/courses/upload/video-signature
  async getVideoUploadSignature(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      console.log('📥 Signature request received');

      if (!req.instructorId) {
        return sendError(res, 401, 'Unauthorized - No instructor ID');
      }

      const timestamp = Math.round(new Date().getTime() / 1000);
      const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (!uploadPreset || !apiSecret) {
        console.error('❌ Missing Cloudinary credentials');
        return sendError(res, 500, 'Cloudinary not configured');
      }

      // Build signature string - parameters in ALPHABETICAL order
      // NOTE: resource_type is NOT included in signature, only in upload params
      const params = {
        folder: 'instructor-courses',
        tags: 'instructor-course',
        timestamp: timestamp.toString(),
        upload_preset: uploadPreset,
      };

      // Create the signature string from alphabetically sorted parameters
      const paramPairs = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key as keyof typeof params]}`);
      
      const signatureString = paramPairs.join('&') + apiSecret;

      console.log('   Signature string:', paramPairs.join('&') + '[SECRET]');

      // Generate SHA-256 signature
      const signature = crypto
        .createHash('sha256')
        .update(signatureString)
        .digest('hex');

      console.log('✅ Signature generated successfully!');

      return sendSuccess(res, 200, 'Upload signature generated', {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        uploadPreset: uploadPreset,
        apiKey: process.env.CLOUDINARY_API_KEY,
      });
    } catch (error: any) {
      console.error('❌ Error generating signature:', error);
      return sendError(res, 400, error.message);
    }
  }
}

export default new CourseController();
