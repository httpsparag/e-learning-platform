# Dynamic Profile Implementation Summary

## Overview
The Profile page has been converted to a fully dynamic system where:
- Only **name, email, and password** are collected during signup
- All other profile fields are initially **blank**
- Users can **edit and save** additional information
- All profile data is stored in a **separate database table** per user

---

## Backend Changes

### 1. New Model: `userProfile.model.ts`
**Location:** `backend/src/models/userProfile.model.ts`

Created a new MongoDB schema for user profiles with the following fields:
- `userId` (reference to User collection)
- `phone` - Initially blank
- `location` - Initially blank
- `bio` - Initially blank (max 500 chars)
- `profession` - Initially blank
- `company` - Initially blank
- `socialLinks` object:
  - `linkedin`
  - `github`
  - `twitter`
- `avatar` - Initially blank
- `joinedDate` - Auto-populated
- `timestamps` - createdAt, updatedAt

**Key Features:**
- Each user has ONE profile document (unique userId reference)
- All optional fields with empty string defaults
- Full CRUD support

---

### 2. Profile Service: `profile.service.ts`
**Location:** `backend/src/modules/profile/profile.service.ts`

Provides the following methods:
- **`getUserProfile(userId)`** - Fetch user's profile data
- **`createUserProfile(userId)`** - Auto-create profile on registration
- **`updateUserProfile(userId, data)`** - Update profile fields
- **`deleteUserProfile(userId)`** - Delete user profile

---

### 3. Profile Routes: `profile.routes.ts`
**Location:** `backend/src/modules/profile/profile.routes.ts`

API Endpoints (all require authentication):
- `GET /api/profile` - Get current user's profile
- `POST /api/profile` - Create new profile (auto-called on signup)
- `PUT /api/profile` - Update profile fields

All routes use the `authMiddleware` to ensure user authenticity.

---

### 4. Auth Service Integration
Updated `auth.service.ts`:
- When a user registers, a **UserProfile is automatically created**
- Profile starts with all fields empty except for the reference
- No manual intervention needed

Updated `app.ts`:
- Added profile routes: `app.use('/api', profileRoutes);`
- Routes accessible at `/api/profile`

---

## Frontend Changes

### 1. Profile Service: `profile.service.ts`
**Location:** `elearn-live/src/services/profile.service.ts`

TypeScript interface and service class:
```typescript
interface UserProfile {
  phone?: string;
  location?: string;
  bio?: string;
  profession?: string;
  company?: string;
  socialLinks?: { linkedin?: string; github?: string; twitter?: string; };
  avatar?: string;
  // ... other fields
}
```

Methods:
- **`getProfile()`** - Fetch profile from API
- **`createProfile()`** - Create new profile
- **`updateProfile(data)`** - Save profile changes

---

### 2. Updated Profile Component: `Profile.tsx`
**Location:** `elearn-live/src/pages/user/Profile.tsx`

**Key Changes:**

#### State Management:
```typescript
const [isEditing, setIsEditing] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [isSaving, setIsSaving] = useState(false);
const [profileData, setProfileData] = useState<UserProfile>({
  // All fields initially blank
});
```

#### Data Loading:
- Fetches profile on component mount
- Updates profileData state with API response
- Handles loading states gracefully

#### Display Logic:
- **Name & Email:** Read-only fields (from auth context, collected at signup)
- **Other Fields:** Editable, initially blank with placeholders
- **Dynamic Avatar:** Falls back to gravatar if no custom avatar set

#### Edit Mode:
- Click "Edit" button to enable editing
- All optional fields become editable
- "Save" button persists changes to backend
- "Cancel" button discards unsaved changes
- Disabled state shown while saving

#### Field Handlers:
```typescript
const handleProfileChange(field, value)    // Regular fields
const handleSocialChange(platform, value)  // Social links
const handleSaveProfile()                  // Save to backend
```

---

## Data Flow

### 1. **User Registration**
```
User registers with: name, email, password
        ↓
Auth Service creates User document
        ↓
Profile Service creates empty UserProfile (auto-called)
        ↓
User receives success message
```

### 2. **User Visits Profile Page**
```
Component mounts
        ↓
useEffect triggers API call to GET /api/profile
        ↓
Frontend receives UserProfile with all blank fields
        ↓
Component displays read-only name/email + blank editable fields
```

### 3. **User Edits Profile**
```
User clicks "Edit" button
        ↓
Form fields become editable
        ↓
User fills in phone, location, bio, profession, etc.
        ↓
User clicks "Save"
        ↓
PUT /api/profile with updated data
        ↓
Backend updates UserProfile document
        ↓
Frontend updates state & shows success message
```

---

## Database Schema

### UserProfile Collection Example:
```json
{
  "_id": "ObjectId(...)",
  "userId": "ObjectId(...)",
  "phone": "+91 98765 43210",
  "location": "Pimpri, Maharashtra",
  "bio": "Full-stack developer...",
  "profession": "Software Developer",
  "company": "Tech Solutions Inc.",
  "socialLinks": {
    "linkedin": "alexkumar",
    "github": "alexkumar",
    "twitter": "alex_kumar"
  },
  "avatar": "https://...",
  "joinedDate": "2024-01-15T10:00:00Z",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-20T14:30:00Z"
}
```

---

## Features Implemented

✅ Separate UserProfile table per user  
✅ Auto-create profile on registration  
✅ Load profile data on page visit  
✅ Edit profile with validation  
✅ Save changes to database  
✅ Show loading & saving states  
✅ Preserve read-only signup fields (name, email)  
✅ Display blank fields with helpful placeholders  
✅ Success/error feedback  
✅ Cancel edit without saving  
✅ Dynamic avatar fallback  
✅ All fields optional except userId  

---

## Testing Steps

1. **Register a new user** with email, name, password
2. **Navigate to Profile page** - See all optional fields blank
3. **Click Edit** - Fields become editable
4. **Fill in some fields** (phone, location, bio, profession, company, social links)
5. **Click Save** - Should see success message
6. **Refresh page** - Data should persist
7. **Log out and log back in** - Profile data should still be there

---

## API Usage Examples

### Get Profile
```bash
GET /api/profile
Authorization: Bearer {token}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "userId": "...",
    "phone": "+91...",
    "location": "...",
    ...
  }
}
```

### Update Profile
```bash
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+91 98765 43210",
  "location": "Pimpri, India",
  "bio": "...",
  "profession": "...",
  "company": "...",
  "socialLinks": {
    "linkedin": "...",
    "github": "...",
    "twitter": "..."
  }
}
```

---

## Notes

- All profile updates are **async** - showing loading states
- Profile is **auto-created** during registration - no manual creation needed
- Fields are **optional** - users can fill them in gradually
- Data is **persisted** to database immediately on save
- Each user has **exactly one** UserProfile document
- Read-only fields prevent data tampering from signup
