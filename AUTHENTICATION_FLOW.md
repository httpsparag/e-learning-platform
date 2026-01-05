# E-Learning Platform - Authentication & Enrollment Flow

## Complete Authentication Setup

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend (React)              Backend (Node.js)    Database      │
│  ─────────────────              ──────────────────  ────────────  │
│                                                                   │
│  1. User Registration ──────► POST /api/auth/register ──► MongoDB │
│     ├─ Name, Email, Password                      │              │
│     └─ Password Validation                        └─► Redis OTP  │
│                                                                   │
│  2. Email Verification ───────► POST /api/auth/verify-email      │
│     └─ OTP (6 digits, 10 min)                                   │
│                                                                   │
│  3. User Login ────────────────► POST /api/auth/login ──► JWT    │
│     ├─ Access Token (expires)                                   │
│     ├─ Refresh Token (cookie)                                   │
│     └─ User Data                                                │
│                                                                   │
│  4. Protected Requests ──────────┐                              │
│     └─ Authorization Bearer      │                              │
│        Access Token              ├─► Verify JWT                 │
│                                  └─► Execute Request            │
│                                                                   │
│  5. Token Refresh ──────────────► POST /api/auth/refresh-token  │
│     ├─ Refresh Token                                            │
│     └─ New Access Token                                         │
│                                                                   │
│  6. Logout ──────────────────────► POST /api/auth/logout        │
│     └─ Clear Session from Redis                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Three Enrollment Scenarios

### Scenario 1: New User Enrolling

```
1. User visits /courses (Public Route)
   ↓
2. User clicks "Enroll Now" button
   ↓
3. CourseDetail.tsx checks: isAuthenticated = false
   ↓
4. Redirect to /auth/signup with:
   - redirectAfterAuth: /enrollment/course-id
   - courseId: course-id
   - message: "Please sign up to enroll in this course"
   ↓
5. User completes registration
   - Email verification required (OTP)
   ↓
6. User verifies email
   ↓
7. AuthContext updates: isAuthenticated = true, user = userData
   ↓
8. Automatically redirected to: /enrollment/course-id
   ↓
9. Enrollment.tsx displays with user info pre-filled
   ↓
10. User clicks "Complete Enrollment"
    ↓
11. Enrollment successful → Redirect to /dashboard
```

### Scenario 2: Existing User Enrolling (Not Logged In)

```
1. User visits /courses (Public Route)
   ↓
2. User clicks "Enroll Now" button
   ↓
3. CourseDetail.tsx checks: isAuthenticated = false
   ↓
4. Redirect to /auth/login (instead of signup)
   ↓
5. User logs in with credentials
   ↓
6. Login API returns: accessToken, refreshToken, user data
   ↓
7. AuthContext updates: isAuthenticated = true, user = userData
   ↓
8. Automatically redirected to: /enrollment/course-id
   ↓
9. Enrollment.tsx displays with user info pre-filled
   ↓
10. User clicks "Complete Enrollment"
    ↓
11. Enrollment successful → Redirect to /dashboard
```

### Scenario 3: Authenticated User Enrolling

```
1. User visits /courses (Public Route)
   ↓
2. On page load: AuthContext initializes
   - Checks localStorage for accessToken
   - Verifies token validity
   - Loads user data via GET /api/auth/me
   - isAuthenticated = true
   ↓
3. User clicks "Enroll Now" button
   ↓
4. CourseDetail.tsx checks: isAuthenticated = true
   ↓
5. Directly navigate to: /enrollment/course-id
   ↓
6. ProtectedRoute component checks isAuthenticated
   - If true → Show Enrollment component
   - If false → Redirect to /auth/login
   ↓
7. Enrollment.tsx displays with user info pre-filled
   ↓
8. User clicks "Complete Enrollment"
   ↓
9. Enrollment API call with accessToken
   ↓
10. Enrollment successful → Redirect to /dashboard
```

## Frontend Implementation

### AuthContext (Context/AuthContext.tsx)

The AuthContext provides:
- `user`: Current authenticated user data
- `isAuthenticated`: Boolean flag for auth state
- `isLoading`: Loading state during auth operations
- Methods: `register()`, `login()`, `logout()`, `verifyEmail()`, `getMe()`, etc.

### ProtectedRoute Component

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

Behavior:
- If `isLoading` → Show loading spinner
- If `!isAuthenticated` → Redirect to `/auth/login`
- If `requiredRole` && `user.role !== requiredRole` → Redirect to `/`
- Otherwise → Render child component

### API Interceptors (services/api.ts)

Axios interceptors handle:
1. **Request Interceptor**: Add `Authorization: Bearer {accessToken}` to all requests
2. **Response Interceptor**: 
   - On 401 error: Automatically refresh token
   - Update localStorage with new accessToken
   - Retry the original request
   - If refresh fails: Clear auth and redirect to login

## Backend API Endpoints

### Authentication Endpoints

#### 1. Register
```
POST /api/auth/register
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}

Response: 201 Created
{
  "success": true,
  "message": "Registration successful. Please check your email for verification code.",
  "data": {
    "userId": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Verify Email
```
POST /api/auth/verify-email
Content-Type: application/json

Request:
{
  "userId": "user_id_here",
  "otp": "123456"
}

Response: 200 OK
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### 3. Resend OTP
```
POST /api/auth/resend-otp
Content-Type: application/json

Request:
{
  "userId": "user_id_here"
}

Response: 200 OK
{
  "success": true,
  "message": "Verification code resent"
}
```

#### 4. Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
Headers:
  Set-Cookie: refreshToken=...; HttpOnly; Secure; Max-Age=604800

Body:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": null
    }
  }
}
```

#### 5. Refresh Token
```
POST /api/auth/refresh-token
Content-Type: application/json
Cookie: refreshToken=...

Request:
{}

Response: 200 OK
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "new_jwt_token..."
  }
}
```

#### 6. Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": null,
      "isEmailVerified": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

#### 7. Logout (Protected)
```
POST /api/auth/logout
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 8. Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

Request:
{
  "email": "john@example.com"
}

Response: 200 OK
{
  "success": true,
  "message": "If your email is registered, you will receive a password reset link"
}
```

#### 9. Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

Request:
{
  "token": "reset_token_from_email",
  "password": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}

Response: 200 OK
{
  "success": true,
  "message": "Password reset successful"
}
```

## Frontend Routes

### Public Routes (No Auth Required)
- `GET /` - Home Page
- `GET /courses` - Course Listing
- `GET /courses/:courseId` - Course Detail
- `GET /auth/login` - Login Page
- `GET /auth/signup` - Signup Page
- `GET /auth/verify-email` - Email Verification
- `GET /auth/forgot-password` - Forgot Password
- `GET /auth/reset-password` - Reset Password

### Protected Routes (Auth Required)
- `GET /enrollment/:courseId` - Enrollment Page (requires authentication)
- `GET /dashboard` - User Dashboard
- `GET /profile` - User Profile
- `GET /admin` - Admin Dashboard (admin only)
- `GET /admin/courses` - Course Management (admin only)
- `GET /admin/users` - User Analytics (admin only)
- `GET /admin/sessions` - Live Scheduler (admin only)
- `GET /admin/payments` - Payments (admin only)
- `GET /admin/settings` - Admin Settings (admin only)

## Key Features Implemented

### Frontend
✅ AuthContext for global auth state management
✅ ProtectedRoute component with role-based access
✅ API interceptors for automatic token refresh
✅ Enrollment flow with proper redirects
✅ Loading states and error handling
✅ localStorage for token persistence

### Backend
✅ Email verification with OTP (6 digits, 10 min expiry)
✅ JWT tokens (Access + Refresh)
✅ Password hashing with bcryptjs
✅ Redis for OTP and session storage
✅ Input validation and sanitization
✅ Error handling middleware
✅ CORS and security headers

### Database
✅ MongoDB for user data
✅ Redis for OTP storage and sessions
✅ Password field excluded from regular queries

## Environment Variables

Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

Backend (.env)
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/elearning
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRE=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Security
OTP_EXPIRY=600 (10 minutes in seconds)
```

## Security Best Practices

1. ✅ Refresh tokens stored in HTTP-only cookies
2. ✅ Access tokens in memory (not localStorage for sensitive operations)
3. ✅ CORS configured with credentials
4. ✅ Password validation and hashing
5. ✅ OTP validation with expiry
6. ✅ Protected routes with authentication checks
7. ✅ Automatic logout on token expiry
8. ✅ Email verification required before login

## Testing the Flow

### Test Scenario 1: New User
1. Navigate to `/courses`
2. Click "Enroll Now" button
3. Should redirect to `/auth/signup`
4. Fill registration form
5. Verify email with OTP
6. Should automatically redirect to `/enrollment/course-id`
7. Complete enrollment
8. Should redirect to `/dashboard`

### Test Scenario 2: Returning User
1. Navigate to `/auth/login`
2. Enter credentials
3. Should redirect to `/dashboard`
4. Navigate to `/courses`
5. Click "Enroll Now"
6. Should directly go to `/enrollment/course-id` (no redirect to login)
7. Complete enrollment

### Test Scenario 3: Token Refresh
1. Login and get access token
2. Wait for token to expire (or modify expiry time)
3. Make API request
4. Interceptor should automatically refresh token
5. Request should succeed with new token
