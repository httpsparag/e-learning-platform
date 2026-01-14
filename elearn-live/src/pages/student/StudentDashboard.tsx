import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Play,
  Users,
  Star,
  ArrowRight,
  Video,
  Calendar,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import CourseService from "../../services/course.service";

interface Course {
  _id: string;
  title: string;
  description: string;
  instructorName?: string;
  instructor?: {
    _id: string;
    name: string;
    email: string;
  };
  enrolledCount: number;
  rating: number;
  thumbnail?: string;
  progress?: number;
}

export const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await CourseService.getAllCourses();
        // Filter to show only enrolled courses (mock implementation)
        setEnrolledCourses(coursesData?.slice(0, 3) || []);
      } catch (err: any) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const stats = [
    {
      label: "Courses In Progress",
      value: enrolledCourses.length.toString(),
      change: "+1 this month",
      icon: <BookOpen size={24} />,
      color: "bg-blue-600",
    },
    {
      label: "Learning Hours",
      value: "42",
      change: "+8 this week",
      icon: <Clock size={24} />,
      color: "bg-purple-600",
    },
    {
      label: "Average Rating",
      value: "4.5",
      change: "From instructors",
      icon: <Star size={24} />,
      color: "bg-amber-600",
    },
    {
      label: "Certificates",
      value: "3",
      change: "+1 this month",
      icon: <Trophy size={24} />,
      color: "bg-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-blue-600"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-1">Here's what you're learning today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enrolled Courses Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
              <a
                href="/student/courses"
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </a>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <BookOpen size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        By {course.instructorName || course.instructor?.name || "Unknown Instructor"}
                      </p>
                      {/* Progress Bar */}
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress || 45}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-semibold text-gray-600">
                        {course.progress || 45}%
                      </span>
                      <Play
                        size={20}
                        className="text-blue-600 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600">No courses enrolled yet</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>

          <div className="space-y-3">
            <button className="w-full p-4 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold transition-all flex items-center gap-2">
              <Video size={20} />
              Join Live Class
            </button>
            <button className="w-full p-4 rounded-lg border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all flex items-center gap-2">
              <Calendar size={20} />
              Schedule
            </button>
            <button className="w-full p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-semibold transition-all flex items-center gap-2">
              <Users size={20} />
              Messages
            </button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-900 mb-2">Pro Tip</p>
            <p className="text-xs text-gray-600">
              Join live classes to interact with instructors and get real-time feedback on your progress.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Sessions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
        <div className="space-y-3">
          {enrolledCourses.slice(0, 3).map((course) => (
            <div
              key={course._id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-600">
                    Tomorrow at 3:00 PM • {course.instructorName || course.instructor?.name || "Unknown"}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                Join
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
