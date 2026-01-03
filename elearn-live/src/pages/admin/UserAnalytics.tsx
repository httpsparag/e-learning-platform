import { motion } from "framer-motion";
import { 
  Users, TrendingUp, TrendingDown, UserCheck, UserPlus,
  Search, Filter, Download, Eye, MoreVertical, Award,
  Clock, BookOpen, Activity, Star, Calendar, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("week");
  const [userType, setUserType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Analytics Data
  const stats = [
    {
      label: "Total Users",
      value: "3,254",
      change: "+12.5%",
      trend: "up",
      icon: <Users size={24} />,
      color: "blue"
    },
    {
      label: "Active Students",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: <UserCheck size={24} />,
      color: "green"
    },
    {
      label: "New Signups",
      value: "156",
      change: "+23.1%",
      trend: "up",
      icon: <UserPlus size={24} />,
      color: "purple"
    },
    {
      label: "Avg. Engagement",
      value: "78%",
      change: "-3.2%",
      trend: "down",
      icon: <Activity size={24} />,
      color: "amber"
    }
  ];

  const topStudents = [
    {
      id: 1,
      name: "Alex Kumar",
      email: "alex.kumar@example.com",
      courses: 8,
      completed: 6,
      hours: 124,
      avgScore: 94,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      courses: 12,
      completed: 10,
      hours: 156,
      avgScore: 92,
      lastActive: "5 hours ago"
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@example.com",
      courses: 6,
      completed: 5,
      hours: 98,
      avgScore: 88,
      lastActive: "1 day ago"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      courses: 10,
      completed: 7,
      hours: 132,
      avgScore: 90,
      lastActive: "3 hours ago"
    }
  ];

  const recentActivity = [
    { user: "Alex Kumar", action: "Completed course", detail: "Advanced React & TypeScript", time: "5 min ago" },
    { user: "Maria Garcia", action: "Started course", detail: "Full-Stack Development", time: "12 min ago" },
    { user: "John Smith", action: "Earned certificate", detail: "JavaScript ES6+", time: "1 hour ago" },
    { user: "Emily Davis", action: "Joined live session", detail: "React Performance", time: "2 hours ago" }
  ];

  const engagementData = [
    { day: "Mon", active: 420 },
    { day: "Tue", active: 380 },
    { day: "Wed", active: 450 },
    { day: "Thu", active: 390 },
    { day: "Fri", active: 470 },
    { day: "Sat", active: 320 },
    { day: "Sun", active: 280 }
  ];

  const maxEngagement = Math.max(...engagementData.map(d => d.active));

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Analytics</h1>
            <p className="text-gray-600">Track user engagement, activity, and performance</p>
          </div>
          
          <div className="flex gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900 font-medium"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-5 border-2 border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Engagement Chart */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Daily Active Users</h2>
                <p className="text-sm text-gray-600">User engagement over the past week</p>
              </div>
            </div>

            <div className="flex items-end gap-4 h-48">
              {engagementData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full bg-gray-100 rounded-t-lg relative flex items-end" style={{ height: '160px' }}>
                    <div 
                      className="w-full bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-700 cursor-pointer relative group"
                      style={{ height: `${(data.active / maxEngagement) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.active} users
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Top Performers</h2>
                <p className="text-sm text-gray-600">Most active and engaged students</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                View All
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {topStudents.map((student, index) => (
                <div key={student.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-1 min-w-[30px]">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-amber-500' :
                      index === 1 ? 'text-gray-400' :
                      index === 2 ? 'text-amber-700' :
                      'text-gray-600'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>
                  
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                    <p className="text-xs text-gray-600">{student.email}</p>
                  </div>

                  <div className="hidden sm:grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{student.courses}</p>
                      <p className="text-xs text-gray-600">Courses</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{student.hours}h</p>
                      <p className="text-xs text-gray-600">Hours</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-600">{student.avgScore}%</p>
                      <p className="text-xs text-gray-600">Avg Score</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/admin/users/${student.id}`)}
                    className="p-2 bg-white hover:bg-gray-100 rounded-lg border-2 border-gray-200 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* User Type Filter */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by Role</h3>
            <div className="space-y-2">
              {['all', 'students', 'instructors', 'admins'].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserType(type)}
                  className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all text-left ${
                    userType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Activity size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{activity.user}</p>
                    <p className="text-xs text-gray-600 mb-1">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Insights</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Avg. Courses/User</span>
                </div>
                <span className="text-lg font-bold text-gray-900">4.2</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="text-green-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                </div>
                <span className="text-lg font-bold text-gray-900">82%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="text-purple-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Avg. Session Time</span>
                </div>
                <span className="text-lg font-bold text-gray-900">45m</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Avg. Rating</span>
                </div>
                <span className="text-lg font-bold text-gray-900">4.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
