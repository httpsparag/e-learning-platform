import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface InstructorProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  expertise?: string[];
  qualification?: string;
  profileImage?: string;
  joinedDate?: string;
}

export const InstructorProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const instructorId = localStorage.getItem("instructorId");
      const token = localStorage.getItem("accessToken");

      if (!instructorId || !token) {
        navigate("/instructor/auth");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/instructor/${instructorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      setProfile(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="animate-spin text-emerald-600 mx-auto mb-4" size={32} />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
          <AlertCircle className="mb-4 text-red-600 mx-auto" size={32} />
          <h2 className="mb-2 text-xl font-bold text-gray-900 text-center">
            Profile Not Found
          </h2>
          <p className="text-center text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-sm text-gray-600">Manage your instructor profile and information</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50"
        >
          <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={20} />
          <p className="text-red-800">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 mb-6 border border-green-200 rounded-lg bg-green-50"
        >
          <CheckCircle className="text-green-600 mt-0.5 shrink-0" size={20} />
          <p className="text-green-800">{success}</p>
        </motion.div>
      )}

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm"
      >
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-gray-600 mt-1">{profile.qualification || "Instructor"}</p>
            {profile.joinedDate && (
              <p className="text-sm text-gray-500 mt-2">
                Joined {new Date(profile.joinedDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
              <Mail size={18} className="text-emerald-600" />
              Email
            </label>
            <p className="text-gray-700">{profile.email}</p>
          </div>
          {profile.phone && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <Phone size={18} className="text-emerald-600" />
                Phone
              </label>
              <p className="text-gray-700">{profile.phone}</p>
            </div>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <label className="text-sm font-semibold text-gray-900 block mb-3">
              About Me
            </label>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Expertise */}
        {profile.expertise && profile.expertise.length > 0 && (
          <div className="mb-8">
            <label className="text-sm font-semibold text-gray-900 block mb-3">
              Areas of Expertise
            </label>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-3 pt-4">
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            Edit Profile
          </button>
          <button className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Change Password
          </button>
        </div>
      </motion.div>
    </div>
  );
};
