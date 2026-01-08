import { Request, Response, NextFunction } from 'express';
import CourseService from './course.service';
import { sendSuccess, sendError } from '../../utils/response';

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

  // GET /api/courses
  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CourseService.getAllCourses();
      return sendSuccess(res, 200, 'Courses fetched successfully', result.courses);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
  }
}

export default new CourseController();
