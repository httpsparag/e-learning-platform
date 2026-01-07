# Dynamic Profile Setup Guide

## What Was Done

You now have a fully dynamic profile system where:
- Users register with **only name, email, and password**
- All other profile info (phone, location, bio, profession, company, social links) is **initially blank**
- Users can **edit and save** these fields at any time
- All data is stored in a **separate database table** for each user

---

## Files Created

### Backend
1. ✅ `backend/src/models/userProfile.model.ts` - MongoDB schema for profiles
2. ✅ `backend/src/modules/profile/profile.service.ts` - Service for profile CRUD operations
3. ✅ `backend/src/modules/profile/profile.routes.ts` - API endpoints

### Frontend
1. ✅ `elearn-live/src/services/profile.service.ts` - API client for profile
2. ✅ `elearn-live/src/pages/user/Profile.tsx` - Updated to use dynamic data

### Modified Files
1. ✅ `backend/src/modules/auth/auth.service.ts` - Imports and calls profile creation on signup
2. ✅ `backend/src/app.ts` - Registers profile routes

---

## How to Use

### 1. **Test User Registration**
- Go to signup page
- Enter: name, email, password only
- A UserProfile is automatically created in database with all blank fields

### 2. **Test Profile Page**
- After login, go to Profile page
- Name & Email show actual values (from signup)
- Phone, Location, Bio, Profession, Company, Social Links are **blank**
- Click "Edit" button

### 3. **Edit Profile**
- Fill in any fields you want
- Click "Save" to persist to database
- Click "Cancel" to discard changes

### 4. **Verify Data Persistence**
- Refresh the page - data should still be there
- Log out and log back in - data persists
- Use browser DevTools → Network tab to see API calls

---

## Database Structure

### User Collection (unchanged)
```
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashed...",
  role: "user",
  isEmailVerified: true,
  ...
}
```

### NEW - UserProfile Collection
```
{
  userId: ObjectId(user._id),        // Reference to User
  phone: "+91 98765 43210",           // Initially blank
  location: "City, Country",          // Initially blank
  bio: "About me...",                 // Initially blank
  profession: "Software Dev",         // Initially blank
  company: "Company Name",            // Initially blank
  socialLinks: {
    linkedin: "username",
    github: "username",
    twitter: "username"
  },
  avatar: "url...",                   // Initially blank
  joinedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Get User Profile
```
GET /api/profile
Headers: Authorization: Bearer {token}
```

### Update User Profile
```
PUT /api/profile
Headers: Authorization: Bearer {token}
Body: {
  phone: "+91...",
  location: "...",
  bio: "...",
  profession: "...",
  company: "...",
  socialLinks: {
    linkedin: "...",
    github: "...",
    twitter: "..."
  }
}
```

---

## Next Steps (Optional Enhancements)

- [ ] Add avatar upload functionality
- [ ] Add form validation (email, phone format, etc.)
- [ ] Add profile completion percentage badge
- [ ] Add "Update Profile" toast notifications
- [ ] Add profile picture cropping
- [ ] Add GitHub/LinkedIn API integration to auto-fill social links
- [ ] Add password change form in Security tab
- [ ] Implement actual billing and notification settings

---

## Testing Checklist

- [ ] Register new user with name, email, password
- [ ] Verify all profile fields are blank initially
- [ ] Edit profile and add phone number
- [ ] Save and verify it persists
- [ ] Refresh page and verify data is still there
- [ ] Log out and back in
- [ ] Verify profile data still exists
- [ ] Check Network tab in DevTools for API calls
- [ ] Test Cancel button (changes don't save)
- [ ] Check console for any errors

---

## Troubleshooting

### Profile not loading?
1. Check if user is authenticated
2. Check browser console for API errors
3. Verify `/api/profile` endpoint is working
4. Check MongoDB connection

### Save not working?
1. Check Network tab - is PUT request being made?
2. Check for validation errors in response
3. Verify auth token is valid
4. Check backend logs for errors

### Fields showing but not editable?
1. Make sure isEditing state is true
2. Check if Edit button click works
3. Verify onChange handlers are connected

---

## API Response Examples

### Success Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "phone": "+91 98765 43210",
    "location": "Pimpri, Maharashtra",
    "bio": "Full-stack developer",
    "profession": "Software Developer",
    "company": "Tech Solutions",
    "socialLinks": {
      "linkedin": "john-doe",
      "github": "johndoe",
      "twitter": "@johndoe"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-20T14:30:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to update profile"
}
```

---

## Important Notes

1. **Auto-creation**: UserProfile is automatically created when user registers
2. **Per-user data**: Each user has exactly ONE profile document
3. **Optional fields**: All fields except userId are optional
4. **Read-only**: Name and Email are read-only (from signup)
5. **Async operations**: All profile changes are async with loading states
6. **Validation**: Frontend shows placeholders, backend validates on save

---

## Code Examples

### Loading profile in React component:
```typescript
const [profileData, setProfileData] = useState<UserProfile>({}); 
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const loadProfile = async () => {
    const response = await profileService.getProfile();
    if (response.success) {
      setProfileData(response.data);
    }
    setIsLoading(false);
  };
  loadProfile();
}, [user?.id]);
```

### Saving profile:
```typescript
const handleSave = async () => {
  const response = await profileService.updateProfile(profileData);
  if (response.success) {
    setProfileData(response.data);
    alert('Profile updated!');
  }
};
```

---

## Questions?

- Check the DYNAMIC_PROFILE_IMPLEMENTATION.md file for detailed architecture
- Review the code comments in the files
- Check MongoDB to verify UserProfile collection exists
