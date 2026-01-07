import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Calendar, Camera, 
  Edit3, Save, X, Lock, Bell, CreditCard, 
  Award, BookOpen, Clock, Settings, Shield,
  Globe, Briefcase, Linkedin, Github, Twitter
} from "lucide-react";
import { useState, useEffect } from "react";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import profileService, { type UserProfile } from "../../services/profile.service";

export function Profile() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    _id: '',
    userId: '',
    phone: '',
    location: '',
    bio: '',
    profession: '',
    company: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
    },
    avatar: '',
    createdAt: '',
    updatedAt: '',
  });

  // Load profile data on mount
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user?.id) {
        console.log('No user ID available');
        return;
      }
      
      try {
        console.log('Loading profile for user:', user?.id);
        const response = await profileService.getProfile();
        console.log('Profile response:', response);
        
        if (response.success && response.data) {
          console.log('Setting profile data:', response.data);
          console.log('Avatar loaded, length:', response.data.avatar?.length || 0);
          if (response.data.avatar) {
            console.log('Avatar preview (first 100 chars):', response.data.avatar.substring(0, 100));
          }
          setProfileData(response.data);
        } else {
          console.warn('Profile fetch failed:', response.message);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfileData();
  }, [user?.id]);

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

  // Handle profile field changes
  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle avatar upload - Auto save
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Avatar file selected:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      showToast('Please select an image file', 'error', 4000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size);
      showToast('Image size must be less than 5MB', 'error', 4000);
      return;
    }

    try {
      setIsUploadingAvatar(true);
      showToast('Uploading avatar...', 'info', 2000);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        console.log('Avatar converted to base64, length:', base64.length);
        
        // Show preview immediately
        setProfileData((prev) => ({
          ...prev,
          avatar: base64,
        }));

        // Auto-save to database
        try {
          console.log('Auto-saving avatar to database...');
          const response = await profileService.updateProfile({
            phone: profileData.phone,
            location: profileData.location,
            bio: profileData.bio,
            profession: profileData.profession,
            company: profileData.company,
            socialLinks: profileData.socialLinks,
            avatar: base64,
          });

          if (response.success) {
            console.log('Avatar saved successfully:', response.data);
            setProfileData(response.data);
            showToast('✨ Avatar updated successfully!', 'success', 3000);
          } else {
            showToast('Failed to save avatar: ' + response.message, 'error', 4000);
          }
        } catch (saveError) {
          console.error('Error saving avatar:', saveError);
          showToast('Error saving avatar to database', 'error', 4000);
        } finally {
          setIsUploadingAvatar(false);
        }
      };
      
      reader.onerror = () => {
        console.error('FileReader error');
        showToast('Failed to read file', 'error', 4000);
        setIsUploadingAvatar(false);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      showToast('Failed to process image', 'error', 4000);
      setIsUploadingAvatar(false);
    }
  };

  // Handle social links changes
  const handleSocialChange = (platform: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      console.log('Saving profile with avatar length:', profileData.avatar?.length || 0);
      const response = await profileService.updateProfile({
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        profession: profileData.profession,
        company: profileData.company,
        socialLinks: profileData.socialLinks,
        avatar: profileData.avatar,
      });

      if (response.success) {
        console.log('Profile saved successfully:', response.data);
        console.log('Avatar saved, length:', response.data.avatar?.length || 0);
        setProfileData(response.data);
        setIsEditing(false);
        showToast('✨ Profile updated successfully!', 'success', 4000);
        
        // Reload profile data to ensure it's fresh
        try {
          const refreshResponse = await profileService.getProfile();
          if (refreshResponse.success && refreshResponse.data) {
            console.log('Profile reloaded after save:', refreshResponse.data);
            console.log('Avatar reloaded, length:', refreshResponse.data.avatar?.length || 0);
            setProfileData(refreshResponse.data);
          }
        } catch (refreshError) {
          console.error('Failed to refresh profile:', refreshError);
        }
      } else {
        showToast('Failed to update profile: ' + response.message, 'error', 4000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      showToast('An error occurred while saving your profile', 'error', 4000);
    } finally {
      setIsSaving(false);
    }
  };

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
                <div className="relative w-32 h-32 mx-auto mb-4 group">
                  <img 
                    src={
                      profileData.avatar && profileData.avatar.length > 0
                        ? profileData.avatar 
                        : `https://i.pravatar.cc/200?u=${user?.email}`
                    }
                    alt={user?.name}
                    className="w-full h-full border-4 border-gray-100 rounded-full object-cover"
                    onError={(e) => {
                      console.log('Avatar image error, using fallback');
                      (e.target as HTMLImageElement).src = `https://i.pravatar.cc/200?u=${user?.email}`;
                    }}
                  />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isUploadingAvatar}
                    className="hidden"
                  />
                  <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 p-2 text-white rounded-full shadow-lg cursor-pointer transition-all ${isUploadingAvatar ? 'bg-gray-500 opacity-60' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {isUploadingAvatar ? (
                      <div className="animate-spin">
                        <Camera size={16} />
                      </div>
                    ) : (
                      <Camera size={16} />
                    )}
                  </label>
                </div>

                {/* User Info */}
                <div className="mb-6 text-center">
                  <h2 className="mb-1 text-xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="mb-3 text-sm text-gray-600">{profileData.profession || 'No profession set'}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>Joined {new Date(profileData.createdAt || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
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
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                          <Save size={16} />
                          {isSaving ? 'Saving...' : 'Save'}
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
                            value={user?.name || ''}
                            disabled
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
                            value={user?.email || ''}
                            disabled
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
                            value={profileData.phone || ''}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Add your phone number"
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
                            value={profileData.location || ''}
                            onChange={(e) => handleProfileChange('location', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Add your location"
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
                        value={profileData.bio || ''}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Add a bio about yourself"
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
                            value={profileData.profession || ''}
                            onChange={(e) => handleProfileChange('profession', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Your profession"
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
                            value={profileData.company || ''}
                            onChange={(e) => handleProfileChange('company', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Your company"
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
                            placeholder="LinkedIn username"
                            value={profileData.socialLinks?.linkedin || ''}
                            onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50"
                          />
                        </div>
                        <div className="relative">
                          <Github className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            placeholder="GitHub username"
                            value={profileData.socialLinks?.github || ''}
                            onChange={(e) => handleSocialChange('github', e.target.value)}
                            disabled={!isEditing}
                            className="w-full py-3 pl-10 pr-4 text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-50"
                          />
                        </div>
                        <div className="relative">
                          <Twitter className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={18} />
                          <input
                            type="text"
                            placeholder="Twitter username"
                            value={profileData.socialLinks?.twitter || ''}
                            onChange={(e) => handleSocialChange('twitter', e.target.value)}
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
                      <button className="shrink-0 px-4 py-2 ml-4 text-sm font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
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
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
