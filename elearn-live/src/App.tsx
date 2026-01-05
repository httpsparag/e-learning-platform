import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Auth Pages
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";

// Public Pages
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";

// Protected Pages
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { CourseDetail } from "./pages/user/CourseDetail";
import { Enrollment } from "./pages/user/Enrollment";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { CourseManagement } from "./pages/admin/CourseManagement";
import { UserAnalytics } from "./pages/admin/UserAnalytics";
import { LiveScheduler } from "./pages/admin/LiveScheduler";
import { Payments } from "./pages/admin/Payments";
import { SettingsPage } from "./pages/admin/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />

          {/* Auth Routes */}
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          {/* Protected User Routes */}
          <Route
            path="/enrollment/:courseId"
            element={
              <ProtectedRoute>
                <Enrollment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CourseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sessions"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <LiveScheduler />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
