import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingNavbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
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
        className="fixed top-2 sm:top-3 lg:top-4 left-1/2 -translate-x-1/2 z-50 w-full sm:w-auto px-2 sm:px-3 lg:px-4"
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
            <NavItem label="Dashboard" onClick={() => navigate("/dashboard")} />
            <NavItem label="About" onClick={() => navigate("/about")} />

            {/* Theme Toggle Button - Desktop */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="
                w-6 sm:w-8 lg:w-9 h-6 sm:h-8 lg:h-9
                rounded-full
                flex items-center justify-center
                bg-white/15
                backdrop-blur-xl
                hover:bg-white/25
                transition-all duration-200
                text-white
              "
              style={{
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {dark ? (
                <Sun size={12} className="sm:w-4 lg:w-4 text-yellow-400" />
              ) : (
                <Moon size={12} className="sm:w-4 lg:w-4" />
              )}
            </motion.button>
          </div>

          {/* Spacer */}
          <div className="hidden sm:block flex-1" />

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate("/signup")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5
              rounded-full
              bg-blue-500
              hover:bg-blue-600
              text-white
              text-[11px] sm:text-sm lg:text-sm font-semibold
              transition-all duration-200
              whitespace-nowrap
            "
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button - At Last */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="
              sm:hidden
              w-7 h-7
              rounded-lg
              flex items-center justify-center
              bg-white/15
              backdrop-blur-xl
              hover:bg-white/25
              transition-all duration-200
              text-white
              border border-white/10
              hover:border-white/30
            "
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
            className="
              w-full text-left
              px-4 py-3
              rounded-xl
              text-sm font-medium
              text-white
              bg-white/10
              hover:bg-white/20
              backdrop-blur-xl
              transition-all duration-200
              border border-white/10
              hover:border-white/30
            "
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            📚 Courses
          </motion.button>

          <motion.button
            onClick={() => {
              navigate("/dashboard");
              setMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full text-left
              px-4 py-3
              rounded-xl
              text-sm font-medium
              text-white
              bg-white/10
              hover:bg-white/20
              backdrop-blur-xl
              transition-all duration-200
              border border-white/10
              hover:border-white/30
            "
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            📊 Dashboard
          </motion.button>

          <motion.button
            onClick={() => {
              navigate("/about");
              setMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full text-left
              px-4 py-3
              rounded-xl
              text-sm font-medium
              text-white
              bg-white/10
              hover:bg-white/20
              backdrop-blur-xl
              transition-all duration-200
              border border-white/10
              hover:border-white/30
            "
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            ℹ️ About
          </motion.button>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

          {/* Theme Toggle */}
          <motion.button
            onClick={() => {
              toggleTheme();
              setMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full text-left
              px-4 py-3
              rounded-xl
              text-sm font-medium
              text-white
              bg-white/10
              hover:bg-white/20
              backdrop-blur-xl
              transition-all duration-200
              border border-white/10
              hover:border-white/30
              flex items-center justify-between
            "
            style={{
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <span>{dark ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
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
      className="
        w-full
        text-left
        px-4 py-3
        rounded-2xl
        text-sm font-medium
        text-white
        bg-white/10
        hover:bg-white/20
        backdrop-blur-xl
        transition-all duration-200
      "
      style={{
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {label}
    </motion.button>
  );
}
