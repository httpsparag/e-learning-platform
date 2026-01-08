import { useNavigate } from "react-router-dom";
import { BookOpen, LogIn, UserPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const InstructorAuthChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="text-emerald-600" size={40} />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Instructor Portal</h1>
          <p className="text-lg text-gray-600">
            Start teaching and reach thousands of students worldwide
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/auth/instructor/login")}
            className="p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:border-emerald-600 cursor-pointer transition-all group"
          >
            <div className="mb-6 flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
              <LogIn className="text-emerald-600" size={32} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-600 mb-6">
              Already have an instructor account? Sign in to access your dashboard and manage your courses.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
              Continue <ArrowRight size={20} />
            </div>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/auth/instructor/signup")}
            className="p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:border-teal-600 cursor-pointer transition-all group"
          >
            <div className="mb-6 flex items-center justify-center w-16 h-16 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition-colors">
              <UserPlus className="text-teal-600" size={32} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Sign Up</h2>
            <p className="text-gray-600 mb-6">
              New instructor? Create an account to start teaching, build your profile, and earn money.
            </p>
            <div className="flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-3 transition-all">
              Get Started <ArrowRight size={20} />
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-white border-2 border-gray-200 rounded-2xl"
        >
          <h3 className="mb-6 text-xl font-bold text-gray-900 text-center">Why Teach With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 font-bold">📊</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">Analytics</h4>
              <p className="text-sm text-gray-600">Track student progress and course performance in real-time</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-emerald-100 rounded-lg">
                <span className="text-emerald-600 font-bold">💰</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">Earn Money</h4>
              <p className="text-sm text-gray-600">Get paid based on student enrollments and course sales</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-lg">
                <span className="text-purple-600 font-bold">🎓</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">Global Reach</h4>
              <p className="text-sm text-gray-600">Teach students from around the world and impact lives</p>
            </div>
          </div>
        </motion.div>

        {/* Student Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-2">Looking to take courses instead?</p>
          <a
            href="/auth/login"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Student Login <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
