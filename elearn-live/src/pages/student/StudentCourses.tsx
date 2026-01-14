import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Users,
  Search,
  Filter,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    bio?: string;
  };
  enrolledCount: number;
  rating: number;
  thumbnail?: string;
  category?: string;
  duration?: string;
  level?: string;
  instructorId?: string;
}

interface StudentCoursesProps {
  showInstructors?: boolean;
}

export const StudentCourses = ({ showInstructors = false }: StudentCoursesProps) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [instructors, setInstructors] = useState<any[]>([]);

  const categories = ["all", "Web Development", "Data Science", "Mobile", "Design"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await CourseService.getAllCourses();
        const courses = coursesData || [];
        setCourses(courses);
        setFilteredCourses(courses);

        // Extract unique instructors
        const instructorMap = new Map();
        courses.forEach((course: Course) => {
          const instructorName = course.instructorName || course.instructor?.name || "Unknown";
          const instructorId = course.instructorId || course.instructor?._id || "unknown";
          if (!instructorMap.has(instructorId)) {
            instructorMap.set(instructorId, {
              _id: instructorId,
              name: instructorName,
              email: course.instructor?.email || "",
              bio: course.instructor?.bio || ""
            });
          }
        });
        setInstructors(Array.from(instructorMap.values()));
      } catch (err: any) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on search and category
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.instructorName || course.instructor?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-blue-600"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Instructors View
  if (showInstructors) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Instructors</h1>
          <p className="text-gray-600 mt-1">
            Connect with experienced instructors from your courses
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Avatar */}
              <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <GraduationCap size={48} className="text-white" />
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {instructor.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Instructor</p>

                {/* Courses Count */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Courses Teaching</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      courses.filter((c) => 
                        (c.instructorId === instructor._id) || 
                        (c.instructor?._id === instructor._id) ||
                        (c.instructorName === instructor.name)
                      ).length
                    }
                  </p>
                </div>

                {/* Message Button */}
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {instructors.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600">No instructors found</p>
          </div>
        )}
      </div>
    );
  }

  // Courses View
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Learning Path</h1>
        <p className="text-gray-600 mt-1">
          Continue your journey with {filteredCourses.length} courses
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <Filter size={20} className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
              <img
                src={course.thumbnail || ""}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              {!course.thumbnail && <BookOpen size={48} className="text-white" />}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              {/* Instructor */}
              <p className="text-sm text-gray-600 mt-2">
                By {course.instructorName || course.instructor?.name || "Unknown Instructor"}
              </p>

              {/* Rating and Students */}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-400 fill-current" />
                  <span>{course.rating || 4.5}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{course.enrolledCount || 0} students</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {course.description}
              </p>

              {/* Progress or CTA */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {course.level || "Beginner"}
                </span>
                <ArrowRight
                  size={20}
                  className="text-blue-600 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== "all"
              ? "No courses found matching your criteria"
              : "No courses enrolled yet"}
          </p>
        </div>
      )}
    </div>
  );
};
