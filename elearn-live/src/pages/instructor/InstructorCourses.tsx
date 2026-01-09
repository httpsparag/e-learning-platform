import { motion } from "framer-motion";
import { Search, Filter, Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { AddCourseModal } from "../../components/instructor/AddCourseModal";
import CourseService from "../../services/course.service";
import type { Course } from "../../services/course.service";

export const InstructorCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");

  useEffect(() => {
    console.log('📚 InstructorCourses mounted, fetching data...');
    fetchCourses();
    getInstructorInfo();
  }, []);

  const getInstructorInfo = () => {
    // Get instructor info from localStorage or context
    const name = localStorage.getItem('instructorName') || 'Instructor';
    const email = localStorage.getItem('instructorEmail') || 'instructor@elearning.com';
    console.log('👤 Instructor Info:', { name, email });
    setInstructorName(name);
    setInstructorEmail(email);
  };

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError("");
      console.log('🔄 Fetching instructor courses...');
      const data = await CourseService.getInstructorCourses();
      console.log('✅ Courses fetched successfully:', data);
      setCourses(data || []);
    } catch (err: any) {
      console.error('❌ Error fetching courses:', err.message);
      setError(err.message || "Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await CourseService.deleteCourse(courseId);
        setCourses(courses.filter(c => c._id !== courseId));
      } catch (err: any) {
        setError(err.message || "Failed to delete course");
      }
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    activeCourses: courses.filter(c => c.status === "Active").length,
    totalStudents: courses.reduce((sum, c) => sum + c.enrolledCount, 0),
    avgRating: courses.length > 0 
      ? (courses.reduce((sum, c) => sum + c.rating, 0) / courses.filter(c => c.rating > 0).length).toFixed(1)
      : "N/A",
    totalRevenue: courses.reduce((sum, c) => sum + c.revenue, 0),
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-b-2 border-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Courses</h2>
            <p className="text-gray-600 mt-1">Manage all your courses and track student progress</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <Plus size={20} />
            Create New Course
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Filters & Search */}
        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="outline-none text-gray-700 bg-transparent"
            >
              <option value="all">All Courses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
        >
          <Plus size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-6">Start creating your first course to reach students</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <Plus size={20} />
            Create First Course
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Card Header */}
              <div className={`h-32 ${course.status === "Active" ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-gray-400 to-gray-500"}`}></div>

              {/* Card Content */}
              <div className="p-6 relative">
                <div className="absolute -top-6 left-6 w-12 h-12 bg-white rounded-lg border-4 border-gray-100 flex items-center justify-center text-lg font-bold">
                  {course.level.charAt(0)}
                </div>

                <div className="flex items-start justify-between mb-4 pt-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
                  </div>
                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    course.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {course.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-4 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{course.enrolledCount}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {course.rating > 0 ? (
                        <>
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <p className="text-2xl font-bold text-gray-900">{course.rating.toFixed(1)}</p>
                        </>
                      ) : (
                        <p className="text-2xl font-bold text-gray-400">N/A</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{course.reviewCount} reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{course.enrolledCount}/{course.capacity}</p>
                    <p className="text-xs text-gray-600">Capacity</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">${course.revenue.toFixed(0)}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                  <span>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors font-semibold">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-semibold">
                    <Edit size={16} />
                    Edit
                  </button>
                  {course.status === "Draft" && (
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors font-semibold"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {filteredCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Course Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold text-emerald-600">{stats.activeCourses}</p>
              <p className="text-sm text-gray-600 mt-1">Active Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="text-sm text-gray-600 mt-1">Total Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
              <p className="text-sm text-gray-600 mt-1">Avg Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">${stats.totalRevenue.toFixed(0)}</p>
              <p className="text-sm text-gray-600 mt-1">Total Revenue</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instructorName={instructorName}
        instructorEmail={instructorEmail}
        onCourseAdded={fetchCourses}
      />    </div>
  );
};