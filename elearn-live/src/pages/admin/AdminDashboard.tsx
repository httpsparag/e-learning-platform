import { motion } from "framer-motion";
import { 
  Users, BookOpen, Video, DollarSign, TrendingUp, 
  Search, Bell, Settings, BarChart3,
  Clock, Shield, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseService from "../../services/course.service";

interface Course {
  _id: string;
  title: string;
  instructorName: string;
  enrolledCount: number;
  status: string;
  revenue: number;
}

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all courses on mount
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await CourseService.getAllCourses();
        setCourses(coursesData || []);
      } catch (err: any) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  // Calculate dynamic system-wide stats
  const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledCount || 0), 0);
  const activeCourses = courses.filter(c => c.status === "Active").length;
  const totalInstructors = new Set(courses.map(c => c.instructorName)).size;
  const platformRevenue = courses.reduce((sum, course) => sum + (course.revenue || 0), 0);

  const stats = [
    { label: "Total Students", value: totalStudents.toString(), change: "+12.5%", icon: <Users size={24} />, color: "blue" },
    { label: "Active Courses", value: activeCourses.toString(), change: "+8.2%", icon: <BookOpen size={24} />, color: "green" },
    { label: "Total Instructors", value: totalInstructors.toString(), change: "+5.1%", icon: <Shield size={24} />, color: "purple" },
    { label: "Platform Revenue", value: `$${platformRevenue.toLocaleString()}`, change: "+18.3%", icon: <DollarSign size={24} />, color: "amber" }
  ];

  // All courses across platform
  const recentCourses = courses.slice(0, 4).map(course => ({
    title: course.title,
    instructor: course.instructorName,
    students: course.enrolledCount || 0,
    status: course.status,
    revenue: `$${(course.revenue || 0).toLocaleString()}`
  }));

  // Generate active sessions from courses (simulate sessions)
  const activeSessions = courses.slice(0, 3).map((course, index) => ({
    title: course.title,
    instructor: course.instructorName,
    time: `Session ${index + 1}`,
    students: Math.floor((course.enrolledCount || 0) * 0.3),
    status: "Scheduled"
  }));

  // Generate instructor list from unique instructors in courses
  const instructorMap = new Map();
  courses.forEach(course => {
    if (!instructorMap.has(course.instructorName)) {
      instructorMap.set(course.instructorName, {
        name: course.instructorName,
        courses: 0,
        revenue: 0
      });
    }
    const instructor = instructorMap.get(course.instructorName);
    instructor.courses += 1;
    instructor.revenue += course.revenue || 0;
  });

  const recentInstructors = Array.from(instructorMap.values()).slice(0, 3).map(instructor => ({
    name: instructor.name,
    email: `${instructor.name.toLowerCase().replace(/\s+/g, '.')}@elearning.com`,
    courses: instructor.courses,
    joinDate: "Jan 2026"
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full border-emerald-600 animate-spin"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Header */}
      <header className="flex items-center justify-between h-20 px-8 mb-8 bg-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">System Overview & Admin Controls</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
            <input
              type="text"
              placeholder="Search courses, instructors, users..."
              className="w-64 py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:bg-gray-100"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            <Bell size={20} />
            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
          </button>

          {/* Settings */}
          <button className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* System Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 transition-all bg-white rounded-xl hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-100 text-green-600' :
                    stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {stat.icon}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <TrendingUp size={16} />
                    {stat.change}
                  </span>
                </div>
                <p className="mb-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* All Courses Across Platform */}
            <div className="p-6 bg-white rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Courses Overview</h3>
                <button 
                  onClick={() => navigate('/admin/courses')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Manage All
                </button>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                    <div className="flex-1">
                      <h4 className="mb-1 text-sm font-semibold text-gray-900">{course.title}</h4>
                      <p className="text-xs text-gray-600">by {course.instructor}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{course.students}</p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-emerald-600">{course.revenue}</p>
                        <p className="text-xs text-gray-600">Revenue</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Sessions */}
            <div className="p-6 bg-white rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Live Sessions</h3>
                <button 
                  onClick={() => navigate('/admin/schedule')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Schedule
                </button>
              </div>

              <div className="space-y-4">
                {activeSessions.map((session, index) => (
                  <div key={index} className="p-4 transition-all rounded-lg bg-blue-50 hover:shadow-md">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-1 text-sm font-semibold text-gray-900">{session.title}</h4>
                        <p className="text-xs text-gray-600">by {session.instructor}</p>
                      </div>
                      <Video className="text-blue-600" size={20} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-semibold text-gray-700">
                        <Clock size={14} />
                        {session.time}
                      </span>
                      <span className="text-gray-600">{session.students} registered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructors Management Section */}
          <div className="p-6 mt-6 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Instructor Management</h3>
              </div>
              <button 
                onClick={() => navigate('/admin/users')}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Manage All Instructors
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Instructor Name</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Active Courses</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Join Date</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInstructors.map((instructor, index) => (
                    <tr key={index} className="transition-colors border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{instructor.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{instructor.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                          {instructor.courses} courses
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{instructor.joinDate}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  };
