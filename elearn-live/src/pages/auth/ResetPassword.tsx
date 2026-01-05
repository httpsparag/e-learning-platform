import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/auth.service";
import { Lock, Eye, EyeOff, CheckCircle, Loader } from "lucide-react";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authService.resetPassword(
        token,
        formData.password,
        formData.confirmPassword
      );
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="p-8 text-center bg-white border-2 border-gray-200 shadow-lg rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Password Reset Successful!</h2>
            <p className="mb-6 text-gray-600">
              Your password has been successfully reset. Redirecting to login...
            </p>
            <Loader className="mx-auto text-blue-600 animate-spin" size={24} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Set New Password</h1>
          <p className="text-gray-600">Create a strong password for your account</p>
        </div>

        {/* Reset Card */}
        <div className="p-8 bg-white border-2 border-gray-200 shadow-lg rounded-xl">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 border-2 border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* New Password Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter new password"
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

            {/* Confirm Password Field */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  className="w-full py-3 pl-10 pr-4 transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Password Requirements */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
