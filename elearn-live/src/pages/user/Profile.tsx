import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Calendar, Camera, 
  Edit3, Save, X, Lock, Bell, CreditCard, 
  Award, BookOpen, Clock, Settings, Shield,
  Globe, Briefcase, Linkedin, Github, Twitter,
  Check
} from "lucide-react";
import { useState } from "react";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";
import { useAuth } from "../../context/AuthContext";

export function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data with fallback to auth context
  const userData = {
    name: user?.name ,
    email: user?.email ,
    phone: "+91 98765 43210",
    location: "Pimpri, Maharashtra, India",
    bio: "Full-stack developer passionate about React and TypeScript. Currently learning advanced web development patterns.",
    joined: "January 2024",
    avatar: "https://i.pravatar.cc/200?img=2",
    profession: "Software Developer",
    company: "Tech Solutions Inc.",
    social: {
      linkedin: "alexkumar",
      github: "alexkumar",
      twitter: "@alexkumar"
    }
  };

  const stats = [
    { label: "Courses Enrolled", value: "15", icon: <BookOpen size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: "12", icon: <Award size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Learning Hours", value: "124", icon: <Clock size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Certificates", value: "8", icon: <Award size={20} />, color: "text-amber-600", bg: "bg-amber-50" }
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React & TypeScript",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=200&q=80"
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      progress: 42,
      thumbnail: "https://images.unsplash.com/photo-1629904853716-6b03184ec0a5?w=200&q=80"
    },
    {
      id: 3,
      title: "JavaScript ES6+ Guide",
      progress: 88,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=200&q=80"
    }
  ];

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "account", label: "Account", icon: <Settings size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={18} /> }
  ];

  return (
    <>
      <FloatingNavbar />
      
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            
            {/* Left Sidebar - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <div className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl">
                {/* Avatar */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name}
                    className="w-full h-full border-4 border-gray-100 rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 p-2 text-white transition-colors bg-blue-600 rounded-full shadow-lg hover:bg-blue-700">
                    <Camera size={16} />
                  </button>
                </div>

                {/* User Info */}
                <div className="mb-6 text-center">
                  <h2 className="mb-1 text-xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="mb-3 text-sm text-gray-600">{userData.profession}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>Joined {userData.joined}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {stats.map((stat, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 ${stat.bg} rounded-lg`}>
                      <div className="flex items-center gap-2">
                        <div className={stat.color}>
                          {stat.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="overflow-hidden bg-white border-2 border-gray-200 shadow-sm rounded-xl">
                <nav className="flex flex-col">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 font-semibold text-sm transition-all ${
                        activeTab === tab.id
                          ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Right Content Area */}
            <div className="space-y-6">
              
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="mb-1 text-2xl font-bold text-gray-900">Personal Information</h2>
                      <p className="text-sm text-gray-600">Update your personal details</p>
                    </div>
                    
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          <Save size={16} />
                          Save
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            value={userData.name}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="email"
                            value={userData.email}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="tel"
                            value={userData.phone}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            value={userData.location}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Bio
                      </label>
                      <textarea
                        value={userData.bio}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Profession
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            value={userData.profession}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Company
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            value={userData.company}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 border-t-2 border-gray-200">
                      <label className="block mb-3 text-sm font-semibold text-gray-700">
                        Social Links
                      </label>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="relative">
                          <Linkedin className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            placeholder="LinkedIn"
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50"
                          />
                        </div>
                        <div className="relative">
                          <Github className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            placeholder="GitHub"
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50"
                          />
                        </div>
                        <div className="relative">
                          <Twitter className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            placeholder="Twitter"
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Change Password */}
                  <div className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Change Password</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Current Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full py-3 pl-10 pr-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full py-3 pl-10 pr-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full py-3 pl-10 pr-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                      <button className="w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                        <p className="mb-4 text-sm text-gray-600">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                      </div>
                      <button className="flex-shrink-0 px-4 py-2 ml-4 text-sm font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                            <Globe className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Windows - Chrome</p>
                            <p className="text-xs text-gray-600">Pimpri, India • Active now</p>
                          </div>
                        </div>
                        <button className="text-sm font-semibold text-red-600 hover:text-red-700">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
                >
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Course Updates", desc: "Get notified about new lessons and updates", enabled: true },
                      { label: "Live Sessions", desc: "Reminders for upcoming live classes", enabled: true },
                      { label: "Assignments", desc: "Due date reminders and grading notifications", enabled: true },
                      { label: "Promotions", desc: "Special offers and discounts", enabled: false },
                      { label: "Newsletter", desc: "Weekly learning tips and resources", enabled: false }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 transition-colors border-2 border-gray-200 rounded-lg hover:border-blue-600">
                        <div className="flex-1">
                          <p className="mb-1 font-semibold text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center ml-4 cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Current Courses - Shown in all tabs */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
                >
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Current Courses</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="p-4 transition-all border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 hover:shadow-md">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="object-cover w-full h-32 mb-3 rounded-lg"
                        />
                        <h4 className="mb-3 text-sm font-semibold text-gray-900 line-clamp-2">
                          {course.title}
                        </h4>
                        <div className="space-y-2">
                          <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                            <div 
                              className="h-full transition-all duration-500 bg-blue-600 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <p className="text-xs font-semibold text-gray-600">{course.progress}% complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
