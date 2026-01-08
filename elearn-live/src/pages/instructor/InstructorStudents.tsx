import { motion } from "framer-motion";
import { Search, Filter, Mail, Award, TrendingUp } from "lucide-react";
import { useState } from "react";

export const InstructorStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", course: "Advanced React & TypeScript", progress: 85, status: "Active", enrollmentDate: "Jan 5, 2024", lastAccess: "2 hours ago" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", course: "Full-Stack Web Development", progress: 60, status: "Active", enrollmentDate: "Dec 15, 2023", lastAccess: "1 day ago" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", course: "JavaScript ES6+ Guide", progress: 100, status: "Completed", enrollmentDate: "Nov 1, 2023", lastAccess: "5 days ago" },
    { id: 4, name: "Emily Chen", email: "emily@example.com", course: "Advanced React & TypeScript", progress: 45, status: "Active", enrollmentDate: "Jan 8, 2024", lastAccess: "30 mins ago" },
    { id: 5, name: "David Smith", email: "david@example.com", course: "Node.js Backend Development", progress: 72, status: "Active", enrollmentDate: "Dec 20, 2023", lastAccess: "3 hours ago" },
    { id: 6, name: "Lisa Anderson", email: "lisa@example.com", course: "Full-Stack Web Development", progress: 30, status: "Active", enrollmentDate: "Jan 3, 2024", lastAccess: "2 days ago" },
    { id: 7, name: "Robert Taylor", email: "robert@example.com", course: "Advanced React & TypeScript", progress: 95, status: "Active", enrollmentDate: "Nov 20, 2023", lastAccess: "1 hour ago" },
    { id: 8, name: "Jennifer Lee", email: "jennifer@example.com", course: "JavaScript ES6+ Guide", progress: 50, status: "Active", enrollmentDate: "Jan 2, 2024", lastAccess: "4 days ago" },
  ];

  const courses = ["All Courses", "Advanced React & TypeScript", "Full-Stack Web Development", "JavaScript ES6+ Guide", "Node.js Backend Development"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || student.course === filterCourse;
    const matchesStatus = filterStatus === "all" || student.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const avgProgress = Math.round(filteredStudents.reduce((sum, s) => sum + s.progress, 0) / filteredStudents.length || 0);
  const completedCount = filteredStudents.filter(s => s.status === "Completed").length;
  const activeCount = filteredStudents.filter(s => s.status === "Active").length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Students</h2>
          <p className="text-gray-600 mt-1">Track and manage all your students</p>
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
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="text-blue-600" size={24} />
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
              <p className="text-gray-600 text-sm font-medium">Active Students</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{activeCount}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-emerald-600" size={24} />
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
              <p className="text-3xl font-bold text-purple-600 mt-2">{completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="text-purple-600" size={24} />
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
              <p className="text-gray-600 text-sm font-medium">Avg Progress</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{avgProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Filter & Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="flex-1 outline-none text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course === "All Courses" ? "all" : course}>
                  {course === "All Courses" ? "All Courses" : course}
                </option>
              ))}
            </select>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="outline-none text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Students List ({filteredStudents.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Access</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.enrollmentDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.course}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{student.progress}%</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.lastAccess}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                      <Mail size={16} />
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
