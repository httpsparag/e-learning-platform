import { motion } from "framer-motion";
import { Search, Filter, Calendar, Clock, Users, Video, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export const InstructorSessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const sessions = [
    {
      id: 1,
      title: "React Performance Tips",
      course: "Advanced React & TypeScript",
      date: "Today",
      time: "3:00 PM - 4:30 PM",
      students: 45,
      status: "Scheduled",
      recording: "Available",
      duration: "1.5 hrs"
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      course: "Advanced React & TypeScript",
      date: "Tomorrow",
      time: "2:00 PM - 4:00 PM",
      students: 38,
      status: "Scheduled",
      recording: "N/A",
      duration: "2 hrs"
    },
    {
      id: 3,
      title: "Web Performance Optimization",
      course: "Full-Stack Web Development",
      date: "Jan 10, 2024",
      time: "4:00 PM - 5:30 PM",
      students: 52,
      status: "Scheduled",
      recording: "N/A",
      duration: "1.5 hrs"
    },
    {
      id: 4,
      title: "React Hooks Deep Dive",
      course: "Advanced React & TypeScript",
      date: "Jan 11, 2024",
      time: "10:00 AM - 12:00 PM",
      students: 29,
      status: "Scheduled",
      recording: "N/A",
      duration: "2 hrs"
    },
    {
      id: 5,
      title: "Node.js Async/Await Mastery",
      course: "Node.js Backend Development",
      date: "Jan 8, 2024",
      time: "5:00 PM - 6:30 PM",
      students: 34,
      status: "Completed",
      recording: "Available",
      duration: "1.5 hrs"
    },
    {
      id: 6,
      title: "Database Design Best Practices",
      course: "Full-Stack Web Development",
      date: "Jan 7, 2024",
      time: "2:00 PM - 3:30 PM",
      students: 41,
      status: "Completed",
      recording: "Available",
      duration: "1.5 hrs"
    },
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || session.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const upcomingSessions = sessions.filter(s => s.status === "Scheduled").length;
  const completedSessions = sessions.filter(s => s.status === "Completed").length;
  const totalAttendees = sessions.reduce((sum, s) => sum + s.students, 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Live Sessions</h2>
            <p className="text-gray-600 mt-1">Manage and schedule your live classes</p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
            <Calendar size={20} />
            Schedule Session
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{sessions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="text-blue-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{upcomingSessions}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-emerald-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{completedSessions}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Video className="text-purple-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Attendees</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{totalAttendees}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Users className="text-amber-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search sessions..."
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
            <option value="all">All Sessions</option>
            <option value="scheduled">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="space-y-4">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-4">
              {/* Session Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                    session.status === "Scheduled"
                      ? "bg-emerald-100"
                      : "bg-purple-100"
                  }`}>
                    <Video className={session.status === "Scheduled" ? "text-emerald-600" : "text-purple-600"} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{session.course}</p>
                    <div className="flex gap-6 mt-3 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        {session.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        {session.students} Students
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-end gap-3">
                <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                  session.status === "Scheduled"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {session.status}
                </span>

                {session.recording !== "N/A" && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    Recording {session.recording}
                  </span>
                )}

                <div className="flex gap-2">
                  {session.status === "Scheduled" && (
                    <>
                      <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                  {session.status === "Completed" && session.recording === "Available" && (
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-sm">
                      View Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Video size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No sessions found</p>
        </div>
      )}
    </div>
  );
};
