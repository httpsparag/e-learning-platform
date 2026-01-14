# Organization Authentication & Setup Flow - Complete Implementation

## Overview
Complete standalone organization management system with separate authentication from instructors. Organizations can sign up, login, and manage their team independently.

---

## 🔄 Complete User Flow

### 1. **Landing Page**
- User clicks **"Start Free Trial"** button
- Redirects to `/auth/organization/signup`

### 2. **Organization Signup** (`/auth/organization/signup`)
**Components Collected:**
- Owner Name
- Owner Email
- Password (hashed with bcrypt)
- Organization Name
- Organization Email
- Phone Number
- Website (optional)

**Backend Process:**
1. Validate all required fields
2. Hash password using bcrypt (10 rounds)
3. Create new Organization document with:
   - All organization details
   - Owner authentication info (ownerName, ownerEmail, ownerPassword)
   - Plan: "free" (trial)
   - PaymentStatus: "trial"
   - Trial expires in 14 days
   - Owner added as "owner" role in instructors array
4. Generate JWT token (30-day expiry)
5. Return token, organizationId, ownerId

**Frontend Storage:**
```javascript
localStorage.setItem('organizationToken', token);
localStorage.setItem('organizationId', organizationId);
localStorage.setItem('ownerId', ownerId);
localStorage.setItem('organizationName', organizationName);
```

**Redirect:** → `/organization/dashboard`

---

### 3. **Organization Login** (`/auth/organization/login`)
**Form:**
- Email (owner email)
- Password

**Backend Process:**
1. Find organization by ownerEmail
2. Compare password with stored hash using bcrypt
3. If valid, generate JWT token
4. Return token, organizationId, ownerId, organizationName

**Frontend Storage:** Same as signup

**Redirect:** → `/organization/dashboard`

---

### 4. **Organization Dashboard** (`/organization/dashboard`)
**Protected by:** ProtectedOrganizationRoute (checks organizationToken)

**Features:**
- Display organization statistics:
  - Active Instructors
  - Pending Invitations
  - Total Courses
  - Trial Status / Plan Info
- 3 Tabs:
  - **Overview**: Stats and quick info
  - **Team**: List of team members with roles
  - **Settings**: Organization settings
- Action Buttons:
  - Invite Instructors
  - Manage Team
  - Edit Settings
- Logout Button

**Data Fetched:**
```
GET /api/organization/{organizationId}
Authorization: Bearer {organizationToken}
```

---

### 5. **Organization Setup** (`/organization/setup`)
Optional page for updating organization details after signup.

---

### 6. **Invite Instructors** (`/organization/invite`)
**Process:**
1. Form to add instructor emails
2. Select role (admin/instructor)
3. Preview list of invitations
4. Send batch invitations

**Backend Endpoint:**
```
POST /api/organization/{organizationId}/invite
Authorization: Bearer {organizationToken}
Body: { email, role }
```

---

## 🗄️ Database Schema

### Organization Model (Updated)
```typescript
{
  // Organization Info
  name: String (required),
  email: String (required),
  phone: String,
  website: String,
  description: String,
  logo: String,
  
  // Owner Authentication
  ownerName: String,
  ownerEmail: String (indexed),
  ownerPassword: String (hashed, select: false),
  
  // Plan & Payment
  plan: 'free' | 'starter' | 'professional' | 'enterprise',
  paymentStatus: 'pending' | 'completed' | 'failed' | 'trial',
  paymentId: String,
  trialEndsAt: Date,
  
  // Limits per plan
  maxInstructors: Number,
  maxStudents: Number,
  maxCourses: Number,
  
  // Team
  instructors: [{
    instructorId: ObjectId,
    role: 'owner' | 'admin' | 'instructor',
    status: 'active' | 'invited' | 'pending',
    invitedAt: Date,
    joinedAt: Date
  }],
  
  // Metadata
  ownerId: ObjectId (reference to Instructor),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Routes & Endpoints

### Frontend Routes
| Route | Component | Protection | Purpose |
|-------|-----------|-----------|---------|
| `/auth/organization/signup` | OrganizationSignup | Public | Create organization |
| `/auth/organization/login` | OrganizationLogin | Public | Login organization |
| `/organization/setup` | OrganizationSetup | ProtectedOrganizationRoute | Update org details |
| `/organization/dashboard` | OrganizationDashboard | ProtectedOrganizationRoute | Main dashboard |
| `/organization/invite` | InviteInstructor | ProtectedOrganizationRoute | Invite instructors |

### Backend Endpoints
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/organization/signup` | None | Create organization |
| POST | `/api/organization/login` | None | Login organization |
| POST | `/api/organization/create` | JWT | Create org (legacy) |
| GET | `/api/organization/:id` | JWT | Get org details |
| GET | `/api/organization/my-org` | JWT | Get owner's org |
| PUT | `/api/organization/:id` | JWT | Update org |
| POST | `/api/organization/:id/invite` | JWT | Invite instructor |
| POST | `/api/organization/:id/accept-invitation` | JWT | Accept invite |
| POST | `/api/organization/:id/reject-invitation` | JWT | Reject invite |
| GET | `/api/organization/:id/team` | JWT | Get team members |
| DELETE | `/api/organization/:id/team/:instructorId` | JWT | Remove team member |

---

## 🛡️ Authentication

### JWT Token Structure
```javascript
{
  organizationId: ObjectId,
  ownerId: ObjectId,
  email: String,
  expiresIn: '30d'
}
```

### Password Security
- Hashed with bcrypt (10 salt rounds)
- Never stored in localStorage
- Compared server-side only

### Token Storage
- Stored in localStorage (organizationToken)
- Sent in Authorization header: `Bearer {token}`
- Expires in 30 days

---

## 📊 Plan Details

| Plan | Max Instructors | Max Students | Max Courses | Price | Type |
|------|-----------------|--------------|------------|-------|------|
| Free | 5 | 100 | 10 | $0 | Trial (14 days) |
| Starter | 10 | 500 | 20 | ₹499/mo | Paid |
| Professional | 50 | 5000 | 100 | ₹1,499/mo | Paid |
| Enterprise | 999 | 999,999 | 999 | Custom | Custom |

---

## 🔄 State Management

### localStorage Keys
- `organizationToken`: JWT for API auth
- `organizationId`: Organization MongoDB ID
- `ownerId`: Owner's Instructor ID
- `organizationName`: Organization name (for UI)

### Component State
- Organization details (fetched from API)
- Tab state (overview/team/settings)
- Loading/error states
- Success messages

---

## 🚀 Features Implemented

✅ Organization Signup with full details collection
✅ Organization Login with secure password verification
✅ Protected routes with ProtectedOrganizationRoute
✅ Dashboard with dynamic organization data
✅ Team management interface
✅ Instructor invitation system
✅ Plan information display
✅ Trial period tracking
✅ Logout functionality
✅ Error handling and validation
✅ Loading states
✅ Success messages

---

## 📝 Next Steps (When Ready)

1. **Payment Integration**
   - Add PlanSelection page back (removed for now)
   - Integrate Stripe/PayPal
   - Update paymentStatus from 'trial' to 'completed'

2. **Email Integration**
   - Send confirmation email on signup
   - Send invitation emails to instructors
   - Send trial expiration warnings

3. **Instructor Acceptance**
   - Handle invitation acceptance flow
   - Update team member status
   - Send acceptance confirmation

4. **Organization Shell**
   - Create InstructorShell-like wrapper for organization
   - Add side navigation for organization pages
   - Add organization profile/settings page

5. **Analytics**
   - Track organization usage metrics
   - Display in dashboard
   - Implement usage limits

---

## ✨ Key Improvements

1. **Separation of Concerns**: Organization signup/login separate from instructor signup/login
2. **Direct Ownership**: Organization has its own authentication, not dependent on instructor account
3. **Trial Period**: Automatic 14-day trial for all new organizations
4. **Plan-based Limits**: Different limits per plan automatically applied
5. **Team Management**: Easy team member management with roles
6. **Scalability**: Ready for payment integration and more features

---

## 🔗 Related Files

### Frontend
- `/elearn-live/src/pages/auth/OrganizationSignup.tsx` - Signup form
- `/elearn-live/src/pages/auth/OrganizationLogin.tsx` - Login form
- `/elearn-live/src/pages/organization/OrganizationDashboard.tsx` - Main dashboard
- `/elearn-live/src/pages/organization/OrganizationSetup.tsx` - Setup form
- `/elearn-live/src/pages/organization/InviteInstructor.tsx` - Invite form
- `/elearn-live/src/components/ProtectedOrganizationRoute.tsx` - Route protection
- `/elearn-live/src/App.tsx` - Routes configuration

### Backend
- `/backend/src/models/organization.model.ts` - Organization schema
- `/backend/src/modules/organization/organization.routes.ts` - API routes
- `/backend/src/modules/organization/organization.service.ts` - Business logic

---

Generated: January 14, 2026
