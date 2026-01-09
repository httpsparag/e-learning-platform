import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectedInstructorRoute } from "./components/ProtectedInstructorRoute";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Auth Pages
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { InstructorSignup } from "./pages/auth/InstructorSignup";
import { InstructorLogin } from "./pages/auth/InstructorLogin";
import { InstructorVerifyEmail } from "./pages/auth/InstructorVerifyEmail";
import { InstructorAuthChoice } from "./pages/auth/InstructorAuthChoice";
import { AdminAuthChoice } from "./pages/auth/AdminAuthChoice";
import { AdminLogin } from "./pages/auth/AdminLogin";

// User Pages
import { 
  Landing, 
  Courses, 
  CourseDetail, 
  Dashboard, 
  Profile, 
  LiveClass, 
  Payment, 
  Enrollment,
  CoursePlay
} from "./pages/user";

// Admin Pages
import { Payments } from "./pages/admin/Payments";
import { Settings } from "./pages/admin/Settings";
import { AdminShell } from "./components/admin/AdminShell";

// Instructor Pages
import { 
  InstructorDashboard, 
  InstructorCourses, 
  InstructorStudents, 
  InstructorSessions, 
  InstructorAnalytics, 
  InstructorEarnings 
} from "./pages/instructor";
import { InstructorShell } from "./components/instructor/InstructorShell";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />

            {/* Auth Routes */}
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />

            {/* Instructor Auth Routes */}
            <Route path="/auth/instructor/signup" element={<InstructorSignup />} />
            <Route path="/auth/instructor/login" element={<InstructorLogin />} />
            <Route path="/auth/instructor/verify-email" element={<InstructorVerifyEmail />} />
            <Route path="/instructor/auth" element={<InstructorAuthChoice />} />

            {/* Admin Auth Routes */}
            <Route path="/auth/admin/login" element={<AdminLogin />} />
            <Route path="/admin/auth" element={<AdminAuthChoice />} />

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
              path="/live/:courseId"
              element={
                <ProtectedRoute>
                  <LiveClass />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-play/:courseId"
              element={
                <ProtectedRoute>
                  <CoursePlay />
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
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <AdminShell />
                </ProtectedAdminRoute>
              }
            />

            {/* Protected Instructor Routes */}
            <Route
              path="/instructor/*"
              element={
                <ProtectedInstructorRoute>
                  <InstructorShell />
                </ProtectedInstructorRoute>
              }
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
