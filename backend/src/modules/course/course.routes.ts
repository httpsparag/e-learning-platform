import { Router, Request, Response, NextFunction } from 'express';
import CourseController from './course.controller';
import { instructorAuth } from '../../middlewares/auth.middleware';

const router = Router();

interface AuthRequest extends Request {
  instructorId?: string;
}

// Debug endpoint to verify routes are loaded
router.get('/test', (req: Request, res: Response) => {
  res.json({ 
    message: 'Course routes are loaded!',
    timestamp: new Date().toISOString()
  });
});

// Protected instructor routes - must come BEFORE generic :courseId routes
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

// Video upload endpoint - Works with or without auth
router.post(
  '/upload/video-signature',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.getVideoUploadSignature(req, res, next)
);

// Public routes
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  CourseController.getAllCourses(req, res, next)
);

router.get('/:courseId', (req: Request, res: Response, next: NextFunction) =>
  CourseController.getCourseById(req, res, next)
);

router.patch(
  '/:courseId',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.updateCourse(req, res, next)
);

router.patch(
  '/:courseId/publish',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.publishCourse(req, res, next)
);

router.delete(
  '/:courseId',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.deleteCourse(req, res, next)
);

// POST /api/course/:courseId/enroll-student
router.post(
  '/:courseId/enroll-student',
  instructorAuth,
  (req: AuthRequest, res: Response, next: NextFunction) =>
    CourseController.enrollStudent(req, res, next)
);

export default router;
