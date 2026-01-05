import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { Mail, ArrowRight, ArrowLeft, CheckCircle, Loader } from "lucide-react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
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
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Check Your Email</h2>
            <p className="mb-6 text-gray-600">
              We've sent a password reset link to{" "}
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
            <p className="mb-6 text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
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
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600">No worries, we'll send you reset instructions</p>
        </div>

        {/* Reset Card */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full py-3 pl-10 pr-4 transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
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
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <Link
            to="/auth/login"
            className="flex items-center justify-center gap-2 mt-6 font-semibold text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
