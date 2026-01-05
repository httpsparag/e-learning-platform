import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import { Mail, ArrowRight, Loader, CheckCircle } from "lucide-react";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location.state || {};
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Redirect if no userId
    if (!userId) {
      const pendingUserId = localStorage.getItem('pendingUserId');
      if (!pendingUserId) {
        navigate('/auth/signup');
      }
    }
  }, [userId, navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsVerifying(true);

    const otpCode = otp.join("");
    const userIdToVerify = userId || localStorage.getItem('pendingUserId');
    const enrollmentRedirect = localStorage.getItem('enrollmentRedirect');

    try {
      await authService.verifyEmail({
        userId: userIdToVerify!,
        otp: otpCode,
      });
      
      setSuccess("Email verified successfully!");
      localStorage.removeItem('pendingUserId');
      
      setTimeout(() => {
        // If user was trying to enroll, redirect to login first
        if (enrollmentRedirect && enrollmentRedirect !== '/dashboard') {
          localStorage.removeItem('enrollmentRedirect');
          navigate("/auth/login", {
            state: { redirectAfterAuth: enrollmentRedirect }
          });
        } else {
          navigate("/auth/login");
        }
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById('otp-0')?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setIsResending(true);
    
    const userIdToResend = userId || localStorage.getItem('pendingUserId');

    try {
      await authService.resendOtp(userIdToResend!);
      setSuccess("Verification code resent successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <Mail className="text-blue-600" size={32} />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-900">{email || "your email"}</span>
          </p>
        </div>

        {/* Verification Card */}
        <div className="p-8 bg-white border-2 border-gray-200 shadow-lg rounded-xl">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 border-2 border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm text-green-700 border-2 border-green-200 rounded-lg bg-green-50">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* OTP Input */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-center text-gray-700">
                Enter Verification Code
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 text-xl font-bold text-center transition-colors border-2 border-gray-200 rounded-lg h-14 focus:outline-none focus:border-blue-600"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={otp.some(digit => !digit) || isVerifying}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader className="animate-spin" size={20} />
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

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-600">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <Loader className="animate-spin" size={16} />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="p-4 mt-6 border-2 border-blue-200 rounded-lg bg-blue-50">
            <p className="text-sm text-center text-gray-700">
              💡 Check your spam folder if you don't see the email
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
