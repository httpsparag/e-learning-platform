// src/pages/auth/Signup.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, Loader } from "lucide-react";
import { motion } from "framer-motion";

export const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(location.state?.message || "");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.register(formData);
      // Save userId and enrollment data for verification
      localStorage.setItem('pendingUserId', response.data.userId);
      localStorage.setItem('enrollmentRedirect', location.state?.redirectAfterAuth || '/dashboard');
      navigate("/auth/verify-email", { 
        state: { 
          email: formData.email,
          userId: response.data.userId,
          redirectAfterAuth: location.state?.redirectAfterAuth
        } 
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
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
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Start your learning journey today</p>
        </div>

        <div className="p-8 bg-white border-2 border-gray-200 shadow-lg rounded-xl">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 border-2 border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="w-full py-3 pl-10 pr-4 transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

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

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Create a password"
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

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Confirm your password"
                  className="w-full py-3 pl-10 pr-4 transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <p className="mb-2 text-sm font-semibold text-gray-900">Password must contain:</p>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  One number
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
