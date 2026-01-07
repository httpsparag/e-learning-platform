# Avatar Upload Feature - Complete Guide

## Overview
The avatar feature is now fully integrated with:
- **Frontend**: React component with image upload, preview, and display
- **Backend**: MongoDB database storage and retrieval
- **Database**: Base64 image storage in UserProfile collection

## How It Works

### 1. **Upload Avatar**
- Click the camera icon on the avatar image in your profile
- Select an image file from your computer
- Image is validated:
  - Must be an image file (jpg, png, gif, etc.)
  - Maximum size: 5MB
- Image is converted to Base64 and shown as preview
- You'll see an info toast: "Avatar preview loaded. Click 'Save Profile' to save changes."

### 2. **Save Avatar**
- Click the **"Save Profile"** button to save all profile changes including avatar
- The avatar (Base64) is sent to the backend
- Backend stores it in MongoDB UserProfile collection
- You'll see a success toast: "✨ Profile updated successfully!"

### 3. **Load Avatar**
- When you visit your profile page, the avatar automatically loads from the database
- If no avatar is set, a gravatar fallback is displayed based on your email
- Avatar persists across page reloads and browser sessions

## Database Structure

**Collection**: `userprofiles`
**Field**: `avatar` (string - Base64 encoded image)

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  avatar: "data:image/png;base64,iVBORw0KGgoAAAANS...",
  phone: "",
  location: "",
  bio: "",
  // ... other fields
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### GET /api/profile
**Auth Required**: Yes (JWT token)
**Response**: 
```json
{
  "success": true,
  "data": {
    "avatar": "data:image/png;base64,..."
  }
}
```

### PUT /api/profile
**Auth Required**: Yes (JWT token)
**Body**:
```json
{
  "avatar": "data:image/png;base64,..."
}
```

## Testing the Feature

### Step 1: Login to Your Account
1. Go to http://localhost:5173/auth/login
2. Enter your credentials and login

### Step 2: Navigate to Profile
1. Click on your profile page (top navigation bar)
2. You should see your avatar (or gravatar placeholder)

### Step 3: Upload Avatar
1. Click the camera icon on the avatar
2. Select an image file (JPG, PNG, etc.)
3. See the preview load with an info toast
4. Click "Save Profile" button
5. See the success toast: "✨ Profile updated successfully!"

### Step 4: Verify Persistence
1. Refresh the page (F5 or Ctrl+R)
2. The avatar should still be displayed from the database
3. Check browser console for logs:
   - "Avatar loaded, length: XXXX" (when page loads)
   - "Avatar saved, length: XXXX" (when you save)

## Console Logging

Open browser Developer Tools (F12) and check the Console tab for debug logs:

```
Avatar file selected: image.jpg Size: 245000 Type: image/jpeg
Avatar converted to base64, length: 327000
Saving profile with avatar length: 327000
Profile saved successfully: {...}
Avatar saved, length: 327000
Profile reloaded after save: {...}
Avatar reloaded, length: 327000
```

## Troubleshooting

### Avatar Not Showing
1. Check browser console for errors
2. Verify file was uploaded (check console logs)
3. Make sure you clicked "Save Profile" button
4. Clear browser cache and reload

### Image Size Error
- Image must be less than 5MB
- Try compressing the image before uploading

### "Avatar preview loaded" but not saved
- Make sure you click "Save Profile" button
- Check that avatar change is included in the save request

### Avatar lost after refresh
- This indicates the save didn't work
- Check browser console for API errors
- Verify backend is running on port 5000

## File Locations

**Frontend**:
- Component: `/elearn-live/src/pages/user/Profile.tsx`
- Service: `/elearn-live/src/services/profile.service.ts`

**Backend**:
- Routes: `/backend/src/modules/profile/profile.routes.ts`
- Service: `/backend/src/modules/profile/profile.service.ts`
- Model: `/backend/src/models/userProfile.model.ts`

## Features Included

✅ Click-to-upload avatar with file input  
✅ Image preview immediately after selection  
✅ File type validation (must be image)  
✅ File size validation (max 5MB)  
✅ Base64 conversion for database storage  
✅ Database persistence in MongoDB  
✅ Auto-load from database on page load  
✅ Gravatar fallback if no avatar set  
✅ Toast notifications for user feedback  
✅ Console logging for debugging  
✅ Responsive avatar display  
✅ Saves with profile (not separate endpoint)  

## Next Steps

The avatar feature is production-ready! You can now:
1. Test the upload/save/load flow
2. Monitor console logs to verify data flow
3. Check MongoDB to see the stored base64 data
4. Deploy to production when ready
