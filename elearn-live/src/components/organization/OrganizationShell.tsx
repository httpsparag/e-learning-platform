import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, BarChart3, Users, BookOpen, Settings, LogOut, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { OrganizationDashboard } from "../../pages/organization/OrganizationDashboard";
import { OrganizationTeam } from "../../pages/organization/OrganizationTeam";
import { OrganizationCourses } from "../../pages/organization/OrganizationCourses";
import { OrganizationSettings } from "../../pages/organization/OrganizationSettings";

export function OrganizationShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: <BarChart3 size={20} />, path: "/organization" },
    { id: "team", label: "Team", icon: <Users size={20} />, path: "/organization/team" },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} />, path: "/organization/courses" },
    { id: "settings", label: "Settings", icon: <Settings size={20} />, path: "/organization/settings" }
  ];

  // Set active menu based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/organization" || currentPath === "/organization/") {
      setActiveMenu("overview");
    } else if (currentPath.includes("team")) {
      setActiveMenu("team");
    } else if (currentPath.includes("courses")) {
      setActiveMenu("courses");
    } else if (currentPath.includes("settings")) {
      setActiveMenu("settings");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("organizationToken");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("organizationName");
    navigate("/auth/organization/login");
  };

  // Get organization name from localStorage
  const organizationName = localStorage.getItem("organizationName") || "Organization";

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "overview":
        return <OrganizationDashboard />;
      case "team":
        return <OrganizationTeam />;
      case "courses":
        return <OrganizationCourses />;
      case "settings":
        return <OrganizationSettings />;
      default:
        return <OrganizationDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300 flex flex-col border-r border-gray-200`}>
        
        {/* Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-600">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Organization</h1>
              </div>
            </div>
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
                // Don't close sidebar on navigation - keep it open
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
          <div className="flex items-center gap-3 p-3 bg-linear-to-r from-emerald-50 to-teal-50 rounded-lg cursor-pointer hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
              ORG
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm truncate">{organizationName}</p>
                <p className="text-xs text-gray-600">Admin</p>
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
      <main className="flex-1 overflow-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
}
