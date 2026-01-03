import { motion } from "framer-motion";
import { 
  Plus, Search, Edit, Trash2, Eye, Copy,
  BookOpen, Users, DollarSign, Star,
  CheckCircle, Clock, Download
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CourseManagement = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock Course Data
  const courses = [
    {
      id: 1,
      title: "Advanced React & TypeScript Mastery",
      instructor: "Sarah Chen",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
      price: 99,
      students: 234,
      rating: 4.9,
      lessons: 156,
      duration: "32 hours",
      status: "published",
      revenue: "$23,166",
      lastUpdated: "2 days ago",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      instructor: "James Wilson",
      thumbnail: "https://images.unsplash.com/photo-1629904853716-6b03184ec0a5?w=400&q=80",
      price: 119,
      students: 189,
      rating: 4.8,
      lessons: 234,
      duration: "48 hours",
      status: "published",
      revenue: "$22,491",
      lastUpdated: "5 days ago",
      category: "Web Development"
    },
    {
      id: 3,
      title: "JavaScript ES6+ Complete Guide",
      instructor: "Mike Johnson",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80",
      price: 79,
      students: 421,
      rating: 4.7,
      lessons: 128,
      duration: "28 hours",
      status: "published",
      revenue: "$33,259",
      lastUpdated: "1 week ago",
      category: "Programming"
    },
    {
      id: 4,
      title: "Node.js Backend Masterclass",
      instructor: "Emily Davis",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80",
      price: 109,
      students: 167,
      rating: 4.6,
      lessons: 98,
      duration: "25 hours",
      status: "draft",
      revenue: "$0",
      lastUpdated: "3 days ago",
      category: "Backend"
    }
  ];

  const stats = [
    { label: "Total Courses", value: courses.length, icon: <BookOpen size={20} />, color: "blue" },
    { label: "Published", value: courses.filter(c => c.status === "published").length, icon: <CheckCircle size={20} />, color: "green" },
    { label: "Draft", value: courses.filter(c => c.status === "draft").length, icon: <Clock size={20} />, color: "amber" },
    { label: "Total Revenue", value: "$78,916", icon: <DollarSign size={20} />, color: "purple" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      console.log("Deleting course:", id);
    }
  };

  const handleDuplicate = (id: number) => {
    console.log("Duplicating course:", id);
  };

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Manage all your courses, content, and settings</p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-blue-600 transition-colors flex items-center gap-2">
              <Download size={18} />
              Export
            </button>
            <button 
              onClick={() => navigate("/admin/courses/new")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus size={18} />
              Add New Course
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border-2 border-gray-200">
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
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
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
          <div className="flex gap-2 border-l-2 border-gray-200 pl-4">
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

      {/* Course Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
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
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                  {course.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b-2 border-gray-200">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">{course.students}</p>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
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
                    onClick={() => navigate(`/admin/courses/${course.id}`)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleDuplicate(course.id)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)}
                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
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
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-bold text-gray-700">Course</th>
                <th className="text-left p-4 text-sm font-bold text-gray-700">Instructor</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Students</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Rating</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Revenue</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Status</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-600">{course.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{course.instructor}</td>
                  <td className="p-4 text-center font-semibold text-gray-900">{course.students}</td>
                  <td className="p-4 text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-gray-900">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      {course.rating}
                    </span>
                  </td>
                  <td className="p-4 text-center font-semibold text-green-600">{course.revenue}</td>
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
                        onClick={() => navigate(`/admin/courses/${course.id}`)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDuplicate(course.id)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
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
      )}

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-200">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
