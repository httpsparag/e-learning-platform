import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, User, LogOut, Settings, LayoutDashboard, BookOpen, Video } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export function FloatingNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [dark, setDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply dark mode by default on mount
    document.documentElement.classList.add("dark");
    setDark(true);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed z-50 w-full px-2 -translate-x-1/2 top-2 sm:top-3 lg:top-4 left-1/2 sm:w-auto sm:px-3 lg:px-4"
      >
        <div
          className="
            flex items-center justify-between gap-1.5 sm:gap-2 lg:gap-3
            px-2 sm:px-4 lg:px-5 py-1.5 sm:py-2.5 lg:py-3
            rounded-2xl sm:rounded-full lg:rounded-full
            backdrop-blur-2xl
            bg-black/20
            border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]
            transition-all duration-300
          "
          style={{
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5
              rounded-full
              bg-white/20
              backdrop-blur-xl
              font-bold text-[11px] sm:text-sm lg:text-base
              text-white
              transition-all duration-200
              hover:bg-white/30
              whitespace-nowrap
            "
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            E-Learn<span className="text-blue-400">Live</span>
          </motion.button>

          {/* Navigation - Desktop Only */}
          <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 lg:gap-2">
            <NavItem label="Courses" onClick={() => navigate("/courses")} />
            <NavItem label="Live Class" onClick={() => navigate("/live/1")} />
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden sm:block" />

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <motion.button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 text-white transition-all duration-200 border rounded-full shadow-lg  sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-blue-500/30 border-white/20"
            >
              <User size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </motion.button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute top-full right-0 mt-2 w-48
                  rounded-xl
                  backdrop-blur-3xl
                  bg-white/10
                  border border-white/30
                  shadow-[0_12px_48px_rgba(0,0,0,0.3)]
                  p-2
                  space-y-1
                  z-50
                "
                style={{
                  WebkitBackdropFilter: "blur(40px)",
                }}
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-bold text-black">Hi, {user?.name || "User"}</p>
                  <p className="text-xs truncate text-gray-600">{user?.email}</p>
                </div>

                {/* Dashboard Option */}
                <motion.button
                  onClick={() => {
                    navigate("/dashboard");
                    setProfileDropdownOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full text-left
                    px-4 py-2.5
                    rounded-lg
                    text-sm font-semibold
                    text-black
                    bg-gray-100
                    hover:bg-gray-200
                    transition-all duration-200
                    flex items-center gap-3
                  "
                >
                  <LayoutDashboard size={18} className="text-blue-500" />
                  Dashboard
                </motion.button>

                {/* Profile Option */}
                <motion.button
                  onClick={() => {
                    navigate("/profile");
                    setProfileDropdownOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full text-left
                    px-4 py-2.5
                    rounded-lg
                    text-sm font-semibold
                    text-black
                    bg-gray-100
                    hover:bg-gray-200
                    transition-all duration-200
                    flex items-center gap-3
                  "
                >
                  <User size={18} className="text-green-500" />
                  My Profile
                </motion.button>

                {/* Logout Option */}
                <motion.button
                  onClick={async () => {
                    await logout();
                    setProfileDropdownOpen(false);
                    navigate("/");
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full text-left
                    px-4 py-2.5
                    rounded-lg
                    text-sm font-semibold
                    text-red-600
                    bg-red-100
                    hover:bg-red-200
                    transition-all duration-200
                    flex items-center gap-3
                    border-t border-gray-200 mt-2 pt-2
                  "
                >
                  <LogOut size={18} className="text-red-500" />
                  Logout
                </motion.button>
              </motion.div>
            )}

            {/* Non-authenticated Dropdown */}
            {profileDropdownOpen && !isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute top-full right-0 mt-2 w-48
                  rounded-xl
                  backdrop-blur-3xl
                  bg-white
                  border border-gray-200
                  shadow-[0_12px_48px_rgba(0,0,0,0.15)]
                  p-2
                  space-y-2
                  z-50
                "
                style={{
                  WebkitBackdropFilter: "blur(40px)",
                }}
              >
                <motion.button
                  onClick={() => {
                    navigate("/auth/login");
                    setProfileDropdownOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full
                    px-4 py-2.5
                    rounded-lg
                    text-sm font-semibold
                    text-black
                    bg-blue-100
                    hover:bg-blue-200
                    transition-all duration-200
                  "
                >
                  Sign In
                </motion.button>

                <motion.button
                  onClick={() => {
                    navigate("/auth/signup");
                    setProfileDropdownOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full
                    px-4 py-2.5
                    rounded-lg
                    text-sm font-semibold
                    text-white
                    bg-green-600
                    hover:bg-green-700
                    transition-all duration-200
                  "
                >
                  Sign Up
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button - At Last */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center text-white transition-all duration-200 border rounded-lg  sm:hidden w-7 h-7 bg-white/15 backdrop-blur-xl hover:bg-white/25 border-white/10 hover:border-white/30"
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu - Premium Dropdown */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -10,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-12 left-1/2 -translate-x-1/2 z-40 w-[90%] sm:hidden"
      >
        <div
          className="
            rounded-2xl
            backdrop-blur-3xl
            bg-gradient-to-br from-white/15 to-white/5
            border border-white/20
            shadow-[0_12px_48px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)]
            p-3
            space-y-2
          "
          style={{
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          {/* Menu Items */}
          <motion.button
            onClick={() => {
              navigate("/courses");
              setMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-left text-white transition-all duration-200 border  rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border-white/10 hover:border-white/30"
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <BookOpen size={18} className="text-blue-300" />
            Courses
          </motion.button>

          <motion.button
            onClick={() => {
              navigate("/live/1");
              setMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-left text-white transition-all duration-200 border  rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border-white/10 hover:border-white/30"
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <Video size={18} className="text-purple-300" />
            Live Class
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      className="
        px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2
        rounded-full
        text-[10px] sm:text-xs lg:text-sm font-medium
        text-white/90
        hover:text-white
        transition-all duration-200
        backdrop-blur-xl
      "
      style={{
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {label}
    </motion.button>
  );
}


function MobileNavItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="w-full px-4 py-3 text-sm font-medium text-left text-white transition-all duration-200  rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl"
      style={{
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {label}
    </motion.button>
  );
}
