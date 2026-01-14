import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, Users, Video, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { StudentDashboard, StudentCourses, AttendClass } from "../../pages/student";

export function StudentShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [studentName] = useState(localStorage.getItem('studentName') || 'Student');

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/student" },
    { id: "courses", label: "My Courses", icon: <BookOpen size={20} />, path: "/student/courses" },
    { id: "instructors", label: "Instructors", icon: <Users size={20} />, path: "/student/instructors" },
    { id: "attend", label: "Attend Class", icon: <Video size={20} />, path: "/student/attend-class" }
  ];

  // Set active menu based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/student" || currentPath === "/student/") {
      setActiveMenu("dashboard");
    } else if (currentPath.includes("courses")) {
      setActiveMenu("courses");
    } else if (currentPath.includes("instructors")) {
      setActiveMenu("instructors");
    } else if (currentPath.includes("attend-class")) {
      setActiveMenu("attend");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('userId');
    navigate('/auth/login');
  };

  // Render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    if (path === "/student" || path === "/student/") return <StudentDashboard />;
    if (path === "/student/courses") return <StudentCourses />;
    if (path === "/student/instructors") return <StudentCourses showInstructors={true} />;
    if (path === "/student/attend-class") return <AttendClass />;
    return <StudentDashboard />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300 flex flex-col border-r border-gray-200`}>
        
        {/* Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">Student</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                navigate(item.path);
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                activeMenu === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-6 border-t border-gray-200">
          {sidebarOpen && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900 truncate">{studentName}</p>
              <p className="text-xs text-gray-500">Student Account</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
