import { motion } from "framer-motion";
import { Search, Filter, Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { AddCourseModal } from "../../components/instructor/AddCourseModal";
import { EditCourseModal } from "../../components/instructor/EditCourseModal";
import { ViewCourseModal } from "../../components/instructor/ViewCourseModal";
import CourseService from "../../services/course.service";
import type { Course } from "../../services/course.service";

export const InstructorCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
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
      console.log('   Total courses:', data?.length || 0);
      
      if (data && Array.isArray(data)) {
        setCourses(data);
        console.log('📚 Courses set in state');
      } else {
        console.warn('⚠️ Unexpected data format:', data);
        setCourses([]);
      }
    } catch (err: any) {
      console.error('❌ Error fetching courses:', err.message);
      setError(err.message || "Failed to load courses");
      setCourses([]);
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

  const handlePublishCourse = async (courseId: string) => {
    try {
      await CourseService.publishCourse(courseId);
      // Update the course in state
      setCourses(courses.map(c => 
        c._id === courseId ? { ...c, status: 'Active' } : c
      ));
    } catch (err: any) {
      setError(err.message || "Failed to publish course");
    }
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
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
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full border-emerald-600 animate-spin"></div>
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
            <p className="mt-1 text-gray-600">Manage all your courses and track student progress</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
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
            className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50"
          >
            {error}
          </motion.div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-gray-700 bg-transparent outline-none"
            >
              <option value="all">All Courses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      {courses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 mb-8 border bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-emerald-200"
        >
          <h3 className="mb-4 text-lg font-bold text-gray-900">Course Summary</h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <p className="text-3xl font-bold text-emerald-600">{stats.activeCourses}</p>
              <p className="mt-1 text-sm text-gray-600">Active Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="mt-1 text-sm text-gray-600">Total Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
              <p className="mt-1 text-sm text-gray-600">Avg Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">${stats.totalRevenue.toFixed(0)}</p>
              <p className="mt-1 text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center border-2 border-gray-200 border-dashed bg-gray-50 rounded-xl"
        >
          <Plus size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-xl font-bold text-gray-900">No courses yet</h3>
          <p className="mb-6 text-gray-600">Start creating your first course to reach students</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus size={20} />
            Create First Course
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden transition-all bg-white border border-gray-200 rounded-xl hover:shadow-lg"
            >
              {/* Card Header */}
              <div className={`h-24 ${course.status === "Active" ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-gray-400 to-gray-500"}`}></div>

              {/* Card Content */}
              <div className="relative p-4">
                <div className="absolute flex items-center justify-center w-12 h-12 text-lg font-bold bg-white border-4 border-gray-100 rounded-lg -top-6 left-6">
                  {course.level.charAt(0)}
                </div>

                <div className="flex items-start justify-between pt-2 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900">{course.title}</h3>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-1">{course.description}</p>
                  </div>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    course.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {course.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 py-2 mb-3 text-center border-gray-100 border-y">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{course.enrolledCount}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      {course.rating > 0 ? (
                        <>
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <p className="text-lg font-bold text-gray-900">{course.rating.toFixed(1)}</p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-gray-400">N/A</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{course.reviewCount} r</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{course.enrolledCount}/{course.capacity}</p>
                    <p className="text-xs text-gray-600">Cap</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-emerald-600">${course.revenue.toFixed(0)}</p>
                    <p className="text-xs text-gray-600">Rev</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                  <span>Updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewCourse(course)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors font-semibold"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  {course.status === "Draft" && (
                    <>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-semibold"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handlePublishCourse(course._id)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors font-semibold"
                      >
                        <Edit size={14} />
                        Pub
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors font-semibold"
                      >
                        <Trash2 size={14} />
                        Del
                      </button>
                    </>
                  )}
                  {course.status === "Active" && (
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-semibold"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instructorName={instructorName}
        instructorEmail={instructorEmail}
        onCourseAdded={fetchCourses}
      />

      {/* View Course Modal */}
      <ViewCourseModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        course={selectedCourse}
      />

      {/* Edit Course Modal */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        course={selectedCourse}
        onCourseUpdated={fetchCourses}
      />
    </div>
  );
};