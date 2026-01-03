import { motion } from "framer-motion";
import { 
  Plus, Calendar as CalendarIcon, Video, Users, Clock,
  Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight,
  Play, Copy, MoreVertical, CheckCircle, AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LiveScheduler = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Mock Sessions Data
  const sessions = [
    {
      id: 1,
      title: "React Performance Optimization",
      course: "Advanced React & TypeScript",
      instructor: "Sarah Chen",
      date: "2026-01-05",
      time: "15:00",
      duration: "1 hour",
      students: 45,
      status: "scheduled",
      meetingLink: "/live/session-1"
    },
    {
      id: 2,
      title: "Node.js Best Practices",
      course: "Full-Stack Web Development",
      instructor: "James Wilson",
      date: "2026-01-06",
      time: "14:00",
      duration: "2 hours",
      students: 38,
      status: "scheduled",
      meetingLink: "/live/session-2"
    },
    {
      id: 3,
      title: "TypeScript Deep Dive",
      course: "JavaScript ES6+ Guide",
      instructor: "Mike Johnson",
      date: "2026-01-08",
      time: "16:00",
      duration: "1.5 hours",
      students: 52,
      status: "scheduled",
      meetingLink: "/live/session-3"
    },
    {
      id: 4,
      title: "Database Design Workshop",
      course: "Full-Stack Web Development",
      instructor: "Emily Davis",
      date: "2026-01-03",
      time: "10:00",
      duration: "2 hours",
      students: 41,
      status: "completed",
      meetingLink: "/live/session-4"
    }
  ];

  const stats = [
    { label: "Total Sessions", value: sessions.length, color: "blue" },
    { label: "Upcoming", value: sessions.filter(s => s.status === "scheduled").length, color: "green" },
    { label: "Completed", value: sessions.filter(s => s.status === "completed").length, color: "purple" },
    { label: "Total Students", value: "176", color: "amber" }
  ];

  const upcomingSessions = sessions
    .filter(s => s.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleStartClass = (meetingLink) => {
    navigate(meetingLink);
  };

  const handleDeleteSession = (id) => {
    if (confirm("Are you sure you want to delete this session?")) {
      console.log("Deleting session:", id);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Class Scheduler</h1>
            <p className="text-gray-600">Schedule and manage live teaching sessions</p>
          </div>
          
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus size={18} />
            Schedule New Session
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        
        {/* Left: Calendar View */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Session Calendar</h2>
            
            <div className="flex items-center gap-2">
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold text-gray-900 min-w-[140px] text-center">
                January 2026
              </span>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  viewMode === "month" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  viewMode === "week" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Week
              </button>
            </div>
          </div>

          {/* Simple Calendar Grid */}
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b-2 border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-bold text-gray-700">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 2; // Adjust for month start
                const hasSession = sessions.some(s => {
                  const sessionDate = new Date(s.date).getDate();
                  return sessionDate === dayNumber && dayNumber > 0 && dayNumber <= 31;
                });
                
                return (
                  <div 
                    key={i}
                    className={`min-h-[80px] p-2 border border-gray-200 ${
                      dayNumber < 1 || dayNumber > 31 ? 'bg-gray-50' : 'bg-white hover:bg-blue-50'
                    } cursor-pointer transition-colors`}
                  >
                    {dayNumber > 0 && dayNumber <= 31 && (
                      <>
                        <span className={`text-sm font-semibold ${
                          dayNumber === 3 ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {dayNumber}
                        </span>
                        {hasSession && (
                          <div className="mt-1">
                            <div className="w-full h-1 bg-blue-600 rounded-full mb-1"></div>
                            <p className="text-xs text-gray-700 font-medium truncate">
                              {sessions.find(s => new Date(s.date).getDate() === dayNumber)?.title}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Upcoming Sessions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h3>

            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{session.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{session.course}</p>
                      <p className="text-xs text-gray-700 font-semibold">by {session.instructor}</p>
                    </div>
                    <Video className="text-blue-600" size={20} />
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3 pb-3 border-b-2 border-blue-200">
                    <span className="text-gray-700 font-semibold flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(session.date).toLocaleDateString()} at {session.time}
                    </span>
                    <span className="text-gray-600 flex items-center gap-1">
                      <Users size={14} />
                      {session.students} students
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStartClass(session.meetingLink)}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Play size={14} />
                      Start Class
                    </button>
                    <button className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border-2 border-gray-200">
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteSession(session.id)}
                      className="px-3 py-2 bg-white hover:bg-red-50 text-red-600 rounded-lg transition-colors border-2 border-gray-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gray-700">Schedule sessions at least 24 hours in advance</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gray-700">Students receive automatic email reminders</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-gray-700">Click "Start Class" to begin your live session</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Sessions List */}
      <div className="mt-6 bg-white rounded-xl p-6 border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Sessions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-bold text-gray-700">Session</th>
                <th className="text-left p-4 text-sm font-bold text-gray-700">Instructor</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Date & Time</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Duration</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Students</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Status</th>
                <th className="text-center p-4 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 text-sm">{session.title}</p>
                    <p className="text-xs text-gray-600">{session.course}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{session.instructor}</td>
                  <td className="p-4 text-center text-sm text-gray-700">
                    {new Date(session.date).toLocaleDateString()}<br/>
                    <span className="text-xs text-gray-600">{session.time}</span>
                  </td>
                  <td className="p-4 text-center text-sm text-gray-700">{session.duration}</td>
                  <td className="p-4 text-center font-semibold text-gray-900">{session.students}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      session.status === 'scheduled' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {session.status === 'scheduled' && (
                        <button 
                          onClick={() => handleStartClass(session.meetingLink)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                          title="Start Class"
                        >
                          <Play size={16} />
                        </button>
                      )}
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors" title="Duplicate">
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSession(session.id)}
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
      </div>
    </div>
  );
};
