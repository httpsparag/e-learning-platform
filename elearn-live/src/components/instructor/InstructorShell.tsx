import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, Users, Video, BarChart3, DollarSign, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { InstructorDashboard } from "../../pages/instructor/InstructorDashboard";
import { InstructorCourses } from "../../pages/instructor/InstructorCourses";
import { InstructorStudents } from "../../pages/instructor/InstructorStudents";
import { InstructorSessions } from "../../pages/instructor/InstructorSessions";
import { InstructorAnalytics } from "../../pages/instructor/InstructorAnalytics";
import { InstructorEarnings } from "../../pages/instructor/InstructorEarnings";
import { InstructorProfile } from "../../pages/instructor/InstructorProfile";

export function InstructorShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/instructor" },
    { id: "profile", label: "My Profile", icon: <User size={20} />, path: "/instructor/profile" },
    { id: "courses", label: "My Courses", icon: <BookOpen size={20} />, path: "/instructor/courses" },
    { id: "students", label: "My Students", icon: <Users size={20} />, path: "/instructor/students" },
    { id: "sessions", label: "My Sessions", icon: <Video size={20} />, path: "/instructor/sessions" },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} />, path: "/instructor/analytics" },
    { id: "earnings", label: "Earnings", icon: <DollarSign size={20} />, path: "/instructor/earnings" }
  ];

  // Set active menu based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/instructor" || currentPath === "/instructor/") {
      setActiveMenu("dashboard");
    } else if (currentPath.includes("courses")) {
      setActiveMenu("courses");
    } else if (currentPath.includes("students")) {
      setActiveMenu("students");
    } else if (currentPath.includes("sessions")) {
      setActiveMenu("sessions");
    } else if (currentPath.includes("analytics")) {
      setActiveMenu("analytics");
    } else if (currentPath.includes("earnings")) {
      setActiveMenu("earnings");
    } else if (currentPath.includes("profile")) {
      setActiveMenu("profile");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('instructorName');
    localStorage.removeItem('instructorEmail');
    localStorage.removeItem('instructorId');
    navigate('/instructor/auth');
  };

  // Render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    if (path === "/instructor" || path === "/instructor/") return <InstructorDashboard />;
    if (path === "/instructor/profile") return <InstructorProfile />;
    if (path === "/instructor/courses") return <InstructorCourses />;
    if (path === "/instructor/students") return <InstructorStudents />;
    if (path === "/instructor/sessions") return <InstructorSessions />;
    if (path === "/instructor/analytics") return <InstructorAnalytics />;
    if (path === "/instructor/earnings") return <InstructorEarnings />;
    return <InstructorDashboard />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300 flex flex-col border-r border-gray-200`}>
        
        {/* Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">Instructor</h1>
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
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg cursor-pointer hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
              IN
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Instructor</p>
                <p className="text-xs text-gray-600">Educator</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
