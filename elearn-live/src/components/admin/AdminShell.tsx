import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, Users, Video, BarChart3, DollarSign, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { AdminDashboard } from "../../pages/admin/AdminDashboard";
import { CourseManagement } from "../../pages/admin/CourseManagement";
import { UserAnalytics } from "../../pages/admin/UserAnalytics";
import { Payments } from "../../pages/admin/Payments";
import { Settings as SettingsPage } from "../../pages/admin/Settings";

export function AdminShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/admin" },
    { id: "courses", label: "Course Management", icon: <BookOpen size={20} />, path: "/admin/courses" },
    { id: "sessions", label: "Live Class Scheduler", icon: <Video size={20} />, path: "/admin/schedule" },
    { id: "analytics", label: "User Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
    { id: "payments", label: "Payments", icon: <DollarSign size={20} />, path: "/admin/payments" },
    { id: "settings", label: "Settings", icon: <Settings size={20} />, path: "/admin/settings" }
  ];

  // Set active menu based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/admin" || currentPath === "/admin/") {
      setActiveMenu("dashboard");
    } else if (currentPath.includes("courses")) {
      setActiveMenu("courses");
    } else if (currentPath.includes("schedule")) {
      setActiveMenu("sessions");
    } else if (currentPath.includes("analytics")) {
      setActiveMenu("analytics");
    } else if (currentPath.includes("payments")) {
      setActiveMenu("payments");
    } else if (currentPath.includes("settings")) {
      setActiveMenu("settings");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminEmail');
    navigate('/admin/auth');
  };

  // Render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/") return <AdminDashboard />;
    if (path === "/admin/courses") return <CourseManagement />;
    if (path === "/admin/schedule") return <div className="p-6"><h2 className="text-2xl font-bold">Live Class Scheduler</h2></div>;
    if (path === "/admin/analytics") return <UserAnalytics />;
    if (path === "/admin/payments") return <Payments />;
    if (path === "/admin/settings") return <SettingsPage />;
    return <AdminDashboard />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300 flex flex-col`}>
        
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between h-20 px-6">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 transition-colors rounded-lg hover:bg-gray-100"
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

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
              AD
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-3 font-semibold text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
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
