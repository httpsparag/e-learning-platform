import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Home, BookOpen, Users, Video, BarChart3, DollarSign, Settings } from "lucide-react";
import { useState } from "react";

export function AdminShell() {
  const navigate = useNavigate();
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300 flex flex-col`}>
        
        {/* Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-6">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
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

        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              AD
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Admin</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
