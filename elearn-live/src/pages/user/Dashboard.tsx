import { motion } from "framer-motion";
import { 
  BookOpen, Clock, Award, TrendingUp, Play, CheckCircle,
  Calendar, Target, BarChart3, Book, Video, FileText,
  Star, ArrowRight, Circle, Brain, Trophy, Zap
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";
import { useAuth } from "../../context/AuthContext";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  // Mock Data
  const stats = [
    { 
      label: "Courses In Progress", 
      value: "3", 
      icon: <BookOpen size={24} />, 
      color: "bg-blue-600",
      change: "+1 this month"
    },
    { 
      label: "Completed Courses", 
      value: "12", 
      icon: <Award size={24} />, 
      color: "bg-green-600",
      change: "+2 this month"
    },
    { 
      label: "Learning Hours", 
      value: "124", 
      icon: <Clock size={24} />, 
      color: "bg-purple-600",
      change: "+18 this week"
    },
    { 
      label: "Certificates Earned", 
      value: "8", 
      icon: <Trophy size={24} />, 
      color: "bg-amber-600",
      change: "+1 this month"
    },
  ];

  const ongoingCourses = [
    {
      id: 1,
      title: "Advanced React & TypeScript",
      instructor: "Sarah Chen",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
      nextLesson: "Performance Optimization",
      timeLeft: "12 lessons remaining",
      dueDate: "Next session: Tomorrow, 3:00 PM"
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      instructor: "James Wilson",
      progress: 42,
      thumbnail: "https://images.unsplash.com/photo-1629904853716-6b03184ec0a5?w=400&q=80",
      nextLesson: "Node.js Authentication",
      timeLeft: "23 lessons remaining",
      dueDate: "Next session: Jan 8, 2:00 PM"
    },
    {
      id: 3,
      title: "JavaScript ES6+ Complete Guide",
      instructor: "Mike Johnson",
      progress: 88,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80",
      nextLesson: "Final Project",
      timeLeft: "3 lessons remaining",
      dueDate: "Complete by: Jan 15"
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Live Q&A: React Best Practices",
      course: "Advanced React & TypeScript",
      instructor: "Sarah Chen",
      time: "Tomorrow, 3:00 PM",
      duration: "1 hour"
    },
    {
      id: 2,
      title: "Project Review Session",
      course: "Full-Stack Web Development",
      instructor: "James Wilson",
      time: "Jan 8, 2:00 PM",
      duration: "2 hours"
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 3 courses in a month",
      icon: <Zap size={24} />,
      color: "bg-yellow-500"
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Scored 100% on final exam",
      icon: <Star size={24} />,
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Dedicated Learner",
      description: "7-day learning streak",
      icon: <Brain size={24} />,
      color: "bg-purple-500"
    },
  ];

  return (
    <>
      <FloatingNavbar />
      
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Welcome back, {user?.name }! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Continue your learning journey and achieve your goals
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 transition-all bg-white border-2 border-gray-200 cursor-pointer rounded-xl hover:border-blue-600 hover:shadow-lg group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <p className="mb-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mb-2 text-sm font-semibold text-gray-600">{stat.label}</p>
                <p className="text-xs font-medium text-green-600">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              
              {/* Continue Learning Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="mb-1 text-2xl font-bold text-gray-900">Continue Learning</h2>
                    <p className="text-sm text-gray-600">Pick up where you left off</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View All <ArrowRight size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {ongoingCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="flex gap-4 p-4 transition-all border-2 border-gray-200 cursor-pointer rounded-xl hover:border-blue-600 hover:shadow-md group"
                    >
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 w-32 h-24 overflow-hidden rounded-lg">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
                          <Play className="text-white" size={32} fill="white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 font-bold text-gray-900 transition-colors line-clamp-1 group-hover:text-blue-600">
                          {course.title}
                        </h3>
                        <p className="mb-3 text-sm text-gray-600">by {course.instructor}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-gray-700">Progress</span>
                            <span className="text-xs font-bold text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                            <div 
                              className="h-full transition-all duration-500 bg-blue-600 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-gray-600">{course.nextLesson}</span>
                          <span className="text-gray-500">{course.timeLeft}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Achievements</h2>
                  <Trophy className="text-amber-500" size={28} />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {recentAchievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className="flex flex-col items-center p-4 text-center transition-all border-2 border-gray-200 cursor-pointer rounded-xl hover:border-amber-500 hover:shadow-md group"
                    >
                      <div className={`${achievement.color} p-4 rounded-full text-white mb-3 group-hover:scale-110 transition-transform`}>
                        {achievement.icon}
                      </div>
                      <h4 className="mb-1 text-sm font-bold text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              
              {/* Upcoming Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="text-blue-600" size={24} />
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Sessions</h3>
                </div>

                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div 
                      key={session.id}
                      className="p-4 transition-all border-2 border-blue-200 cursor-pointer rounded-xl bg-blue-50 hover:border-blue-600 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-blue-600 rounded-lg">
                          <Video size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 text-sm font-bold text-gray-900 line-clamp-2">
                            {session.title}
                          </h4>
                          <p className="mb-2 text-xs text-gray-600">{session.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 font-semibold text-gray-700">
                          <Clock size={14} />
                          {session.time}
                        </span>
                        <span className="text-gray-600">{session.duration}</span>
                      </div>
                      <button className="w-full py-2 mt-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                        Join Session
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Learning Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">This Week</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Lessons Completed</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">24</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                        <FileText className="text-purple-600" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Assignments Done</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">8</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <Star className="text-blue-600" size={20} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Average Score</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">92%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
