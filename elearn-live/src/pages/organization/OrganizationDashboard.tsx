import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  BookOpen,
  Settings,
  Plus,
  LogOut,
  AlertCircle,
  CheckCircle,
  Mail,
  Loader,
  BarChart3,
  Search,
  Bell,
  Menu,
  X,
  Building2,
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
  const [activeTab, setActiveTab] = useState<"overview" | "team" | "courses" | "settings">(
    "overview"
  );
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const handleLogout = () => {
    localStorage.removeItem("organizationToken");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("organizationName");
    navigate("/auth/organization/login");
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

  const instructorCount = organization.instructors.filter(
    (i) => i.status === "active"
  ).length;
  const pendingInvitations = organization.instructors.filter(
    (i) => i.status === "invited"
  ).length;

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: <BarChart3 size={20} /> },
    { id: "team", label: "Team", icon: <Users size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg md:translate-x-0 md:relative"
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Org Name */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-emerald-600">
              <Building2 size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{organization.name}</h2>
              <p className="text-xs text-gray-500 capitalize">{organization.plan} Plan</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 font-medium text-red-600 transition-colors rounded-lg hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg md:hidden hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-sm text-gray-600">Welcome back! Here's your organization overview.</p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:flex">
                <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 bg-gray-50"
                />
              </div>

              {/* Notification */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
                {pendingInvitations > 0 && (
                  <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
                )}
              </button>

              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
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

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <span className="text-sm font-semibold text-green-600">+2.5%</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Instructors</h3>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {instructorCount}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    of {organization.maxInstructors} available
                  </p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Mail className="text-yellow-600" size={24} />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {pendingInvitations}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Pending Invites
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {pendingInvitations}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Awaiting acceptance</p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <BookOpen className="text-purple-600" size={24} />
                    </div>
                    <span className="text-sm font-semibold text-blue-600">0</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Courses</h3>
                  <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
                  <p className="mt-1 text-xs text-gray-500">
                    of {organization.maxCourses} available
                  </p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Award className="text-green-600" size={24} />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {organization.paymentStatus === "trial" ? "Trial" : "Active"}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">Status</h3>
                  <p className="mt-2 text-3xl font-bold text-gray-900 capitalize">
                    {organization.paymentStatus}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {organization.paymentStatus === "trial"
                      ? "14 days remaining"
                      : "Subscription active"}
                  </p>
                </div>
              </div>

              {/* Organization Details */}
              <div className="p-6 bg-white rounded-lg shadow">
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
              </div>
            </motion.div>
          )}

          {/* Team Management Tab */}
          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Team Members
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your organization's instructors and team members
                  </p>
                </div>
                <button
                  onClick={() => navigate("/organization/invite-instructor")}
                  className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus size={20} />
                  Invite Instructor
                </button>
              </div>

              {organization.instructors.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-lg shadow">
                  <Users className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    No team members yet
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Start building your team by inviting instructors
                  </p>
                  <button
                    onClick={() => navigate("/organization/invite-instructor")}
                    className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus size={20} />
                    Invite First Instructor
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden bg-white rounded-lg shadow">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                          Name
                        </th>
                        <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                          Email
                        </th>
                        <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                          Role
                        </th>
                        <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                          Status
                        </th>
                        <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {organization.instructors.map((instructor, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-900">
                            {instructor.name || "N/A"}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-600">
                            {instructor.email}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-600 capitalize">
                            {instructor.role}
                          </td>
                          <td className="px-6 py-3 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                instructor.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {instructor.status === "active"
                                ? "Active"
                                : "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-sm">
                            <button className="font-medium text-emerald-600 hover:text-emerald-700">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Courses</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage courses created by your organization
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
                  <Plus size={20} />
                  Create Course
                </button>
              </div>

              <div className="p-12 text-center bg-white rounded-lg shadow">
                <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  No courses yet
                </h3>
                <p className="mb-6 text-gray-600">
                  Start creating courses for your organization
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
                  <Plus size={20} />
                  Create First Course
                </button>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl space-y-6"
            >
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="mb-6 text-lg font-bold text-gray-900">
                  Organization Settings
                </h3>

                {/* Email Settings */}
                <div className="pb-6 mb-6 border-b border-gray-200">
                  <label className="text-sm font-semibold text-gray-900">
                    Organization Email
                  </label>
                  <input
                    type="email"
                    value={organization.email}
                    disabled
                    className="w-full px-4 py-2 mt-2 text-gray-600 border border-gray-200 rounded-lg bg-gray-50"
                  />
                </div>

                {/* Plan Info */}
                <div className="pb-6 mb-6 border-b border-gray-200">
                  <label className="text-sm font-semibold text-gray-900">
                    Current Plan
                  </label>
                  <div className="p-4 mt-2 rounded-lg bg-blue-50">
                    <p className="font-medium text-gray-900 capitalize">
                      {organization.plan} Plan
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Status:{" "}
                      <span className="font-semibold capitalize">
                        {organization.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-red-600">
                    Danger Zone
                  </h4>
                  <button className="px-4 py-2 font-medium text-red-600 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50">
                    Delete Organization
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </div>
  );
};
