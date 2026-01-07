import { Router, Request, Response } from 'express';
import ProfileService from './profile.service';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// Get user profile
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    console.log('Fetching profile for userId:', userId);
    const profile = await ProfileService.getUserProfile(userId);

    if (!profile) {
      console.log('Profile not found for userId:', userId);
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    console.log('Profile fetched, avatar length:', (profile.avatar as string)?.length || 0);
    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch profile',
    });
  }
});

// Create user profile
router.post('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const profile = await ProfileService.createUserProfile(userId);

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create profile',
    });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const profileData = req.body;
    console.log('Received profile update request, avatar length:', profileData.avatar?.length || 0);

    const profile = await ProfileService.updateUserProfile(userId, profileData);

    console.log('Profile updated and returned, avatar length:', (profile?.avatar as string)?.length || 0);
    
    res.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile',
    });
  }
});

export default router;
