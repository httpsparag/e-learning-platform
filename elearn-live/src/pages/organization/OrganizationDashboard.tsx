import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  BookOpen,
  Mail,
  Loader,
  Search,
  Bell,
  Settings,
  AlertCircle,
  CheckCircle,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

interface Organization {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  logo?: string;
  plan: string;
  paymentStatus: string;
  maxInstructors: number;
  maxStudents: number;
  maxCourses: number;
  instructors: any[];
}

export const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ""
  );

  useEffect(() => {
    fetchOrganization();
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const fetchOrganization = async () => {
    try {
      const organizationId = localStorage.getItem("organizationId");
      const token = localStorage.getItem("organizationToken");

      if (!organizationId || !token) {
        navigate("/auth/organization/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/organization/${organizationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch organization");
      }

      setOrganization(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="animate-spin text-emerald-600" size={32} />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
          <AlertCircle className="mb-4 text-red-600" size={32} />
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Organization Not Found
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <button
            onClick={() => navigate("/auth/instructor/signup")}
            className="w-full py-2 font-bold text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
          >
            Create Organization
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Header */}
      <header className="flex items-center justify-between h-20 px-8 mb-8 bg-white shadow-sm rounded-xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back! Here's your organization overview.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-gray-50"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            <Bell size={20} className="text-gray-600" />
            {organization?.instructors.filter((i) => i.status === "invited").length > 0 && (
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50"
          >
            <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={20} />
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 mb-6 border border-green-200 rounded-lg bg-green-50"
          >
            <CheckCircle className="text-green-600 mt-0.5 shrink-0" size={20} />
            <p className="text-green-800">{successMessage}</p>
          </motion.div>
        )}

        {/* Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 transition-all bg-white border border-gray-100 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="text-blue-600" size={24} />
                </div>
                <span className="text-sm font-semibold text-green-600">+2.5%</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-gray-600">Instructors</h3>
              <p className="text-3xl font-bold text-gray-900">
                {organization.instructors.filter((i) => i.status === "active").length}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                of {organization.maxInstructors} available
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 transition-all bg-white border border-gray-100 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Mail className="text-yellow-600" size={24} />
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {organization.instructors.filter((i) => i.status === "invited").length}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-gray-600">
                Pending Invites
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {organization.instructors.filter((i) => i.status === "invited").length}
              </p>
              <p className="mt-1 text-xs text-gray-500">Awaiting acceptance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 transition-all bg-white border border-gray-100 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BookOpen className="text-purple-600" size={24} />
                </div>
                <span className="text-sm font-semibold text-blue-600">0</span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-gray-600">Courses</h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="mt-1 text-xs text-gray-500">
                of {organization.maxCourses} available
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 transition-all bg-white border border-gray-100 rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Award className="text-green-600" size={24} />
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {organization.paymentStatus === "trial" ? "Trial" : "Active"}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-medium text-gray-600">Status</h3>
              <p className="text-3xl font-bold text-gray-900 capitalize">
                {organization.paymentStatus}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {organization.paymentStatus === "trial"
                  ? "14 days remaining"
                  : "Subscription active"}
              </p>
            </motion.div>
          </div>

          {/* Organization Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm"
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Organization Details
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{organization.email}</p>
              </div>
              {organization.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <p className="mt-1 text-gray-900">{organization.phone}</p>
                </div>
              )}
              {organization.website && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Website
                  </label>
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-emerald-600 hover:text-emerald-700"
                  >
                    {organization.website}
                  </a>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Plan
                </label>
                <p className="mt-1 text-gray-900 capitalize">
                  {organization.plan}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};
