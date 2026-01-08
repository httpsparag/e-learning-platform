import { useNavigate } from "react-router-dom";
import { Shield, LogIn, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const AdminAuthChoice = () => {
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
            <Shield className="text-blue-600" size={40} />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-lg text-gray-600">
            Manage your platform and control all features
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate("/auth/admin/login")}
          className="p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-600 cursor-pointer transition-all group mb-8"
        >
          <div className="mb-6 flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
            <LogIn className="text-blue-600" size={32} />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="text-gray-600 mb-6">
            Access your admin dashboard to manage the platform and monitor all activities.
          </p>
          <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
            Continue <ArrowRight size={20} />
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-white border-2 border-gray-200 rounded-2xl"
        >
          <h3 className="mb-6 text-xl font-bold text-gray-900 text-center">Admin Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 font-bold">👥</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">User Management</h4>
              <p className="text-sm text-gray-600">Manage users, instructors, and access control</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 font-bold">📊</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">Analytics</h4>
              <p className="text-sm text-gray-600">View detailed platform analytics and reports</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 font-bold">⚙️</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900">Settings</h4>
              <p className="text-sm text-gray-600">Configure platform settings and preferences</p>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-2">Not an admin?</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Back to Home <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
