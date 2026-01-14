import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2, Phone, Globe, Loader } from "lucide-react";
import { motion } from "framer-motion";

export const OrganizationSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationEmail: "",
    phone: "",
    website: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Validate password length
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const response = await fetch('http://localhost:5000/api/organization/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail,
          password: formData.password,
          organizationName: formData.organizationName,
          organizationEmail: formData.organizationEmail,
          phone: formData.phone,
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Registration failed: ${response.statusText}`);
      }

      // Save tokens and organization info
      localStorage.setItem('organizationToken', data.data.token);
      localStorage.setItem('organizationId', data.data.organizationId);
      localStorage.setItem('ownerId', data.data.ownerId);
      localStorage.setItem('organizationName', formData.organizationName);

      // Redirect to organization dashboard
      navigate("/organization/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="text-blue-600" size={32} />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Your Organization</h1>
          <p className="text-gray-600">Start your free trial today. No credit card required.</p>
        </div>

        <div className="p-8 bg-white border-2 border-gray-200 shadow-lg rounded-xl">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 border-2 border-red-200 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Information Section */}
            <div className="pb-6 border-b-2 border-gray-200">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Owner Information</h2>
              
              {/* Owner Name */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
                <div className="relative">
                  <User className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Owner Email */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
                <div className="relative">
                  <Mail className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    placeholder="owner@example.com"
                    required
                    className="w-full py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full py-2 pl-10 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 right-3 top-3 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full py-2 pl-10 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 right-3 top-3 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Organization Information Section */}
            <div className="pb-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Organization Information</h2>
              
              {/* Organization Name */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Organization Name</label>
                <div className="relative">
                  <Building2 className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="ABC Institute"
                    required
                    className="w-full py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Organization Email */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Organization Email</label>
                <div className="relative">
                  <Mail className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type="email"
                    name="organizationEmail"
                    value={formData.organizationEmail}
                    onChange={handleChange}
                    placeholder="info@institute.com"
                    required
                    className="w-full py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Website (Optional)</label>
                <div className="relative">
                  <Globe className="absolute text-gray-400 left-3 top-3" size={20} />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://institute.com"
                    className="w-full py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating Organization...
                </>
              ) : (
                <>
                  Start Free Trial
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/organization/login" className="font-semibold text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
