import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Response interceptor to handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🔴 Global: 401 Unauthorized - clearing auth');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('instructorName');
      localStorage.removeItem('instructorEmail');
      localStorage.removeItem('instructorId');
      // Reload to let ProtectedInstructorRoute redirect
      window.location.href = '/instructor/auth';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
