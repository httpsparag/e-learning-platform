import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, BookOpen, Clock, Eye } from "lucide-react";

export const InstructorAnalytics = () => {
  const analyticsData = [
    { label: "Total Views", value: "12,450", change: "+5.2%", icon: <Eye size={24} />, color: "blue" },
    { label: "Avg Completion Rate", value: "68%", change: "+2.1%", icon: <TrendingUp size={24} />, color: "emerald" },
    { label: "Student Engagement", value: "4.8/5", change: "+0.3%", icon: <Users size={24} />, color: "purple" },
    { label: "Total Watch Hours", value: "1,254 hrs", change: "+18.5%", icon: <Clock size={24} />, color: "amber" }
  ];

  const courseAnalytics = [
    {
      course: "Advanced React & TypeScript",
      students: 234,
      avgCompletion: 82,
      avgEngagement: 4.8,
      views: 3420,
      watchTime: 456,
      rating: 4.8
    },
    {
      course: "Full-Stack Web Development",
      students: 189,
      avgCompletion: 65,
      avgEngagement: 4.6,
      views: 2890,
      watchTime: 389,
      rating: 4.7
    },
    {
      course: "JavaScript ES6+ Guide",
      students: 421,
      avgCompletion: 75,
      avgEngagement: 4.9,
      views: 5230,
      watchTime: 712,
      rating: 4.9
    },
    {
      course: "Node.js Backend Development",
      students: 156,
      avgCompletion: 71,
      avgEngagement: 4.7,
      views: 1920,
      watchTime: 298,
      rating: 4.6
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "bg-blue-600" },
      emerald: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "bg-emerald-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "bg-purple-600" },
      amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "bg-amber-600" }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Analytics & Insights</h2>
        <p className="text-gray-600 mt-1">Track your teaching performance and student engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <div className="text-gray-700">{metric.icon}</div>
                </div>
                <span className="text-sm font-semibold text-green-600">{metric.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Course Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={24} className="text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">Course Performance</h3>
          </div>
          <p className="text-sm text-gray-600">Detailed analytics for each of your courses</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Students</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Views</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Watch Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
              </tr>
            </thead>
            <tbody>
              {courseAnalytics.map((course, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{course.course}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.students}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${course.avgCompletion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{course.avgCompletion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {course.avgEngagement}/5
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{course.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{course.watchTime} hrs</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      ⭐ {course.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Courses</h3>
          <div className="space-y-3">
            {courseAnalytics
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{course.course}</p>
                    <p className="text-xs text-gray-600">⭐ {course.rating} rating</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{course.students} students</span>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Engagement Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Engagement Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="font-semibold text-emerald-900 text-sm">Highest Engagement</p>
              <p className="text-xs text-emerald-700 mt-1">JavaScript ES6+ Guide with 4.9/5 engagement score</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900 text-sm">Most Watched</p>
              <p className="text-xs text-blue-700 mt-1">JavaScript ES6+ Guide with 5,230 total views</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="font-semibold text-purple-900 text-sm">Highest Completion</p>
              <p className="text-xs text-purple-700 mt-1">Advanced React & TypeScript with 82% completion rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
