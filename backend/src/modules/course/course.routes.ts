import { Router, Request, Response, NextFunction } from 'express';
import CourseController from './course.controller';
import { instructorAuth } from '../../middlewares/auth.middleware';

const router = Router();

interface AuthRequest extends Request {
  instructorId?: string;
}

// Public routes
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  CourseController.getAllCourses(req, res, next)
);

router.get('/:courseId', (req: Request, res: Response, next: NextFunction) =>
  CourseController.getCourseById(req, res, next)
);

// Protected instructor routes
router.post(
  '/create',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.createCourse(req, res, next)
);

router.get(
  '/instructor/my-courses',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.getInstructorCourses(req, res, next)
);

router.patch(
  '/:courseId',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.updateCourse(req, res, next)
);

router.delete(
  '/:courseId',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.deleteCourse(req, res, next)
);

export default router;
