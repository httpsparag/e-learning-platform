import { motion } from "framer-motion";
import { 
  Users, BookOpen, Video, DollarSign, TrendingUp, 
  Search, Bell, Settings, BarChart3,
  Clock, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseService from "../../services/course.service";

interface Course {
  _id: string;
  title: string;
  enrolledCount: number;
  rating: number;
  status: string;
  revenue: number;
}

export const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instructorName, setInstructorName] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");

  // Fetch instructor courses on mount and set up auto-refresh
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await CourseService.getInstructorCourses();
        setCourses(coursesData || []);
        
        // Get instructor info from localStorage
        const name = localStorage.getItem('instructorName') || 'Instructor';
        const email = localStorage.getItem('instructorEmail') || 'instructor@example.com';
        setInstructorName(name);
        setInstructorEmail(email);
      } catch (err: any) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    
    // Auto-refresh courses every 15 seconds for real-time updates
    const interval = setInterval(() => {
      fetchCourses();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic stats from courses
  const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledCount || 0), 0);
  const activeCourses = courses.filter(c => c.status === "Active").length;
  const totalEarnings = courses.reduce((sum, course) => sum + (course.revenue || 0), 0);
  const avgRating = courses.length > 0 
    ? (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1)
    : 0;

  const stats = [
    { label: "My Students", value: totalStudents.toString(), change: "+8.3%", icon: <Users size={24} />, color: "emerald" },
    { label: "Active Courses", value: activeCourses.toString(), change: "+2", icon: <BookOpen size={24} />, color: "blue" },
    { label: "Upcoming Sessions", value: courses.length.toString(), change: "+3 this week", icon: <Video size={24} />, color: "purple" },
    { label: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, change: "+18.5%", icon: <DollarSign size={24} />, color: "amber" }
  ];

  const myCourses = courses.map(course => ({
    title: course.title,
    students: course.enrolledCount || 0,
    rating: course.rating || 0,
    status: course.status || "Draft",
    revenue: `$${(course.revenue || 0).toLocaleString()}`
  }));

  const upcomingSessions = courses.slice(0, 4).map((course, index) => ({
    title: course.title,
    time: `Course Session ${index + 1}`,
    students: course.enrolledCount || 0,
    duration: "Varies"
  }));

  const recentActivity = courses.slice(0, 4).map((course, index) => ({
    type: index % 2 === 0 ? "enrollment" : "rating",
    message: `${course.enrolledCount} students enrolled in '${course.title}'`,
    time: `${index + 1} day${index > 0 ? 's' : ''} ago`
  }));

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "bg-emerald-600" },
      blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "bg-blue-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "bg-purple-600" },
      amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "bg-amber-600" }
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-emerald-600"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
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
      <header className="flex items-center justify-between h-20 px-8 mb-8 bg-white shadow-sm rounded-xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back, {instructorName}! Here's your teaching overview.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-gray-50"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
          </button>

          {/* Settings */}
          <button className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 transition-all bg-white border border-gray-100 rounded-xl hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <div className="text-gray-700">{stat.icon}</div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <h3 className="mb-1 text-sm font-medium text-gray-600">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          
          {/* My Courses Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="overflow-hidden bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-xl"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
                <button 
                  onClick={() => navigate('/instructor/courses')}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View All →
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Course Title</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Students</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Rating</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {myCourses.slice(0, 4).map((course, index) => (
                    <tr key={index} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{course.students}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-gray-900">{course.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "Active" 
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{course.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            </div>

            <div className="p-4 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-600"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl"
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Session Title</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Students</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Duration</th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.map((session, index) => (
                  <tr key={index} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{session.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{session.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{session.students}</td>
                    <td className="flex items-center gap-1 px-6 py-4 text-sm text-gray-600">
                      <Clock size={14} />
                      {session.duration}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
