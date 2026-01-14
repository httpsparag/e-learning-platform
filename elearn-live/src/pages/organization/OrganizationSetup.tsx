import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Phone, Globe, AlertCircle, CheckCircle, Loader, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const OrganizationSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const plan = location.state?.plan;
  const instructorId = location.state?.instructorId;
  const email = location.state?.email;
  const paymentStatus = location.state?.paymentStatus;

  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    phone: "",
    website: "",
  });

  if (!plan || !instructorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-red-50 border-2 border-red-200 rounded-lg">
          <AlertCircle className="text-red-600 mb-4" size={32} />
          <p className="text-red-800 font-semibold">Missing required information</p>
          <p className="text-red-700 text-sm mt-2">Please complete signup and plan selection first</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/organization/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("instructorToken")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || email,
          phone: formData.phone || undefined,
          website: formData.website || undefined,
          plan,
          paymentStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create organization");
      }

      // Store organization ID
      localStorage.setItem("organizationId", data.data._id);

      navigate("/organization/dashboard", {
        state: {
          organization: data.data,
          message: "Organization created successfully!",
        },
      });
    } catch (err: any) {
      setError(err.message || "Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Organization
          </h1>
          <p className="text-gray-600">
            Set up your organization details to get started with your{" "}
            <span className="font-semibold text-emerald-600">
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </span>{" "}
            plan
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
              <p className="text-red-800">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Organization Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Tech Academy, EduHub, etc."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Organization Email *
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@organization.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Contact Phone (Optional)
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Website (Optional)
              </label>
              <div className="relative">
                <Globe
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://yourorganization.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            {/* Plan Summary */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-emerald-900">
                    {plan === "free"
                      ? "Free Plan - No payment required"
                      : `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - 14-day free trial`}
                  </p>
                  <p className="text-sm text-emerald-800 mt-1">
                    You can upgrade or change your plan anytime from your dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating Organization...
                </>
              ) : (
                <>
                  Create Organization
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              By creating an organization, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
