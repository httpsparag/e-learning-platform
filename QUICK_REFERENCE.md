# Quick Reference - Authentication & Enrollment

## 🚀 Quick Start (5 minutes)

### Prerequisites
```bash
# Check installed versions
node --version    # Should be 18+
npm --version
mongo --version   # If local MongoDB
redis-cli ping    # If local Redis
```

### Setup Backend
```bash
cd backend
npm install
# Create .env file (copy from .env.example)
npm run dev
# Check: http://localhost:5000/health
```

### Setup Frontend
```bash
cd elearn-live
npm install
npm run dev
# Open: http://localhost:5173
```

---

## 📋 API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Create new account |
| POST | `/api/auth/verify-email` | ❌ | Verify with OTP |
| POST | `/api/auth/resend-otp` | ❌ | Resend OTP |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/refresh-token` | ❌ | Get new access token |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/auth/logout` | ✅ | Logout user |
| POST | `/api/auth/forgot-password` | ❌ | Request password reset |
| POST | `/api/auth/reset-password` | ❌ | Reset password |

---

## 🔗 Frontend Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Home page |
| `/courses` | Public | Course listing |
| `/courses/:id` | Public | Course details + Enroll button |
| `/auth/signup` | Public | Registration |
| `/auth/login` | Public | Login |
| `/auth/verify-email` | Public | Email verification |
| `/auth/forgot-password` | Public | Password recovery |
| `/auth/reset-password` | Public | Password reset |
| `/enrollment/:courseId` | Protected | Enrollment form |
| `/dashboard` | Protected | User dashboard |
| `/profile` | Protected | User profile |
| `/admin` | Protected (Admin) | Admin panel |

---

## 🔐 Authentication Flow

### New User
```
1. /courses → Click Enroll
2. /auth/signup → Register
3. Verify Email (OTP)
4. /auth/login → Login (auto-filled)
5. /enrollment/:id → Enroll
6. /dashboard → Success
```

### Existing User (Not Logged In)
```
1. /courses → Click Enroll
2. /auth/login → Login
3. /enrollment/:id → Enroll
4. /dashboard → Success
```

### Authenticated User
```
1. /courses → Click Enroll
2. /enrollment/:id → Enroll (direct)
3. /dashboard → Success
```

---

## 🧪 Testing Commands

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Current User (Replace TOKEN)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔑 Key Hooks & Components

### Frontend Hooks
```typescript
// In any component inside AuthProvider:
const { user, isAuthenticated, isLoading, login, logout } = useAuth();
```

### Protected Route
```typescript
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Using Auth in Component
```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  
  return <div>Welcome {user?.name}</div>;
}
```

---

## 📦 Important Files

| File | Purpose |
|------|---------|
| `backend/src/modules/auth/*` | Auth logic |
| `elearn-live/src/context/AuthContext.tsx` | Auth state |
| `elearn-live/src/services/api.ts` | API interceptors |
| `elearn-live/src/pages/user/Enrollment.tsx` | Enrollment page |
| `elearn-live/src/App.tsx` | Routes & AuthProvider |

---

## 🛠️ Troubleshooting

### "Cannot find module" Error
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Connection Refused" Error
```bash
# Check if services are running:
# MongoDB
mongod --version

# Redis
redis-cli ping

# Backend health
curl http://localhost:5000/health
```

### "CORS Error" on Frontend
- Check FRONTEND_URL in backend .env
- Should be: `http://localhost:5173`
- Restart backend after changing

### "OTP Not Working"
```bash
# Check Redis OTP storage:
redis-cli
> KEYS verify_email:*
> GET verify_email:USER_ID
```

### "Token Expired" Error
- Automatic refresh happens via interceptors
- If not working, clear localStorage and login again
- Check JWT_EXPIRE and JWT_REFRESH_EXPIRE in .env

---

## 🔒 Security Checklist

- ✅ Access token: 15 min expiry
- ✅ Refresh token: 7 days expiry (HTTP-only cookie)
- ✅ Password: Hashed with bcrypt
- ✅ OTP: 6 digits, 10 min expiry
- ✅ Email: Unique constraint on users
- ✅ Routes: Protected with JWT middleware
- ✅ Roles: Admin/User/Instructor access control
- ✅ CORS: Configured with credentials

---

## 📊 State Management

### AuthContext provides:
```typescript
interface AuthContextType {
  user: User | null;                    // Current user
  isAuthenticated: boolean;              // Auth status
  isLoading: boolean;                    // Loading state
  register(...): Promise<any>;           // Registration
  login(email, password): Promise<any>;  // Login
  logout(): Promise<any>;                // Logout
  verifyEmail(...): Promise<any>;        // Email verification
  getMe(): Promise<any>;                 // Fetch current user
  // ... more methods
}
```

---

## 💾 Data Persistence

### localStorage
```javascript
localStorage.setItem('accessToken', token);
localStorage.setItem('user', JSON.stringify(userData));
localStorage.setItem('enrollmentRedirect', url);
```

### Cookies
```javascript
// Set by server (HTTP-only)
refreshToken=...; HttpOnly; Secure; Max-Age=604800
```

### Redis
```
verify_email:{userId} → OTP (10 min)
session:{userId} → refresh token (7 days)
reset_password:{token} → userId (15 min)
```

---

## 🚀 Deployment Tips

### Backend (Heroku/Railway/DigitalOcean)
```bash
# Set environment variables
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/elearning
REDIS_URL=redis://user:pass@hostname:port
JWT_SECRET=strong_secret_key

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Set environment variable
VITE_API_URL=https://api.your-domain.com

# Deploy
npm run build
# Upload dist/ folder
```

---

## 📞 Support Commands

```bash
# Check Node version
node -v

# Check npm packages
npm list

# Check if ports are in use (Windows)
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# MongoDB status
mongo --eval "db.adminCommand('ping')"

# Redis status
redis-cli ping

# Kill process on port (Mac/Linux)
lsof -i :5000 | grep -v PID | awk '{print $2}' | xargs kill -9

# Kill process on port (Windows)
taskkill /PID PORT_NUMBER /F
```

---

## 🎯 Development Workflow

1. **Start Backend**
   ```bash
   cd backend && npm run dev
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd elearn-live && npm run dev
   ```

3. **Test API** (Thunder Client/Postman)
   - Use endpoints from reference above

4. **Test Frontend** 
   - Open http://localhost:5173
   - Test enrollment flow

5. **Check Logs**
   - Backend: Terminal window
   - Frontend: Browser console (F12)
   - API: Network tab in DevTools

---

## 💡 Tips & Tricks

### Quick Test Data
```javascript
// User for testing:
Email: test@example.com
Password: TestPass123!
Name: Test User
```

### View OTP in Redis
```bash
redis-cli
> MONITOR  # See all Redis operations in real-time
```

### Check Database
```bash
mongosh elearning
> db.users.find()
> db.users.findOne({ email: "john@example.com" })
```

### Reset Everything
```bash
# Clear all local data
# MongoDB
mongosh elearning
> db.users.deleteMany({})

# Redis
redis-cli
> FLUSHDB

# Browser
localStorage.clear()
```

---

## 📚 Reference Files

- **Setup:** SETUP_GUIDE.md
- **Flow Diagrams:** AUTHENTICATION_FLOW.md
- **Summary:** IMPLEMENTATION_SUMMARY.md
- **This Quick Ref:** QUICK_REFERENCE.md

---

**Last Updated:** January 5, 2026
**Status:** ✅ Complete & Ready for Testing
