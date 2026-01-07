import api from './api';

export interface UserProfile {
  _id?: string;
  userId?: string;
  phone?: string;
  location?: string;
  bio?: string;
  profession?: string;
  company?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  joinedDate?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

class ProfileService {
  async getProfile() {
    try {
      const response = await api.get('/profile');
      const data = response.data;
      
      // Ensure proper data structure
      if (data.success && data.data) {
        const profile = data.data;
        // Ensure socialLinks has default structure
        if (!profile.socialLinks) {
          profile.socialLinks = {
            linkedin: '',
            github: '',
            twitter: ''
          };
        }
        console.log('Profile fetched:', profile);
      }
      return data;
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async createProfile() {
    try {
      const response = await api.post('/profile');
      return response.data;
    } catch (error: any) {
      console.error('Error creating profile:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateProfile(profileData: Partial<UserProfile>) {
    try {
      const response = await api.put('/profile', profileData);
      const data = response.data;
      
      // Ensure proper data structure in response
      if (data.success && data.data) {
        const profile = data.data;
        if (!profile.socialLinks) {
          profile.socialLinks = {
            linkedin: '',
            github: '',
            twitter: ''
          };
        }
        console.log('Profile updated:', profile);
      }
      return data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default new ProfileService();
