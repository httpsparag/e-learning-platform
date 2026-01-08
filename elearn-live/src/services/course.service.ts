import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface CreateCourseData {
  title: string;
  description: string;
  videoUrl: string;
  videoPublicId: string;
  instructorName: string;
  instructorEmail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Course extends CreateCourseData {
  _id: string;
  instructorId: string;
  status: 'Draft' | 'Active';
  enrolledCount: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
  lastUpdated: string;
}

class CourseService {
  async createCourse(courseData: CreateCourseData) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(`${API_BASE_URL}/courses/create`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create course');
    }
  }

  async getInstructorCourses() {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/courses/instructor/my-courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
  }

  async getCourseById(courseId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course');
    }
  }

  async getAllCourses() {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
  }

  async updateCourse(courseId: string, updateData: Partial<CreateCourseData>) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.patch(`${API_BASE_URL}/courses/${courseId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update course');
    }
  }

  async deleteCourse(courseId: string) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(`${API_BASE_URL}/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete course');
    }
  }
}

export default new CourseService();
