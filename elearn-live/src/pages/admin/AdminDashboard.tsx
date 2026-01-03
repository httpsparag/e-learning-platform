import { motion } from "framer-motion";
import { 
  Users, BookOpen, Video, DollarSign, TrendingUp, 
  Search, Bell, Settings, BarChart3,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  // Stats Data
  const stats = [
    { label: "Total Students", value: "2,847", change: "+12.5%", icon: <Users size={24} />, color: "blue" },
    { label: "Active Courses", value: "156", change: "+8.2%", icon: <BookOpen size={24} />, color: "green" },
    { label: "Live Sessions", value: "24", change: "+15.3%", icon: <Video size={24} />, color: "purple" },
    { label: "Revenue", value: "$45,280", change: "+23.1%", icon: <DollarSign size={24} />, color: "amber" }
  ];

  const recentCourses = [
    { title: "Advanced React & TypeScript", instructor: "Sarah Chen", students: 234, status: "Active" },
    { title: "Full-Stack Web Development", instructor: "James Wilson", students: 189, status: "Active" },
    { title: "JavaScript ES6+ Guide", instructor: "Mike Johnson", students: 421, status: "Active" },
    { title: "Node.js Masterclass", instructor: "Emily Davis", students: 167, status: "Draft" }
  ];

  const upcomingSessions = [
    { title: "React Performance Tips", instructor: "Sarah Chen", time: "Today, 3:00 PM", students: 45 },
    { title: "Node.js Best Practices", instructor: "James Wilson", time: "Tomorrow, 2:00 PM", students: 38 },
    { title: "TypeScript Deep Dive", instructor: "Mike Johnson", time: "Jan 10, 4:00 PM", students: 52 }
  ];

  return (
    <div className="w-full">
      {/* Top Header */}
      <header className="h-20 bg-white flex items-center justify-between px-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back, Admin!</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:bg-gray-100"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
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
                  <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    <TrendingUp size={16} />
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Recent Courses */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Courses</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{course.title}</h4>
                      <p className="text-xs text-gray-600">by {course.instructor}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{course.students}</p>
                        <p className="text-xs text-gray-600">Students</p>
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

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Upcoming Sessions</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Schedule New
                </button>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{session.title}</h4>
                        <p className="text-xs text-gray-600">by {session.instructor}</p>
                      </div>
                      <Video className="text-blue-600" size={20} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 font-semibold flex items-center gap-1">
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
        </main>
      </div>
    );
  };
