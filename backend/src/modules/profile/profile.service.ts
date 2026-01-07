import { UserProfile, IUserProfile } from '../../models/userProfile.model';
import mongoose from 'mongoose';

export class ProfileService {
  // Get user profile
  async getUserProfile(userId: string) {
    const profile = await UserProfile.findOne({ userId });
    return profile;
  }

  // Create user profile (called after user registration)
  async createUserProfile(userId: string) {
    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return existingProfile;
    }

    const profile = await UserProfile.create({
      userId: new mongoose.Types.ObjectId(userId),
      phone: '',
      location: '',
      bio: '',
      profession: '',
      company: '',
      socialLinks: {
        linkedin: '',
        github: '',
        twitter: '',
      },
      avatar: '',
    });

    return profile;
  }

  // Update user profile
  async updateUserProfile(userId: string, data: Partial<IUserProfile>) {
    // Build update object, only including fields that are explicitly provided
    const updateData: any = {};
    
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.profession !== undefined) updateData.profession = data.profession;
    if (data.company !== undefined) updateData.company = data.company;
    
    // Only update socialLinks if provided
    if (data.socialLinks) {
      updateData.socialLinks = {
        linkedin: data.socialLinks.linkedin || '',
        github: data.socialLinks.github || '',
        twitter: data.socialLinks.twitter || '',
      };
    }
    
    // Avatar: keep existing if not provided, otherwise use the provided value
    if (data.avatar !== undefined) {
      console.log('Updating avatar, length:', (data.avatar as string)?.length || 0);
      updateData.avatar = data.avatar;
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        $set: updateData,
      },
      { new: true, upsert: true }
    );

    console.log('Profile updated, avatar in DB length:', (profile?.avatar as string)?.length || 0);
    return profile;
  }

  // Delete user profile
  async deleteUserProfile(userId: string) {
    return await UserProfile.deleteOne({ userId });
  }
}

export default new ProfileService();
