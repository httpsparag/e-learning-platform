# Setup Guide - Complete Authentication & Enrollment System

## Prerequisites

### Required Tools
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Git

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Thunder Client or Postman for API testing

---

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create `.env` file in backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/elearning
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning

# Redis (for OTP and sessions)
REDIS_URL=redis://localhost:6379
# OR for Redis Cloud:
# REDIS_URL=redis://:password@hostname:port

# JWT Tokens
JWT_SECRET=your_super_secret_jwt_key_here_change_this
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_token_secret_here_change_this
JWT_REFRESH_EXPIRE=7d

# Email Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# Security
OTP_EXPIRY=600 (10 minutes in seconds)
```

### 3. Database Setup

#### MongoDB Local Setup:
```bash
# Windows/Mac/Linux
# Install MongoDB and start service
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

#### Redis Local Setup:
```bash
# Windows
redis-server

# Mac (with Homebrew)
brew services start redis

# Docker
docker run -d -p 6379:6379 --name redis redis
```

### 4. Create Database Collections

Connect to MongoDB and run:

```javascript
// Collections will be auto-created by Mongoose,
// but you can pre-create indexes for better performance

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 2592000 });
```

### 5. Start Backend Server

```bash
npm run dev
# Server will start on http://localhost:5000
# Health check: http://localhost:5000/health
```

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd elearn-live
npm install
```

### 2. Configure Environment Variables

Create `.env` file in elearn-live directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
# App will be available on http://localhost:5173
```

---

## API Testing

### Using Thunder Client / Postman

Import the following endpoints:

#### 1. Register New User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

#### 2. Verify Email
```
POST http://localhost:5000/api/auth/verify-email
Content-Type: application/json

{
  "userId": "user_id_from_register_response",
  "otp": "123456"
}

// Get OTP from:
// - Email (in real setup)
// - Redis: redis-cli -> GET verify_email:{userId}
```

#### 3. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### 4. Get Current User (Protected)
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer {accessToken_from_login}
```

#### 5. Logout (Protected)
```
POST http://localhost:5000/api/auth/logout
Authorization: Bearer {accessToken_from_login}
```

#### 6. Refresh Token
```
POST http://localhost:5000/api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "refresh_token_from_login"
}
```

---

## Testing the Three Enrollment Scenarios

### Scenario 1: New User Registration & Enrollment

1. **Open Browser:**
   ```
   http://localhost:5173/courses
   ```

2. **Click "Enroll Now"**
   - Should redirect to `/auth/signup`

3. **Fill Registration Form:**
   ```
   Name: John Doe
   Email: john@test.com
   Password: SecurePass123!
   Confirm Password: SecurePass123!
   ```

4. **Get OTP:**
   ```bash
   # In Redis CLI:
   redis-cli
   > GET verify_email:user_id_from_response
   # Copy the OTP value
   ```

5. **Verify Email:**
   - Enter the 6-digit OTP
   - Click "Verify"

6. **Login:**
   - Email: john@test.com
   - Password: SecurePass123!

7. **Automatic Redirect:**
   - Should redirect to `/enrollment/course-id`

8. **Complete Enrollment:**
   - Review details (pre-filled with user info)
   - Check terms & conditions
   - Click "Complete Enrollment"
   - Should redirect to `/dashboard`

### Scenario 2: Existing User Login & Enrollment

1. **Open Browser:**
   ```
   http://localhost:5173/courses
   ```

2. **Click "Enroll Now"**
   - Should redirect to `/auth/login` (not signup)

3. **Login:**
   - Email: john@test.com
   - Password: SecurePass123!

4. **Automatic Redirect:**
   - Should redirect to `/enrollment/course-id`

5. **Complete Enrollment:**
   - Should redirect to `/dashboard`

### Scenario 3: Authenticated User Enrollment (Direct)

1. **Login First:**
   ```
   http://localhost:5173/auth/login
   ```

2. **Navigate to Courses:**
   - Go to `/courses`

3. **Click "Enroll Now"**
   - AuthContext already has user data
   - Should directly go to `/enrollment/course-id`
   - No redirect to login

---

## Common Issues & Solutions

### 1. "MongoDB Connection Error"
```bash
# Check if MongoDB is running:
# Windows: mongod should be running
# Mac: brew services list
# Docker: docker ps | grep mongo

# If not running, start it:
# Mac: brew services start mongodb-community
# Docker: docker start mongodb
```

### 2. "Redis Connection Error"
```bash
# Check if Redis is running:
# Windows: redis-cli ping
# Mac: redis-cli ping
# Docker: docker exec redis redis-cli ping

# If not running:
# Mac: brew services start redis
# Docker: docker start redis
```

### 3. "CORS Error" on Frontend
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Default: `http://localhost:5173`
- Check CORS configuration in `src/app.ts`

### 4. "OTP Not Working"
- Check Redis connection: `redis-cli -> KEYS verify_email:*`
- Make sure `OTP_EXPIRY` is set correctly (default 600 seconds)
- Check email configuration in `.env` (if using real email)

### 5. "Token Expired Error"
- Tokens are automatically refreshed via interceptors
- If issue persists, clear localStorage and login again
- Check `JWT_EXPIRE` setting in backend `.env`

### 6. "Email Not Sending"
- For Gmail: Use App Specific Password (not regular password)
- Enable 2FA on Gmail account
- Allow "Less secure app access" if not using App Password
- Check `SMTP_USER` and `SMTP_PASS` are correct

---

## Project Structure Overview

```
e-learning-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Redis, Email configs
│   │   ├── models/          # Mongoose schemas
│   │   ├── modules/auth/    # Auth logic (controller, service, routes)
│   │   ├── middlewares/     # Auth, error, validation middlewares
│   │   ├── utils/           # JWT, email, password, response helpers
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies
│
├── elearn-live/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── layout/
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # Global auth state
│   │   ├── services/
│   │   │   ├── api.ts               # Axios instance with interceptors
│   │   │   └── auth.service.ts      # Auth API calls
│   │   ├── pages/
│   │   │   ├── auth/                # Login, Signup, Verify Email, etc.
│   │   │   ├── user/
│   │   │   │   ├── CourseDetail.tsx # With enrollment button
│   │   │   │   └── Enrollment.tsx   # Enrollment page
│   │   │   └── user/Dashboard.tsx
│   │   ├── App.tsx                  # Routes with AuthProvider
│   │   └── main.tsx
│   ├── .env                         # Environment variables
│   └── package.json
│
└── AUTHENTICATION_FLOW.md           # Complete documentation
```

---

## Next Steps

1. **Test All Scenarios** in the "Testing" section above
2. **Review Authentication Flow** in `AUTHENTICATION_FLOW.md`
3. **Customize Styling** - Tailwind CSS already configured
4. **Add More Features:**
   - Course enrollment API endpoint
   - Course management endpoints
   - Payment integration
   - Live class functionality
5. **Setup CI/CD** - Configure GitHub Actions for deployment
6. **Deploy to Production:**
   - Backend: Heroku, Railway, or DigitalOcean
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Database: MongoDB Atlas
   - Redis: Redis Cloud or Upstash

---

## Database Schema Reference

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String ('user', 'instructor', 'admin'),
  avatar: String (URL),
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Redis Keys
```
verify_email:{userId} -> OTP value (expires in 10 min)
session:{userId} -> refresh token (expires in 7 days)
reset_password:{token} -> userId (expires in 15 min)
```

---

## Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ Refresh tokens in HTTP-only cookies
- ✅ CORS configured with credentials
- ✅ Input validation on all endpoints
- ✅ Email verification required
- ✅ OTP with expiry
- ✅ Protected routes with role-based access
- ✅ Automatic logout on token expiry
- ✅ HTTPS ready (configure in production)

---

## Support & Documentation

- **Backend Framework:** Express.js, TypeScript
- **Frontend Framework:** React, TypeScript, Vite
- **Database:** MongoDB
- **Cache:** Redis
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Router:** React Router v6

For more details, see `AUTHENTICATION_FLOW.md` in the root directory.
