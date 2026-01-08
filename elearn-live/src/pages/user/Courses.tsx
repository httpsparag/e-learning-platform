import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Users, Clock, Search, Sparkles, 
  Code2, Layout, Terminal, Zap, CheckCircle2 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";
import CourseService from "../../services/course.service";
import type { Course as APICourse } from "../../services/course.service";

// --- Types & Data ---
interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  instructor: string;
  instructorImage: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  badge?: string;
}

// Function to convert API courses to display format
const convertAPICourseToDisplay = (apiCourse: APICourse): Course => {
  return {
    id: apiCourse._id,
    title: apiCourse.title,
    description: apiCourse.description,
    price: apiCourse.revenue > 0 ? Math.round(apiCourse.revenue / apiCourse.enrolledCount) : 99,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80", // Placeholder image
    instructor: apiCourse.instructorName,
    instructorImage: `https://i.pravatar.cc/100?u=${apiCourse.instructorName}`, // Generate avatar from name
    rating: apiCourse.rating,
    reviews: apiCourse.reviewCount,
    students: apiCourse.enrolledCount,
    duration: "32 hours", // Placeholder
    lessons: 156, // Placeholder
    level: apiCourse.level as "Beginner" | "Intermediate" | "Advanced",
    category: "Web Development", // Default category
    badge: apiCourse.status === "Active" ? "Active" : undefined,
  };
};

// --- Utility Components ---
const Badge = ({ children, type }: { children: React.ReactNode; type: "level" | "badge" }) => {
  const styles = type === "badge" 
    ? "bg-blue-600 text-white shadow-md" 
    : "bg-white text-gray-700 font-semibold border-2 border-gray-200";
  
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wide font-bold ${styles}`}>
      {children}
    </span>
  );
};

export function Courses() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses from API on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError("");
        const apiCourses = await CourseService.getAllCourses();
        const convertedCourses = apiCourses.map(convertAPICourseToDisplay);
        setDisplayCourses(convertedCourses);
      } catch (err: any) {
        setError(err.message || "Failed to load courses");
        setDisplayCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = displayCourses.filter(course => {
    const matchesFilter = filter === "all" || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ["all", ...new Set(displayCourses.map(c => c.category))];

  // Show loading state
  if (isLoading) {
    return (
      <>
        <FloatingNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FloatingNavbar />
      
      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="relative z-10 pt-32 pb-16 px-6 sm:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold tracking-wide text-xs uppercase">
                <Sparkles size={14} className="text-blue-600" />
                <span>Premium Learning Experience</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-gray-900">
                Expand Your <br />
                <span className="text-blue-600">
                  Knowledge Horizon
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Access world-class courses taught by industry experts. Elevate your skills with production-ready projects and master modern tech stacks.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full lg:w-auto min-w-[320px]"
            >
              <div className="relative bg-white border-2 border-gray-200 rounded-xl flex items-center p-1.5 shadow-sm hover:border-blue-600 hover:shadow-md transition-all">
                <Search className="ml-3 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none px-4 py-2.5 focus:outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>
            </motion.div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3"
            >
              <span>⚠️</span>
              <span>{error}</span>
            </motion.div>
          )}

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`relative px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === category 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  {category === 'all' && <Layout size={16} />}
                  {category === 'Web Development' && <Code2 size={16} />}
                  {category === 'Programming' && <Terminal size={16} />}
                  {category === 'Web Design' && <Zap size={16} />}
                  <span className="capitalize">{category}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={course.id}
                  className="group relative h-full"
                >
                  <div className="h-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-600 transition-all duration-300 flex flex-col transform hover:-translate-y-1">
                    
                    {/* Card Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                      
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <Badge type="level">{course.level}</Badge>
                      </div>
                      {course.badge && (
                        <div className="absolute top-4 right-4 z-20">
                          <Badge type="badge">{course.badge}</Badge>
                        </div>
                      )}

                      {/* Instructor Info */}
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={course.instructorImage} 
                            alt={course.instructor}
                            className="w-11 h-11 rounded-full border-3 border-white shadow-md"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="text-white">
                          <p className="text-sm font-bold leading-tight">{course.instructor}</p>
                          <p className="text-xs text-gray-200 tracking-wide">Instructor</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Top Row: Category & Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md">
                          <Star className="text-amber-500 fill-amber-500" size={14} />
                          <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                          <span className="text-xs text-gray-500">({course.reviews})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-5 flex-1 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Meta Data */}
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-5 pb-5 border-b-2 border-gray-100">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-blue-600" />
                          <span>{(course.students / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-blue-600" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-blue-600" />
                          <span>{course.lessons}</span>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-gray-400 line-through">${course.originalPrice}</span>
                          <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                        </div>
                        
                        <button 
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-32">
              <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                <Search className="text-gray-400" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any courses matching your search. Try using broader terms or different filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
