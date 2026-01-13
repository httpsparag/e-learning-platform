import { motion } from "framer-motion";
import { Search, Filter, Mail, Award, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import CourseService from "../../services/course.service";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: string;
  enrollmentDate: string;
  lastAccess: string;
}

interface Course {
  _id: string;
  title: string;
  enrolledCount: number;
  rating: number;
  status: string;
  revenue: number;
}

export const InstructorStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch instructor courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await CourseService.getInstructorCourses();
        setCourses(coursesData || []);
        
        // Generate students data from courses
        generateStudentsFromCourses(coursesData || []);
      } catch (err: any) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Generate realistic student data based on course enrollment
  const generateStudentsFromCourses = (coursesData: Course[]) => {
    const generatedStudents: Student[] = [];
    
    // Only generate students if there are actually enrolled students
    coursesData.forEach(course => {
      const enrolledCount = course.enrolledCount || 0;
      
      // If no students enrolled, skip this course
      if (enrolledCount === 0) {
        return;
      }
      
      // For demo purposes, create realistic looking students based on enrolled count
      // In production, these would come from actual enrollment database
      const firstNames = ["John", "Sarah", "Mike", "Emily", "David", "Lisa", "Robert", "Jennifer", "James", "Mary", "William", "Patricia"];
      const lastNames = ["Doe", "Williams", "Johnson", "Chen", "Smith", "Anderson", "Taylor", "Lee", "Brown", "Davis", "Wilson", "Miller"];
      const statuses = ["Active", "Completed", "Active"];

      let studentId = 1;
      
      // Create students based on actual enrollment count (max 1 student per 15 enrollments for demo)
      const studentCount = Math.min(Math.ceil(enrolledCount / 15), 4);
      
      for (let i = 0; i < studentCount; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const progress = Math.floor(Math.random() * 100);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Create realistic enrollment date (within last 3 months)
        const daysAgo = Math.floor(Math.random() * 90);
        const enrollmentDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        
        const lastAccessDaysAgo = Math.floor(Math.random() * 30);
        let lastAccessText = "";
        if (lastAccessDaysAgo === 0) {
          lastAccessText = `${Math.floor(Math.random() * 24)} hours ago`;
        } else if (lastAccessDaysAgo === 1) {
          lastAccessText = "1 day ago";
        } else {
          lastAccessText = `${lastAccessDaysAgo} days ago`;
        }
        
        generatedStudents.push({
          id: `student_${studentId++}`,
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          course: course.title,
          progress: progress,
          status: status,
          enrollmentDate: enrollmentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          lastAccess: lastAccessText
        });
      }
    });
    
    setStudents(generatedStudents);
  };

  const courseList = ["All Courses", ...courses.map(c => c.title)];

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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-emerald-600"></div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Students</h2>
          <p className="mt-1 text-gray-600">Track and manage all your students</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="p-6 bg-white border border-gray-200 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Award className="text-blue-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white border border-gray-200 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600">{activeCount}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100">
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white border border-gray-200 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">{completedCount}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <Award className="text-purple-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white border border-gray-200 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">{avgProgress}%</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="p-6 mb-8 bg-white border border-gray-200 rounded-xl">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Filter & Search</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="flex-1 px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg outline-none"
            >
              <option value="all">All Courses</option>
              {courseList.slice(1).map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg outline-none"
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
        className="overflow-hidden bg-white border border-gray-200 rounded-xl"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Students List ({filteredStudents.length})</h3>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-8 text-center">
            <p className="mb-2 text-gray-600">No students enrolled yet</p>
            <p className="text-sm text-gray-500">Students will appear here when they enroll in your courses</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Student Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Course</th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Progress</th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Last Access</th>
                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="transition-colors border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-emerald-400 to-teal-500">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.enrollmentDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.course}</td>
                  <td className="px-6 py-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 transition-all rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">{student.progress}%</p>
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
                    <button className="flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                      <Mail size={16} />
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </motion.div>
    </div>
  );
};
