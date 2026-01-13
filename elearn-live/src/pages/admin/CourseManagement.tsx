import { motion } from "framer-motion";
import { 
  Search, Edit, Trash2, Eye,
  BookOpen, DollarSign, Star,
  CheckCircle, Clock, Download
} from "lucide-react";
import { useState, useEffect } from "react";
import CourseService from "../../services/course.service";
import { AdminCourseModal } from "../../components/admin/AdminCourseModal";

interface Course {
  _id: string;
  id?: string;
  title: string;
  instructorName: string;
  instructor?: string;
  description?: string;
  enrolledCount?: number;
  students?: number;
  rating?: number;
  status?: string;
  revenue?: number | string;
  lastUpdated?: string;
  thumbnail?: string;
  price?: number;
  lessons?: number;
  duration?: string;
  category?: string;
}

export const CourseManagement = () => {
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [modalView, setModalView] = useState<'edit' | 'view'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await CourseService.getAllCourses();
        const formattedCourses = (coursesData || []).map((course: any) => ({
          ...course,
          id: course._id,
          students: course.enrolledCount || 0,
          instructor: course.instructorName,
          revenue: `$${(course.revenue || 0).toLocaleString()}`,
          status: course.status || "published",
          rating: course.rating || 4.5,
          thumbnail: course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
          category: course.category || "Web Development"
        }));
        setCourses(formattedCourses);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const stats = [
    { label: "Total Courses", value: courses.length, icon: <BookOpen size={20} />, color: "blue" },
    { label: "Published", value: courses.filter(c => c.status === "published").length, icon: <CheckCircle size={20} />, color: "green" },
    { label: "Draft", value: courses.filter(c => c.status === "draft").length, icon: <Clock size={20} />, color: "amber" },
    { label: "Total Revenue", value: `$${courses.reduce((sum, c) => {
      const rev = typeof c.revenue === 'string' ? parseInt(c.revenue.replace(/[^0-9]/g, '')) : c.revenue || 0;
      return sum + rev;
    }, 0).toLocaleString()}`, icon: <DollarSign size={20} />, color: "purple" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.instructor || course.instructorName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      console.log("Deleting course:", id);
    }
  };

  const handleEditClick = (course: any) => {
    setSelectedCourse(course);
    setModalView('edit');
    setIsModalOpen(true);
  };

  const handleViewClick = (course: any) => {
    setSelectedCourse(course);
    setModalView('view');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleCourseUpdated = async () => {
    // Refresh courses list
    try {
      const coursesData = await CourseService.getAllCourses();
      const formattedCourses = (coursesData || []).map((course: any) => ({
        ...course,
        id: course._id,
        students: course.enrolledCount || 0,
        instructor: course.instructorName,
        revenue: `$${(course.revenue || 0).toLocaleString()}`,
        status: course.status || "published",
        rating: course.rating || 4.5,
        thumbnail: course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
        category: course.category || "Web Development"
      }));
      setCourses(formattedCourses);
    } catch (err) {
      console.error('Failed to refresh courses');
    }
  };

  const handleCourseDeleted = async () => {
    // Refresh courses list
    try {
      const coursesData = await CourseService.getAllCourses();
      const formattedCourses = (coursesData || []).map((course: any) => ({
        ...course,
        id: course._id,
        students: course.enrolledCount || 0,
        instructor: course.instructorName,
        revenue: `$${(course.revenue || 0).toLocaleString()}`,
        status: course.status || "published",
        rating: course.rating || 4.5,
        thumbnail: course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
        category: course.category || "Web Development"
      }));
      setCourses(formattedCourses);
    } catch (err) {
      console.error('Failed to refresh courses');
    }
  };

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600">View, edit, and manage all platform courses</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 font-semibold text-gray-700 transition-colors bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-white border-2 border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {stat.icon}
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-4 p-4 bg-white border-2 border-gray-200 rounded-xl sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                filterStatus === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("published")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                filterStatus === "published" 
                  ? "bg-green-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilterStatus("draft")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                filterStatus === "draft" 
                  ? "bg-amber-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Draft
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 pl-4 border-l-2 border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block w-12 h-12 mb-4 border-4 border-gray-200 rounded-full border-t-blue-600 animate-spin"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 border-2 border-red-200 bg-red-50 rounded-xl">
          <p className="mb-4 text-red-700">Error loading courses: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Course Grid/List */}
      {!loading && !error && (viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id || course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="overflow-hidden transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute flex gap-2 top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    course.status === 'published' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <span className="px-2 py-1 text-xs font-semibold text-blue-600 rounded bg-blue-50">
                    {course.category}
                  </span>
                </div>
                
                <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="mb-4 text-sm text-gray-600">by {course.instructor}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pb-4 mb-4 border-b-2 border-gray-200">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">{course.students}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      {course.rating}
                    </p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-green-600">{course.revenue}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditClick(course)}
                    className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleViewClick(course)}
                    className="px-3 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(course._id)}
                    className="px-3 py-2 text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="overflow-hidden bg-white border-2 border-gray-200 rounded-xl">
          <table className="w-full">
            <thead className="border-b-2 border-gray-200 bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-bold text-left text-gray-700">Course</th>
                <th className="p-4 text-sm font-bold text-left text-gray-700">Instructor</th>
                <th className="p-4 text-sm font-bold text-center text-gray-700">Students</th>
                <th className="p-4 text-sm font-bold text-center text-gray-700">Rating</th>
                <th className="p-4 text-sm font-bold text-center text-gray-700">Revenue</th>
                <th className="p-4 text-sm font-bold text-center text-gray-700">Status</th>
                <th className="p-4 text-sm font-bold text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course._id || course.id} className="transition-colors border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="object-cover w-16 h-16 rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-600">{course.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{course.instructor}</td>
                  <td className="p-4 font-semibold text-center text-gray-900">{course.students}</td>
                  <td className="p-4 text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-gray-900">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      {course.rating}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-center text-green-600">{course.revenue}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      course.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditClick(course)}
                        className="p-2 text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleViewClick(course)}
                        className="p-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(course._id)}
                        className="p-2 text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Empty State */}
      {!loading && !error && filteredCourses.length === 0 && (
        <div className="py-16 text-center bg-white border-2 border-gray-200 rounded-xl">
          <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="mb-2 text-xl font-bold text-gray-900">No courses found</h3>
          <p className="mb-6 text-gray-600">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="px-6 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Admin Course Modal */}
      <AdminCourseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        course={selectedCourse}
        view={modalView}
        onCourseUpdated={handleCourseUpdated}
        onDeleted={handleCourseDeleted}
      />
    </div>
  );
};
