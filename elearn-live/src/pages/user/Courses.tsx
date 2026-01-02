import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Users, Clock, Search, Sparkles, 
  Code2, Layout, Terminal, Zap, CheckCircle2 
} from "lucide-react";
import { useState } from "react";
// Assuming this component exists in your project
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";

// --- Types & Data ---
interface Course {
  id: number;
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

const courses: Course[] = [
  {
    id: 1,
    title: "Advanced React & TypeScript Mastery",
    description: "Master modern React patterns, hooks, and TypeScript for production-grade applications.",
    price: 99,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&q=80",
    instructor: "Sarah Chen",
    instructorImage: "https://i.pravatar.cc/100?img=1",
    rating: 4.9,
    reviews: 2847,
    students: 45230,
    duration: "32 hours",
    lessons: 156,
    level: "Advanced",
    category: "Web Development",
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "Full-Stack Web Development with Node.js",
    description: "Build scalable web applications from frontend to backend with Node.js and React.",
    price: 119,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1629904853716-6b03184ec0a5?w=800&q=80",
    instructor: "James Wilson",
    instructorImage: "https://i.pravatar.cc/100?img=2",
    rating: 4.8,
    reviews: 1923,
    students: 32156,
    duration: "48 hours",
    lessons: 234,
    level: "Intermediate",
    category: "Web Development",
    badge: "New"
  },
  {
    id: 3,
    title: "JavaScript ES6+ Complete Guide",
    description: "From basics to advanced JavaScript concepts with modern ES6+ syntax.",
    price: 79,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
    instructor: "Mike Johnson",
    instructorImage: "https://i.pravatar.cc/100?img=3",
    rating: 4.7,
    reviews: 3421,
    students: 67890,
    duration: "28 hours",
    lessons: 128,
    level: "Beginner",
    category: "Programming"
  },
  {
    id: 4,
    title: "Next.js 14 Complete Course",
    description: "Build modern full-stack applications with Next.js 14, App Router, and Server Components.",
    price: 109,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    instructor: "Emily Rodriguez",
    instructorImage: "https://i.pravatar.cc/100?img=4",
    rating: 4.9,
    reviews: 1654,
    students: 28450,
    duration: "40 hours",
    lessons: 198,
    level: "Advanced",
    category: "Web Development",
    badge: "Trending"
  },
  {
    id: 5,
    title: "CSS Grid & Flexbox Mastery",
    description: "Create responsive, modern layouts with CSS Grid and Flexbox techniques.",
    price: 69,
    originalPrice: 139,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    instructor: "David Brown",
    instructorImage: "https://i.pravatar.cc/100?img=5",
    rating: 4.8,
    reviews: 2165,
    students: 41230,
    duration: "22 hours",
    lessons: 96,
    level: "Beginner",
    category: "Web Design"
  },
  {
    id: 6,
    title: "Vue.js 3 & Composition API",
    description: "Master Vue.js 3 with the modern Composition API for building reactive web apps.",
    price: 89,
    originalPrice: 179,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
    instructor: "Lisa Park",
    instructorImage: "https://i.pravatar.cc/100?img=6",
    rating: 4.7,
    reviews: 987,
    students: 19800,
    duration: "36 hours",
    lessons: 165,
    level: "Intermediate",
    category: "Web Development"
  }
];

// --- Utility Components ---

const Badge = ({ children, type }: { children: React.ReactNode; type: "level" | "badge" }) => {
  // Refined badge styles for better contrast in light mode
  const styles = type === "badge" 
    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30" 
    : "bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-300 font-semibold backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700";
  
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider ${styles}`}>
      {children}
    </span>
  );
};

export function Courses() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === "all" || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ["all", ...new Set(courses.map(c => c.category))];

  return (
    <>
      <FloatingNavbar />
      
      {/* BACKGROUND STRATEGY: 
         Light Mode: "F8FAFC" (Slate-50) is warmer and more premium than pure white.
         Dark Mode: "#0B0F19" (Rich dark blue-black) avoids "dead" black.
      */}
      <div className="min-h-screen bg-[rgb(var(--background))] text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-blue-500/30">
        
        {/* Background Gradients - Adjusted for richer colors in Light Mode */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Top Left Blob - Soft Rose/Indigo in Light, Deep Blue in Dark */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-300/20 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
            
            {/* Bottom Right Blob - Soft Blue/Teal in Light, Purple in Dark */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-rose-200/30 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-32 pb-16 px-6 sm:px-12 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold tracking-wider text-xs uppercase">
                        <Sparkles size={14} className="fill-blue-700 dark:fill-blue-300" />
                        <span>Premium Learning Experience</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
                        Expand Your <br />
                        {/* Gradient Text: Richer Royal Blue -> Violet for better Light Mode contrast */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-white">
                            Knowledge Horizon
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
                        Access world-class courses taught by industry titans. Elevate your skills with production-ready projects and master modern tech stacks.
                    </p>
                </motion.div>

                {/* Search Bar - Clean White Float */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full lg:w-auto min-w-[320px]"
                >
                    <div className="relative group">
                        {/* Subtle glow on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all blur-md duration-500" />
                        
                        <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center p-1.5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-none transition-shadow">
                            <Search className="ml-3 text-slate-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Search premium courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent border-none px-4 py-2.5 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                            filter === category 
                                ? "text-white shadow-lg shadow-blue-900/20" 
                                : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                        {filter === category && (
                            <motion.div
                                layoutId="activeFilter"
                                // Solid Black for Light Mode gives a very premium "Fashion Brand" feel
                                className="absolute inset-0 bg-slate-900 dark:bg-blue-600 rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 capitalize flex items-center gap-2">
                           {category === 'all' && <Layout size={16} />}
                           {category === 'Web Development' && <Code2 size={16} />}
                           {category === 'Programming' && <Terminal size={16} />}
                           {category === 'Web Design' && <Zap size={16} />}
                           {category}
                        </span>
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredCourses.map((course, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            key={course.id}
                            className="group relative h-full"
                        >
                            {/* CARD STYLE: 
                               Light Mode: No border, High Shadow, Pure White.
                               Dark Mode: Subtle border, Glassmorphism.
                            */}
                            <div className="h-full bg-white dark:bg-slate-900/60 backdrop-blur-md 
                                border border-transparent dark:border-white/10 
                                rounded-[2rem] overflow-hidden 
                                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none
                                hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-blue-900/20 
                                transition-all duration-500 flex flex-col transform hover:-translate-y-1"
                            >
                                
                                {/* Card Image Section */}
                                <div className="relative h-64 overflow-hidden">
                                    {/* Gradient Overlay - darker at bottom for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
                                    
                                    <img 
                                        src={course.image} 
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    
                                    {/* Badges */}
                                    <div className="absolute top-5 left-5 z-20 flex gap-2">
                                        <Badge type="level">{course.level}</Badge>
                                    </div>
                                    {course.badge && (
                                        <div className="absolute top-5 right-5 z-20">
                                            <Badge type="badge">{course.badge}</Badge>
                                        </div>
                                    )}

                                    {/* Instructor Info Floating */}
                                    <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3">
                                        <div className="relative">
                                            <img 
                                                src={course.instructorImage} 
                                                alt={course.instructor}
                                                className="w-12 h-12 rounded-full border-[3px] border-white dark:border-slate-800 shadow-md"
                                            />
                                            {/* Online Status Dot */}
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[3px] border-white dark:border-slate-900 rounded-full" />
                                        </div>
                                        <div className="text-white drop-shadow-md">
                                            <p className="text-sm font-bold leading-tight">{course.instructor}</p>
                                            <p className="text-[11px] font-medium text-slate-200 opacity-90 tracking-wide uppercase">Instructor</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-7 flex-1 flex flex-col relative">
                                    {/* Top Row: Category & Rating */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[11px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
                                            {course.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">
                                            <Star className="text-amber-500 fill-amber-500" size={14} />
                                            <span className="text-sm font-bold text-slate-800 dark:text-amber-100">{course.rating}</span>
                                            <span className="text-xs text-slate-500 dark:text-amber-200/60">({course.reviews})</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {course.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
                                        {course.description}
                                    </p>

                                    {/* Meta Data with divider */}
                                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/60">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} className="text-blue-500" />
                                            <span>{(course.students / 1000).toFixed(1)}k</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-purple-500" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                            <span>{course.lessons}</span>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400 line-through decoration-slate-400/50">${course.originalPrice}</span>
                                            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">${course.price}</span>
                                        </div>
                                        
                                        <button className="flex-1 relative group/btn overflow-hidden rounded-xl shadow-lg shadow-blue-900/5 dark:shadow-none">
                                           {/* BUTTON STYLE:
                                              Light Mode: Solid Black (Slate-900) for high contrast luxury.
                                              Dark Mode: White for contrast.
                                           */}
                                           <div className="absolute inset-0 w-full h-full bg-slate-900 dark:bg-white transition-all duration-300 group-hover/btn:scale-[1.02]" />
                                           <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                           
                                           <span className="relative z-10 flex items-center justify-center gap-2 py-3 px-4 font-bold text-white dark:text-slate-900 group-hover/btn:text-white transition-colors">
                                              Enroll Now
                                           </span>
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
                    <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800/50 mb-6">
                        <Search className="text-slate-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No courses found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        We couldn't find any courses matching your search. Try using broader terms or different filters.
                    </p>
                </div>
            )}
        </div>
      </div>
    </>
  );
}