import { motion } from "framer-motion";
import { 
  Users, BookOpen, Video, DollarSign, TrendingUp, 
  Search, Bell, Settings, BarChart3,
  Clock, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const InstructorDashboard = () => {
  const navigate = useNavigate();

  // Stats Data - Instructor Specific
  const stats = [
    { label: "My Students", value: "456", change: "+8.3%", icon: <Users size={24} />, color: "emerald" },
    { label: "Active Courses", value: "5", change: "+2", icon: <BookOpen size={24} />, color: "blue" },
    { label: "Upcoming Sessions", value: "12", change: "+3 this week", icon: <Video size={24} />, color: "purple" },
    { label: "Total Earnings", value: "$12,450", change: "+18.5%", icon: <DollarSign size={24} />, color: "amber" }
  ];

  const myCourses = [
    { title: "Advanced React & TypeScript", students: 234, rating: 4.8, status: "Active", revenue: "$3,450" },
    { title: "Full-Stack Web Development", students: 189, rating: 4.7, status: "Active", revenue: "$2,890" },
    { title: "JavaScript ES6+ Guide", students: 421, rating: 4.9, status: "Active", revenue: "$5,230" },
    { title: "TypeScript Masterclass", students: 167, rating: 4.6, status: "Draft", revenue: "$1,880" }
  ];

  const upcomingSessions = [
    { title: "React Performance Tips", time: "Today, 3:00 PM", students: 45, duration: "1.5 hrs" },
    { title: "Advanced TypeScript Patterns", time: "Tomorrow, 2:00 PM", students: 38, duration: "2 hrs" },
    { title: "Web Performance Optimization", time: "Jan 10, 4:00 PM", students: 52, duration: "1.5 hrs" },
    { title: "React Hooks Deep Dive", time: "Jan 11, 10:00 AM", students: 29, duration: "2 hrs" }
  ];

  const recentActivity = [
    { type: "enrollment", message: "3 new students enrolled in 'Advanced React'", time: "2 hours ago" },
    { type: "rating", message: "New 5-star review on 'Full-Stack Development'", time: "4 hours ago" },
    { type: "completion", message: "15 students completed 'JavaScript ES6+ Guide'", time: "1 day ago" },
    { type: "session", message: "Session recording available for 'Web Performance'", time: "2 days ago" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "bg-emerald-600" },
      blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "bg-blue-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "bg-purple-600" },
      amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "bg-amber-600" }
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="w-full">
      {/* Top Header */}
      <header className="h-20 bg-white flex items-center justify-between px-8 mb-8 rounded-xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back, Instructor! Here's your teaching overview.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:bg-gray-50"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <div className="text-gray-700">{stat.icon}</div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* My Courses Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
                <button 
                  onClick={() => navigate('/instructor/courses')}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
                >
                  View All →
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {myCourses.slice(0, 4).map((course, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{course.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{course.students}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-900 font-semibold">{course.rating}</span>
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
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            </div>

            <div className="p-4 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-emerald-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Session Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.map((session, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{session.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{session.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{session.students}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                      <Clock size={14} />
                      {session.duration}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs">
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
