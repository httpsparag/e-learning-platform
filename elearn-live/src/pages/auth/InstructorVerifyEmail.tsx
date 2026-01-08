import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowRight, Loader, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export const InstructorVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [instructorId, setInstructorId] = useState("");

  useEffect(() => {
    const emailFromState = location.state?.email;
    const idFromState = location.state?.instructorId;
    const idFromStorage = localStorage.getItem('pendingInstructorId');

    if (emailFromState) setEmail(emailFromState);
    if (idFromState) setInstructorId(idFromState);
    if (idFromStorage && !idFromState) setInstructorId(idFromStorage);
  }, [location.state]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!instructorId) {
      setError("Instructor ID not found. Please sign up again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/instructor/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: instructorId,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      setSuccessMessage("Email verified successfully! Redirecting to login...");
      localStorage.removeItem('pendingInstructorId');

      setTimeout(() => {
        navigate("/auth/instructor/login", { 
          state: { message: 'Email verified. Please login with your credentials.' } 
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");

    if (!instructorId) {
      setError("Instructor ID not found. Please sign up again.");
      setResendLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/instructor/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instructorId: instructorId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setSuccessMessage("OTP sent to your email!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
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
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full">
            <Mail className="text-emerald-600" size={32} />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Verify Email</h1>
          <p className="text-gray-600">
            We've sent a verification code to<br />
            <span className="font-semibold text-gray-900">{email || 'your email'}</span>
          </p>
        </div>

        <div className="p-8 bg-white border-2 border-gray-200 shadow-lg rounded-xl">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 border-2 border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3 mb-4 text-sm text-green-700 border-2 border-green-200 rounded-lg bg-green-50">
              ✓ {successMessage}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full py-3 px-4 text-center text-2xl font-bold transition-colors border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 tracking-widest"
              />
              <p className="mt-2 text-xs text-gray-500">Enter the 6-digit code sent to your email</p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 font-semibold text-white transition-all bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold disabled:opacity-70"
            >
              {resendLoading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  Resend Code
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
