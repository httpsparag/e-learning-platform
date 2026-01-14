import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Search,
  Play,
  Bell,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  courseName: string;
  startTime: string;
  duration: string;
  status: "live" | "upcoming" | "ended";
  students: number;
  thumbnail?: string;
}

export const AttendClass = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "upcoming">(
    "all"
  );

  // Mock data for live sessions
  useEffect(() => {
    const mockSessions: LiveSession[] = [
      {
        id: "1",
        title: "Advanced React Patterns",
        instructor: "Sarah Chen",
        courseName: "Advanced React & TypeScript",
        startTime: "Today at 3:00 PM",
        duration: "60 min",
        status: "live",
        students: 24,
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
      },
      {
        id: "2",
        title: "Backend API Design",
        instructor: "James Wilson",
        courseName: "Full-Stack Web Development",
        startTime: "Today at 5:00 PM",
        duration: "90 min",
        status: "upcoming",
        students: 18,
        thumbnail:
          "https://images.unsplash.com/photo-1629904853716-6b03184ec0a5?w=400&q=80",
      },
      {
        id: "3",
        title: "JavaScript Async/Await",
        instructor: "Mike Johnson",
        courseName: "JavaScript ES6+ Complete Guide",
        startTime: "Tomorrow at 2:00 PM",
        duration: "75 min",
        status: "upcoming",
        students: 32,
        thumbnail:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80",
      },
      {
        id: "4",
        title: "State Management in React",
        instructor: "Sarah Chen",
        courseName: "Advanced React & TypeScript",
        startTime: "Jan 16 at 4:00 PM",
        duration: "60 min",
        status: "upcoming",
        students: 28,
        thumbnail:
          "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&q=80",
      },
      {
        id: "5",
        title: "Database Design",
        instructor: "James Wilson",
        courseName: "Full-Stack Web Development",
        startTime: "Jan 17 at 3:00 PM",
        duration: "90 min",
        status: "upcoming",
        students: 25,
        thumbnail:
          "https://images.unsplash.com/photo-1629904853716-6b03184ec0a5?w=400&q=80",
      },
    ];

    setLoading(false);
    setSessions(mockSessions);
    setFilteredSessions(mockSessions);
  }, []);

  // Filter sessions
  useEffect(() => {
    let filtered = sessions;

    if (searchTerm) {
      filtered = filtered.filter(
        (session) =>
          session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((session) => session.status === filterStatus);
    }

    setFilteredSessions(filtered);
  }, [searchTerm, filterStatus, sessions]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "live":
        return {
          badge: "bg-red-100 text-red-700",
          button: "bg-red-600 hover:bg-red-700",
          icon: "text-red-600",
        };
      case "upcoming":
        return {
          badge: "bg-blue-100 text-blue-700",
          button: "bg-blue-600 hover:bg-blue-700",
          icon: "text-blue-600",
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-700",
          button: "bg-gray-600 hover:bg-gray-700",
          icon: "text-gray-600",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-blue-600"></div>
          <p className="text-gray-600">Loading live classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Classes</h1>
        <p className="text-gray-600 mt-1">
          Join live sessions with your instructors
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Bell className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-semibold text-blue-900">Pro Tip</p>
          <p className="text-sm text-blue-700 mt-1">
            Join 5-10 minutes early to test your audio and video equipment.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search classes by title, instructor, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filterStatus === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("live")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filterStatus === "live"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Live Now
          </button>
          <button
            onClick={() => setFilterStatus("upcoming")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filterStatus === "upcoming"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Live Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session, index) => {
          const styles = getStatusStyles(session.status);
          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative h-40 bg-gray-900 overflow-hidden">
                {session.status === "live" && (
                  <div className="absolute inset-0 bg-black/40"></div>
                )}
                {session.thumbnail && (
                  <img
                    src={session.thumbnail}
                    alt={session.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                )}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${styles.badge}`}>
                  {session.status === "live" ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                      LIVE
                    </span>
                  ) : (
                    "Upcoming"
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {session.title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mt-2">
                  By {session.instructor}
                </p>

                {/* Course */}
                <p className="text-xs text-gray-500 mt-1">{session.courseName}</p>

                {/* Details */}
                <div className="space-y-2 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{session.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{session.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{session.students} students enrolled</span>
                  </div>
                </div>

                {/* Join Button */}
                <button
                  onClick={() =>
                    navigate(`/student/live-class/${session.id}`)
                  }
                  className={`w-full mt-4 px-4 py-2 ${styles.button} text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2`}
                >
                  <Play size={18} />
                  {session.status === "live" ? "Join Now" : "Join Class"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <Video size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">No classes found matching your criteria</p>
        </div>
      )}
    </div>
  );
};
