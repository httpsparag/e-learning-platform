import axiosInstance from '../lib/axiosInstance';

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
  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    console.log('📤 Creating request with token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private handleAuthError(error: any) {
    // If 401, clear auth but don't redirect immediately
    if (error.response?.status === 401) {
      console.log('❌ Unauthorized (401) - clearing auth');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('instructorName');
      localStorage.removeItem('instructorEmail');
      localStorage.removeItem('instructorId');
      throw new Error('Your session has expired. Please login again.');
    }
    throw new Error(error.response?.data?.message || 'An error occurred');
  }

  async createCourse(courseData: CreateCourseData) {
    try {
      console.log('📤 Creating course:', courseData.title);
      const response = await axiosInstance.post(`/courses/create`, courseData, {
        headers: this.getAuthHeaders(),
      });
      console.log('✅ Course created successfully');
      return response.data.data;
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }

  async getInstructorCourses() {
    try {
      console.log('🔄 Fetching instructor courses');
      const response = await axiosInstance.get(`/courses/instructor/my-courses`, {
        headers: this.getAuthHeaders(),
      });
      console.log('✅ Courses fetched:', response.data.data?.length || 0);
      return response.data.data;
    } catch (error: any) {
      console.error('❌ Error fetching courses:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        fullError: error.message,
      });
      this.handleAuthError(error);
    }
  }

  async getCourseById(courseId: string) {
    try {
      const response = await axiosInstance.get(`/courses/${courseId}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course');
    }
  }

  async getAllCourses() {
    try {
      const response = await axiosInstance.get(`/courses`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
  }

  async updateCourse(courseId: string, updateData: Partial<CreateCourseData>) {
    try {
      const response = await axiosInstance.patch(`/courses/${courseId}`, updateData, {
        headers: this.getAuthHeaders(),
      });
      return response.data.data;
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }

  async deleteCourse(courseId: string) {
    try {
      const response = await axiosInstance.delete(`/courses/${courseId}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }
}

export default new CourseService();
