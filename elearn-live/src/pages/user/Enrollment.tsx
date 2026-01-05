import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const Enrollment: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in or sign up to enroll in this course.</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mb-3"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/auth/signup')}
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  const handleEnrollment = async () => {
    setIsProcessing(true);
    try {
      // Call enrollment API
      // const response = await enrollmentService.enroll(courseId);
      // On success, redirect to payment page
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/payment', {
          state: {
            courseId: courseId,
            message: 'Enrollment completed! Now proceed to payment',
          },
        });
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      console.error('Enrollment failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Enrollment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Enrollment</h1>
              <p className="text-gray-600 mb-8">
                You're just one step away from joining this amazing course!
              </p>

              {/* Student Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Enrollment Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course ID</p>
                    <p className="text-lg font-semibold text-gray-900">{courseId}</p>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">
                    I agree to the terms and conditions and privacy policy
                  </span>
                </label>
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnrollment}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </span>
                ) : (
                  'Complete Enrollment'
                )}
              </button>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Enrollment Summary</h3>

              {/* Course Info */}
              <div className="mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg h-32 mb-4"></div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Advanced React & TypeScript Mastery
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Master modern React patterns and TypeScript for production-grade applications.
                </p>
              </div>

              {/* Course Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-semibold text-gray-900">$99.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount (50%)</span>
                  <span className="font-semibold text-green-600">-$99.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">$99.00</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">What's Included</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>32 hours of video content</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>156 lessons with projects</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
