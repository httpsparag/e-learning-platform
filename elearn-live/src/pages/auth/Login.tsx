import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(formData);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Check if user was redirected from enrollment
      const enrollmentRedirect = location.state?.redirectAfterAuth;
      
      // Get user role
      const user = response.data.user;
      
      // Wait a moment for context to update
      setTimeout(() => {
        if (enrollmentRedirect) {
          navigate(enrollmentRedirect);
        } else if (user.role === 'admin') {
          navigate("/admin");
        } else if (user.role === 'instructor') {
          navigate("/instructor/dashboard");
        } else {
          navigate("/");
        }
      }, 100);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Log in to continue your learning</p>
        </div>

        {/* Login Card */}
        <div className="p-8 bg-white border-2 border-gray-200 shadow-lg rounded-xl">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 border-2 border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  className="w-full py-3 pl-10 pr-4 transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link 
                  to="/auth/forgot-password" 
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  className="w-full py-3 pl-10 pr-12 transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me for 7 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                <>
                  Log In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-gray-700 transition-colors border-2 border-gray-200 rounded-lg hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-gray-700 transition-colors border-2 border-gray-200 rounded-lg hover:bg-gray-50">
              <img src="https://github.com/favicon.ico" alt="GitHub" className="w-5 h-5" />
              GitHub
            </button>
          </div>

          {/* Signup Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
