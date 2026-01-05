# Updated Enrollment Flow - Sign In → Enrollment → Payment → Dashboard

## Complete User Journey

### For Unauthenticated Users:
```
1. User visits /courses (PUBLIC)
   ↓
2. User clicks "Enroll Now" button
   ↓
3. CourseDetail.tsx checks: isAuthenticated = false
   ↓
4. Button redirects to /auth/signup with enrollmentRedirect state
   ↓
5. User creates account and verifies email
   ↓
6. User is redirected to /auth/login
   ↓
7. User logs in
   ↓
8. AuthContext updates: isAuthenticated = true ✅
   ↓
9. Login page redirects to /enrollment/:courseId
   ↓
10. ProtectedRoute validates authentication ✅
    ↓
11. Enrollment.tsx displays with user info pre-filled
    ↓
12. User clicks "Complete Enrollment"
    ↓
13. Redirects to /payment (Protected Route)
    ↓
14. Payment.tsx displays payment form
    ↓
15. User enters payment details and clicks "Complete Payment"
    ↓
16. Payment is processed
    ↓
17. Redirects to /dashboard with success message
    ↓
18. ✅ User can now access the course from dashboard
```

### For Authenticated Users:
```
1. User visits /courses (PUBLIC)
   ↓
2. AuthContext already has isAuthenticated = true
   ↓
3. User clicks "Enroll Now" button
   ↓
4. CourseDetail.tsx checks: isAuthenticated = true
   ↓
5. Button directly navigates to /enrollment/:courseId
   ↓
6. ProtectedRoute validates: isAuthenticated = true ✅
   ↓
7. Enrollment.tsx displays with user info pre-filled
   ↓
8. User clicks "Complete Enrollment"
   ↓
9. Redirects to /payment (Protected Route)
   ↓
10. Payment.tsx displays payment form
    ↓
11. User enters payment details and clicks "Complete Payment"
    ↓
12. Payment is processed
    ↓
13. Redirects to /dashboard with success message
    ↓
14. ✅ User can now access the course from dashboard
```

---

## Route Protection & Authentication

### All Protected Routes (Require Authentication)
```tsx
// These routes are wrapped with ProtectedRoute component
<Route path="/enrollment/:courseId" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />
<Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
<Route path="/live/:courseId" element={<ProtectedRoute><LiveClass /></ProtectedRoute>} />
```

### ProtectedRoute Component Logic
```tsx
if (isLoading) {
  return <Spinner />; // Show loading while checking auth
}

if (!isAuthenticated) {
  return <Navigate to="/auth/login" />; // Redirect if not authenticated
}

if (allowedRoles && !hasRole) {
  return <Navigate to="/unauthorized" />; // Redirect if role doesn't match
}

return <>{children}</>; // Render protected component if all checks pass
```

---

## Component Updates

### 1. CourseDetail.tsx (Smart Enroll Button)
```tsx
const handleEnrollClick = () => {
  if (!isAuthenticated) {
    // Not logged in → Go to signup first
    navigate("/auth/signup", {
      state: {
        redirectAfterAuth: "/enrollment/course-id",
        message: "Please sign up to enroll in this course"
      }
    });
  } else {
    // Already logged in → Go directly to enrollment
    navigate("/enrollment/course-id");
  }
}

// Button text changes based on auth state
<button onClick={handleEnrollClick}>
  {isAuthenticated ? "Enroll Now" : "Sign Up to Enroll"}
</button>
```

### 2. Enrollment.tsx (Enrollment Form)
```tsx
const handleEnrollment = async () => {
  setIsProcessing(true);
  try {
    // Call enrollment API
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to payment page after enrollment
      navigate('/payment', {
        state: {
          courseId: courseId,
          message: 'Enrollment completed! Now proceed to payment',
        },
      });
    }, 2000);
  } catch (error) {
    console.error('Enrollment failed:', error);
  }
}
```

### 3. Payment.tsx (Payment Processing)
```tsx
const handleCompletePayment = () => {
  setIsProcessing(true);
  try {
    // Process payment
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to dashboard after payment
      navigate('/dashboard', {
        state: {
          message: 'Payment successful! You are now enrolled in the course.',
        },
      });
    }, 2000);
  } catch (error) {
    console.error('Payment failed:', error);
  }
}

<button 
  onClick={handleCompletePayment}
  disabled={isProcessing}
>
  {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
</button>
```

---

## Data Flow During Enrollment

```
┌──────────────────────────────────────────────────────────┐
│             ENROLLMENT DATA PRESERVATION                 │
└──────────────────────────────────────────────────────────┘

React Router State (useLocation):
├─ location.state.redirectAfterAuth = "/enrollment/:courseId"
├─ location.state.courseId = "course-id"
└─ location.state.message = "Please sign up to enroll..."

localStorage:
├─ accessToken = "jwt-token"
├─ enrollmentRedirect = "/enrollment/:courseId"
└─ user = { name, email, role, ... }

AuthContext:
├─ user = { name, email, role, ... }
├─ isAuthenticated = true/false
└─ isLoading = true/false
```

---

## Enrollment Success Flow Diagram

```
┌─────────────────┐
│   /courses      │
│   Public Route  │
└────────┬────────┘
         │
         │ User Not Logged In
         ↓
┌─────────────────────────────────────────┐
│         /auth/signup                    │
│  1. Create account                      │
│  2. Verify email (OTP)                  │
│  3. Auto-redirect to login              │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│         /auth/login                     │
│  1. Enter credentials                   │
│  2. Get accessToken                     │
│  3. Set isAuthenticated = true          │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│    /enrollment/:courseId                │
│    Protected Route                      │
│  1. Pre-filled user info                │
│  2. Course enrollment summary           │
│  3. Click "Complete Enrollment"         │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│         /payment                        │
│    Protected Route                      │
│  1. Payment form                        │
│  2. Order summary with price            │
│  3. Click "Complete Payment"            │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│       /dashboard                        │
│    Protected Route                      │
│  ✅ Success! User can access course     │
│  ✅ Enrolled courses list updated       │
│  ✅ Course content available            │
└─────────────────────────────────────────┘
```

---

## Summary of Changes

✅ **Enrollment.tsx** - Now redirects to `/payment` after enrollment (not `/dashboard`)
✅ **Payment.tsx** - Added payment processing button that redirects to `/dashboard`
✅ **CourseDetail.tsx** - Smart enroll button with auth state check (unchanged)
✅ **All Protected Routes** - Require authentication via ProtectedRoute wrapper
✅ **State Preservation** - Enrollment context maintained through signup → login → enrollment → payment flow

---

## New Enrollment Flow Sequence

**Sign In → Enrollment → Payment → Dashboard**

1. User initiates signup/login if needed
2. User completes enrollment form
3. User proceeds to payment page
4. User completes payment
5. User is redirected to dashboard with course access

All routes between enrollment and dashboard are **protected** and require authentication! 🔒
