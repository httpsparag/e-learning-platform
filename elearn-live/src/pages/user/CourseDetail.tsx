import { motion } from "framer-motion";
import { 
  Star, Users, Clock, BookOpen, CheckCircle2, ArrowLeft, Play, 
  Download, Award, Infinity, Video, FileText, Globe, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";
import { useAuth } from "../../context/AuthContext";

export function CourseDetail() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <FloatingNavbar />
      
      <div className="min-h-screen bg-white">
        
        {/* Content */}
        <div className="relative z-10 pt-24 pb-16">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6">
            <motion.button
              onClick={() => navigate("/courses")}
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </motion.button>
          </div>

          {/* Hero Section with Split Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-6 sm:px-12 mb-16"
          >
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
              {/* Left: Course Info */}
              <div>
                {/* Badges & Rating */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-100">
                    Advanced
                  </span>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 uppercase tracking-wide border border-amber-100">
                    Bestseller
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Star className="fill-amber-400 text-amber-400" size={16} />
                    <span className="font-bold text-gray-900">4.9</span>
                    <span className="text-gray-500 text-sm">(2,847 reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-gray-900">
                  Advanced React & TypeScript Mastery
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Master modern React patterns, hooks, and TypeScript for production-grade applications. Learn from industry experts and build real-world projects that will elevate your career.
                </p>

                {/* Instructor Card */}
                <div className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 border-2 border-gray-200 mb-8">
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/100?img=1"
                      alt="Instructor"
                      className="w-16 h-16 rounded-full border-3 border-white shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Created by</p>
                    <p className="font-bold text-gray-900 text-lg">Sarah Chen</p>
                    <p className="text-sm text-gray-600">Senior React Developer at Google</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="text-center">
                    <Clock className="text-blue-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-gray-900">32h</p>
                    <p className="text-xs text-gray-600 font-medium">Duration</p>
                  </div>
                  <div className="text-center border-x border-blue-200">
                    <BookOpen className="text-blue-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-xs text-gray-600 font-medium">Lessons</p>
                  </div>
                  <div className="text-center">
                    <Users className="text-blue-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-gray-900">45.2K</p>
                    <p className="text-xs text-gray-600 font-medium">Students</p>
                  </div>
                </div>
              </div>

              {/* Right: Video Preview Card (Sticky) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:sticky lg:top-24 h-fit"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gray-900 group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&q=80"
                      alt="Course Preview"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 rounded-lg text-sm font-bold text-gray-900">
                      Preview this course
                    </div>
                  </div>

                  {/* Pricing Card Content */}
                  <div className="p-6">
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-5xl font-bold text-gray-900">$99</span>
                        <span className="text-xl text-gray-400 line-through font-semibold">$199</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-50 border border-green-200">
                        <span className="text-sm font-bold text-green-700">50% OFF - Limited Time!</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <button 
                      onClick={() => {
                        if (!isAuthenticated) {
                          navigate("/auth/signup", {
                            state: {
                              redirectAfterAuth: "/enrollment/course-id",
                              message: "Please sign up to enroll in this course",
                            },
                          });
                        } else {
                          navigate("/enrollment/course-id");
                        }
                      }}
                      className="w-full mb-3 py-4 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg text-lg">
                      {isAuthenticated ? "Enroll Now" : "Sign Up to Enroll"}
                    </button>

                    <button className="w-full py-4 px-6 rounded-xl font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
                      Add to Wishlist
                    </button>

                    {/* Money Back Guarantee */}
                    <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                      <Shield className="inline-block text-blue-600 mb-2" size={20} />
                      <p className="text-sm text-blue-700 font-semibold">
                        30-day money-back guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
              {/* Left Column - Course Details */}
              <div>
                {/* What You'll Learn */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 pb-3 border-b-2 border-gray-200">
                    What you'll learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "React Hooks & Context API",
                      "TypeScript for React",
                      "Performance Optimization",
                      "Testing & Debugging",
                      "State Management with Redux",
                      "Real-world Project Portfolio"
                    ].map((topic, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all"
                      >
                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700 font-medium">{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Course Description */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 pb-3 border-b-2 border-gray-200">
                    Course Description
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                    <p className="leading-relaxed">
                      This comprehensive course takes you from intermediate to advanced React development. You'll master modern patterns, TypeScript integration, and production-ready best practices used by top tech companies.
                    </p>
                    <p className="leading-relaxed">
                      Through hands-on projects and real-world examples, you'll build a portfolio that showcases your expertise to potential employers. Each module includes coding challenges, quizzes, and downloadable resources.
                    </p>
                  </div>
                </section>

                {/* Requirements */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 pb-3 border-b-2 border-gray-200">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "Basic understanding of JavaScript (ES6+)",
                      "Familiarity with HTML and CSS",
                      "A computer with internet connection",
                      "Enthusiasm to learn modern web development"
                    ].map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Right Column - Course Includes */}
              <div>
                <div className="lg:sticky lg:top-24">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-6 text-gray-900">This course includes:</h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Video size={20} />, text: "32 hours on-demand video" },
                        { icon: <FileText size={20} />, text: "156 coding exercises" },
                        { icon: <Download size={20} />, text: "Downloadable resources" },
                        { icon: <Infinity size={20} />, text: "Lifetime access" },
                        { icon: <Globe size={20} />, text: "Access on mobile and desktop" },
                        { icon: <Award size={20} />, text: "Certificate of completion" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="text-blue-600 flex-shrink-0">{item.icon}</div>
                          <span className="text-gray-700 font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 pt-8 border-t-2 border-gray-200 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Language</span>
                        <span className="text-gray-900 font-bold">English</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Last Updated</span>
                        <span className="text-gray-900 font-bold">Jan 2026</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Skill Level</span>
                        <span className="text-gray-900 font-bold">Advanced</span>
                      </div>
                    </div>
                  </div>

                  {/* Share Section */}
                  <div className="mt-6 p-6 bg-white border-2 border-gray-200 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4">Share this course</h4>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
                        Twitter
                      </button>
                      <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
