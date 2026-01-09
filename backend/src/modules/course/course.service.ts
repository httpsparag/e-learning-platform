import { Course, ICourse } from '../../models/course.model';

export class CourseService {
  async createCourse(courseData: Partial<ICourse>) {
    try {
      const course = await Course.create(courseData);
      return {
        success: true,
        message: 'Course created successfully',
        course,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create course');
    }
  }

  async getInstructorCourses(instructorId: string) {
    try {
      const courses = await Course.find({ instructorId }).sort({ createdAt: -1 });
      return {
        success: true,
        courses,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch courses');
    }
  }

  async getCourseById(courseId: string) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      return {
        success: true,
        course,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch course');
    }
  }

  async updateCourse(courseId: string, updateData: Partial<ICourse>) {
    try {
      const course = await Course.findByIdAndUpdate(
        courseId,
        { ...updateData, lastUpdated: new Date() },
        { new: true }
      );
      if (!course) {
        throw new Error('Course not found');
      }
      return {
        success: true,
        message: 'Course updated successfully',
        course,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update course');
    }
  }

  async deleteCourse(courseId: string) {
    try {
      const course = await Course.findByIdAndDelete(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      return {
        success: true,
        message: 'Course deleted successfully',
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete course');
    }
  }

  async publishCourse(courseId: string) {
    try {
      const course = await Course.findByIdAndUpdate(
        courseId,
        { status: 'Active', lastUpdated: new Date() },
        { new: true }
      );
      if (!course) {
        throw new Error('Course not found');
      }
      return {
        success: true,
        message: 'Course published successfully',
        course,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to publish course');
    }
  }

  async getAllCourses(filter?: any) {
    try {
      const courses = await Course.find(filter || { status: 'Active' }).sort({
        createdAt: -1,
      });
      return {
        success: true,
        courses,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch courses');
    }
  }
}

export default new CourseService();
